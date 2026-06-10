import "server-only"

import { Prisma } from "@prisma/client"
import { cache } from "react"

import type { OrderDTO, OrderItemDTO, OrderStats, OrderStatus } from "@/lib/dashboard-types"
import { prisma } from "@/server/db/prisma"
import { NotFoundError } from "@/server/http/errors"

import type { OrderStatusInput } from "./order.validation"

type OrderRecord = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        id: true
        name: true
        email: true
      }
    }
    items: {
      include: {
        product: {
          select: {
            id: true
            name: true
            slug: true
          }
        }
      }
    }
  }
}>

function serializeOrderItem(item: OrderRecord["items"][number]): OrderItemDTO {
  const lineTotal = new Prisma.Decimal(item.price)
    .mul(item.quantity)
    .toString()

  return {
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    productName: item.product.name,
    productSlug: item.product.slug,
    quantity: item.quantity,
    price: item.price.toString(),
    lineTotal,
  }
}

function getOrderSummary(items: OrderItemDTO[]) {
  if (items.length === 0) {
    return "No line items"
  }

  const [firstItem, secondItem] = items

  if (!secondItem) {
    return `${firstItem.productName} × ${firstItem.quantity}`
  }

  return `${firstItem.productName} × ${firstItem.quantity}, ${secondItem.productName} × ${secondItem.quantity}`
}

function serializeOrder(order: OrderRecord): OrderDTO {
  const items = order.items.map((item) => serializeOrderItem(item))
  const customerName = order.customerName ?? order.user?.name ?? null
  const email = order.email ?? order.user?.email ?? null

  return {
    id: order.id,
    userId: order.userId,
    customerName,
    email,
    phone: order.phone,
    totalAmount: order.totalAmount.toString(),
    status: order.status as OrderStatus,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    summary: getOrderSummary(items),
  }
}

const fetchOrderRecords = cache(async () => {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  })
})

const fetchOrderRecordById = cache(async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })
})

export async function getOrders(): Promise<OrderDTO[]> {
  return (await fetchOrderRecords()).map((order) => serializeOrder(order))
}

export async function getOrderById(id: string): Promise<OrderDTO | null> {
  const order = await fetchOrderRecordById(id)

  return order ? serializeOrder(order) : null
}

export async function getOrderStats(): Promise<OrderStats> {
  const orders = await fetchOrderRecords()

  return {
    totalOrders: orders.length,
    processingCount: orders.filter((order) => order.status === "PROCESSING").length,
    confirmedCount: orders.filter((order) => order.status === "CONFIRMED").length,
    shippedCount: orders.filter((order) => order.status === "SHIPPED").length,
    pendingCount: orders.filter((order) => order.status === "PENDING").length,
    revenueTotal: orders
      .reduce((total, order) => total + Number(order.totalAmount), 0)
      .toString(),
  }
}

export async function getRecentOrders(limit = 5): Promise<OrderDTO[]> {
  return (await getOrders()).slice(0, limit)
}

export async function updateOrderStatus(
  id: string,
  input: OrderStatusInput,
): Promise<OrderDTO> {
  const existing = await fetchOrderRecordById(id)

  if (!existing) {
    throw new NotFoundError("Order not found.")
  }

  const order = await prisma.order.update({
    where: { id },
    data: {
      status: input.status,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })

  return serializeOrder(order)
}
