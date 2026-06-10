import "server-only"

import { Prisma } from "@prisma/client"
import { cache } from "react"

import type {
  AdminUserDTO,
  OrderDTO,
  OrderItemDTO,
  UserDetailDTO,
  UserRole,
  UserStats,
} from "@/lib/dashboard-types"
import { prisma } from "@/server/db/prisma"
import { ConflictError, NotFoundError } from "@/server/http/errors"
import type { AuthUser, AuthUserWithPassword } from "@/server/users/user.types"
import { safeUserSelect, toAuthUser } from "@/server/utils/safe-user"

const authUserSelect = {
  ...safeUserSelect,
  passwordHash: true,
} as const

type UserSummaryRecord = Prisma.UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    role: true
    createdAt: true
    updatedAt: true
    _count: {
      select: {
        orders: true
      }
    }
  }
}>

type UserDetailRecord = Prisma.UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    role: true
    createdAt: true
    updatedAt: true
    orders: {
      orderBy: [
        {
          createdAt: "desc"
        },
        {
          updatedAt: "desc"
        },
      ]
      include: {
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
    }
  }
}>

type UserDetailOrderRecord = UserDetailRecord["orders"][number]
type UserDetailOrderItemRecord = UserDetailOrderRecord["items"][number]

type UserSummaryAggregate = {
  totalSpent: string
  latestOrderDate: string | null
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

function serializeOrderItem(
  item: UserDetailOrderItemRecord,
): OrderItemDTO {
  const lineTotal = new Prisma.Decimal(item.price).mul(item.quantity).toString()

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

function serializeOrder(
  order: UserDetailOrderRecord,
  fallbackCustomerName: string | null,
  fallbackEmail: string,
): OrderDTO {
  const items = order.items.map((item) => serializeOrderItem(item))
  const customerName = order.customerName ?? fallbackCustomerName
  const email = order.email ?? fallbackEmail

  return {
    id: order.id,
    userId: order.userId,
    customerName,
    email,
    phone: order.phone,
    totalAmount: order.totalAmount.toString(),
    status: order.status as OrderDTO["status"],
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    summary: getOrderSummary(items),
  }
}

function serializeAdminUser(
  user: UserSummaryRecord,
  aggregate: UserSummaryAggregate | undefined,
): AdminUserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    ordersCount: user._count.orders,
    totalSpent: aggregate?.totalSpent ?? "0",
    latestOrderDate: aggregate?.latestOrderDate ?? null,
  }
}

function serializeUserDetail(user: UserDetailRecord): UserDetailDTO {
  const orders = user.orders.map((order) =>
    serializeOrder(order, user.name ?? null, user.email),
  )

  const totalSpent = orders
    .reduce((total, order) => total.add(order.totalAmount), new Prisma.Decimal(0))
    .toString()

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    ordersCount: orders.length,
    totalSpent,
    latestOrderDate: orders[0]?.createdAt ?? null,
    orders,
  }
}

const fetchAdminUserData = cache(async () => {
  const [users, aggregates] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            orders: true,
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
    }),
    prisma.order.groupBy({
      by: ["userId"],
      where: {
        userId: {
          not: null,
        },
      },
      _sum: {
        totalAmount: true,
      },
      _max: {
        createdAt: true,
      },
    }),
  ])

  const aggregateMap = new Map<string, UserSummaryAggregate>()

  for (const aggregate of aggregates) {
    if (!aggregate.userId) {
      continue
    }

    aggregateMap.set(aggregate.userId, {
      totalSpent: aggregate._sum.totalAmount?.toString() ?? "0",
      latestOrderDate: aggregate._max.createdAt?.toISOString() ?? null,
    })
  }

  return { users, aggregateMap }
})

const fetchUserDetailRecordById = cache(async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      orders: {
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
        include: {
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
      },
    },
  })
})

export async function findUserByEmail(email: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: safeUserSelect,
  })

  return user ? toAuthUser(user) : null
}

export async function findUserByEmailWithPassword(
  email: string,
): Promise<AuthUserWithPassword | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: authUserSelect,
  })

  return user ? { ...toAuthUser(user), passwordHash: user.passwordHash } : null
}

export async function findUserById(id: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  })

  return user ? toAuthUser(user) : null
}

export async function createUser(input: {
  name: string
  email: string
  passwordHash: string
  role?: UserRole
}): Promise<AuthUser> {
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role,
    },
    select: safeUserSelect,
  })

  return toAuthUser(user)
}

export async function getAdminUsers(): Promise<AdminUserDTO[]> {
  const { users, aggregateMap } = await fetchAdminUserData()

  return users.map((user) => serializeAdminUser(user, aggregateMap.get(user.id)))
}

export async function getUserStats(): Promise<UserStats> {
  const { users } = await fetchAdminUserData()
  const monthStart = new Date()

  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  let adminUsers = 0
  let customerUsers = 0
  let usersWithOrders = 0
  let newUsersThisMonth = 0

  for (const user of users) {
    if (user.role === "ADMIN") {
      adminUsers += 1
    } else if (user.role === "USER") {
      customerUsers += 1
    }

    if (user._count.orders > 0) {
      usersWithOrders += 1
    }

    if (user.createdAt >= monthStart) {
      newUsersThisMonth += 1
    }
  }

  return {
    totalUsers: users.length,
    adminUsers,
    customerUsers,
    usersWithOrders,
    newUsersThisMonth,
  }
}

export async function getAdminCount(): Promise<number> {
  return prisma.user.count({
    where: {
      role: "ADMIN",
    },
  })
}

export async function getUserByIdWithOrders(
  userId: string,
): Promise<UserDetailDTO | null> {
  const user = await fetchUserDetailRecordById(userId)

  return user ? serializeUserDetail(user) : null
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<{ id: string; role: UserRole }> {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
    },
  })

  if (!existing) {
    throw new NotFoundError("User not found.")
  }

  if (existing.role === "ADMIN" && role === "USER") {
    const adminCount = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    })

    if (adminCount <= 1) {
      throw new ConflictError("At least one admin must remain.")
    }
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      role,
    },
    select: {
      id: true,
      role: true,
    },
  })

  return {
    id: updated.id,
    role: updated.role as UserRole,
  }
}
