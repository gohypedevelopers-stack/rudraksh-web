import "server-only"

import { Prisma } from "@prisma/client"
import { cache } from "react"

import type { InventoryDTO, InventoryStats, InventoryStatus } from "@/lib/dashboard-types"
import { prisma } from "@/server/db/prisma"
import { NotFoundError } from "@/server/http/errors"

import type { InventoryUpdateInput } from "./inventory.validation"

type InventoryRecord = Prisma.InventoryGetPayload<{
  include: {
    product: {
      select: {
        id: true
        name: true
        slug: true
        category: true
        imageUrl: true
        isActive: true
      }
    }
  }
}>

function getInventoryStatus(stock: number, lowStock: number): InventoryStatus {
  if (stock <= 0) {
    return "OUT OF STOCK"
  }

  if (stock <= lowStock) {
    return "LOW STOCK"
  }

  return "HEALTHY"
}

function serializeInventory(inventory: InventoryRecord): InventoryDTO {
  return {
    id: inventory.id,
    productId: inventory.productId,
    productName: inventory.product.name,
    productSlug: inventory.product.slug,
    category: inventory.product.category,
    imageUrl: inventory.product.imageUrl,
    sku: inventory.sku,
    stock: inventory.stock,
    lowStock: inventory.lowStock,
    isActive: inventory.product.isActive,
    createdAt: inventory.createdAt.toISOString(),
    updatedAt: inventory.updatedAt.toISOString(),
    status: getInventoryStatus(inventory.stock, inventory.lowStock),
  }
}

const fetchInventoryRecords = cache(async () => {
  return prisma.inventory.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          imageUrl: true,
          isActive: true,
        },
      },
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

const fetchInventoryRecordById = cache(async (id: string) => {
  return prisma.inventory.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          imageUrl: true,
          isActive: true,
        },
      },
    },
  })
})

export async function getInventory(): Promise<InventoryDTO[]> {
  return (await fetchInventoryRecords()).map((inventory) => serializeInventory(inventory))
}

export async function getInventoryById(id: string): Promise<InventoryDTO | null> {
  const inventory = await fetchInventoryRecordById(id)

  return inventory ? serializeInventory(inventory) : null
}

export async function getInventoryStats(): Promise<InventoryStats> {
  const inventory = await fetchInventoryRecords()

  return {
    totalSkus: inventory.length,
    readyToShipStock: inventory.reduce((total, item) => total + item.stock, 0),
    belowReorderCount: inventory.filter((item) => item.stock <= item.lowStock).length,
    reservedStock: 0,
  }
}

export async function getLowStockItems(): Promise<InventoryDTO[]> {
  const inventory = await fetchInventoryRecords()

  return inventory
    .filter((item) => item.stock <= item.lowStock)
    .map((item) => serializeInventory(item))
}

export async function updateInventory(
  id: string,
  input: InventoryUpdateInput,
): Promise<InventoryDTO> {
  const existing = await fetchInventoryRecordById(id)

  if (!existing) {
    throw new NotFoundError("Inventory record not found.")
  }

  const inventory = await prisma.inventory.update({
    where: { id },
    data: {
      sku: input.sku ?? null,
      stock: input.stock,
      lowStock: input.lowStock,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          imageUrl: true,
          isActive: true,
        },
      },
    },
  })

  return serializeInventory(inventory)
}

export async function updateStock(id: string, stock: number): Promise<InventoryDTO> {
  const existing = await fetchInventoryRecordById(id)

  if (!existing) {
    throw new NotFoundError("Inventory record not found.")
  }

  const inventory = await prisma.inventory.update({
    where: { id },
    data: {
      stock,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          imageUrl: true,
          isActive: true,
        },
      },
    },
  })

  return serializeInventory(inventory)
}
