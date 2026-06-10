import "server-only"

import { Prisma } from "@prisma/client"
import { cache } from "react"

import type { ProductDTO, ProductStats, ProductStatus } from "@/lib/dashboard-types"
import { prisma } from "@/server/db/prisma"
import { ConflictError, NotFoundError } from "@/server/http/errors"

import type { ProductFormInput } from "./product.validation"

type ProductRecord = Prisma.ProductGetPayload<{
  include: {
    inventory: true
  }
}>

type ProductInventoryRecord = NonNullable<ProductRecord["inventory"]>

function getProductStatus(
  isActive: boolean,
  stock: number,
  lowStock: number,
): ProductStatus {
  if (!isActive) {
    return "INACTIVE"
  }

  if (stock <= 0) {
    return "OUT OF STOCK"
  }

  if (stock <= lowStock) {
    return "LOW STOCK"
  }

  return "ACTIVE"
}

function serializeInventory(
  inventory: ProductInventoryRecord,
): ProductDTO["inventory"] {
  return {
    id: inventory.id,
    productId: inventory.productId,
    sku: inventory.sku,
    stock: inventory.stock,
    lowStock: inventory.lowStock,
    createdAt: inventory.createdAt.toISOString(),
    updatedAt: inventory.updatedAt.toISOString(),
  }
}

function serializeProduct(product: ProductRecord): ProductDTO {
  const inventory = product.inventory
  const stock = inventory?.stock ?? 0
  const lowStock = inventory?.lowStock ?? 5

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price.toString(),
    imageUrl: product.imageUrl,
    category: product.category,
    isActive: product.isActive,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    inventory: inventory ? serializeInventory(inventory) : null,
    sku: inventory?.sku ?? null,
    stock,
    lowStock,
    status: getProductStatus(product.isActive, stock, lowStock),
  }
}

function serializeProducts(products: ProductRecord[]): ProductDTO[] {
  return products.map((product) => serializeProduct(product))
}

const fetchProductRecords = cache(async () => {
  return prisma.product.findMany({
    include: {
      inventory: true,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  })
})

const fetchProductRecordById = cache(async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      inventory: true,
    },
  })
})

async function assertProductUniqueness(
  slug: string,
  sku: string,
  excludeId?: string,
) {
  const [slugMatch, skuMatch] = await Promise.all([
    prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: {
        id: true,
      },
    }),
    prisma.inventory.findFirst({
      where: {
        sku,
        ...(excludeId ? { productId: { not: excludeId } } : {}),
      },
      select: {
        id: true,
      },
    }),
  ])

  if (slugMatch) {
    throw new ConflictError("A product with this slug already exists.")
  }

  if (skuMatch) {
    throw new ConflictError("That SKU is already in use.")
  }
}

function toProductCreateData(input: ProductFormInput) {
  return {
    name: input.name,
    slug: input.slug,
    description: input.description ?? null,
    price: new Prisma.Decimal(input.price),
    imageUrl: input.imageUrl ?? null,
    category: input.category ?? null,
    isActive: input.isActive,
  }
}

export async function getProducts(): Promise<ProductDTO[]> {
  return serializeProducts(await fetchProductRecords())
}

export async function getProductById(id: string): Promise<ProductDTO | null> {
  const product = await fetchProductRecordById(id)

  return product ? serializeProduct(product) : null
}

export async function getProductStats(): Promise<ProductStats> {
  const products = await fetchProductRecords()

  return {
    totalCatalog: products.length,
    activeListings: products.filter((product) => product.isActive).length,
    lowStockCount: products.filter((product) => {
      const stock = product.inventory?.stock ?? 0
      const lowStock = product.inventory?.lowStock ?? 5
      return stock <= lowStock
    }).length,
  }
}

export async function getRecentProducts(limit = 5): Promise<ProductDTO[]> {
  return (await getProducts()).slice(0, limit)
}

export async function createProduct(input: ProductFormInput): Promise<ProductDTO> {
  await assertProductUniqueness(input.slug, input.sku)

  const product = await prisma.$transaction(async (transaction) => {
    const createdProduct = await transaction.product.create({
      data: toProductCreateData(input),
    })

    await transaction.inventory.create({
      data: {
        productId: createdProduct.id,
        sku: input.sku,
        stock: input.stock,
        lowStock: input.lowStock,
      },
    })

    return transaction.product.findUnique({
      where: { id: createdProduct.id },
      include: {
        inventory: true,
      },
    })
  })

  if (!product) {
    throw new NotFoundError("Product could not be created.")
  }

  return serializeProduct(product)
}

export async function updateProduct(
  id: string,
  input: ProductFormInput,
): Promise<ProductDTO> {
  const existing = await fetchProductRecordById(id)

  if (!existing) {
    throw new NotFoundError("Product not found.")
  }

  await assertProductUniqueness(input.slug, input.sku, id)

  const product = await prisma.$transaction(async (transaction) => {
    await transaction.product.update({
      where: { id },
      data: toProductCreateData(input),
    })

    await transaction.inventory.upsert({
      where: {
        productId: id,
      },
      create: {
        productId: id,
        sku: input.sku,
        stock: input.stock,
        lowStock: input.lowStock,
      },
      update: {
        sku: input.sku,
        stock: input.stock,
        lowStock: input.lowStock,
      },
    })

    return transaction.product.findUnique({
      where: { id },
      include: {
        inventory: true,
      },
    })
  })

  if (!product) {
    throw new NotFoundError("Product not found.")
  }

  return serializeProduct(product)
}

export async function deleteProduct(id: string): Promise<ProductDTO> {
  const existing = await fetchProductRecordById(id)

  if (!existing) {
    throw new NotFoundError("Product not found.")
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      isActive: false,
    },
    include: {
      inventory: true,
    },
  })

  return serializeProduct(product)
}

export async function setProductActiveState(
  id: string,
  isActive: boolean,
): Promise<ProductDTO> {
  const existing = await fetchProductRecordById(id)

  if (!existing) {
    throw new NotFoundError("Product not found.")
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      isActive,
    },
    include: {
      inventory: true,
    },
  })

  return serializeProduct(product)
}
