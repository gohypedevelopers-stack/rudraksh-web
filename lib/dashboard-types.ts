export type ProductStatus = "ACTIVE" | "INACTIVE" | "LOW STOCK" | "OUT OF STOCK"

export type ProductInventoryDTO = {
  id: string
  productId: string
  sku: string | null
  stock: number
  lowStock: number
  createdAt: string
  updatedAt: string
}

export type ProductDTO = {
  id: string
  name: string
  slug: string
  description: string | null
  price: string
  imageUrl: string | null
  category: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  inventory: ProductInventoryDTO | null
  sku: string | null
  stock: number
  lowStock: number
  status: ProductStatus
}

export type ProductStats = {
  totalCatalog: number
  activeListings: number
  lowStockCount: number
}

export type InventoryStatus = "HEALTHY" | "LOW STOCK" | "OUT OF STOCK"

export type InventoryDTO = {
  id: string
  productId: string
  productName: string
  productSlug: string
  category: string | null
  imageUrl: string | null
  sku: string | null
  stock: number
  lowStock: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  status: InventoryStatus
}

export type InventoryStats = {
  totalSkus: number
  readyToShipStock: number
  belowReorderCount: number
  reservedStock: number
}

export const orderStatusValues = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const

export type OrderStatus = (typeof orderStatusValues)[number]

export type OrderItemDTO = {
  id: string
  orderId: string
  productId: string
  productName: string
  productSlug: string
  quantity: number
  price: string
  lineTotal: string
}

export type OrderDTO = {
  id: string
  userId: string | null
  customerName: string | null
  email: string | null
  phone: string | null
  totalAmount: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
  items: OrderItemDTO[]
  itemCount: number
  summary: string
}

export type OrderStats = {
  totalOrders: number
  processingCount: number
  confirmedCount: number
  shippedCount: number
  pendingCount: number
  revenueTotal: string
}

export type DashboardStats = {
  totalProducts: number
  activeProducts: number
  lowStockProducts: number
  totalInventoryStock: number
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  revenueTotal: string
}

export type DashboardActivityItem = {
  id: string
  title: string
  detail: string
  updatedAt: string
  type: "order" | "product" | "inventory"
  href?: string
}

export type UserRole = "USER" | "ADMIN"

export type AdminUserDTO = {
  id: string
  name: string | null
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
  ordersCount: number
  totalSpent: string
  latestOrderDate: string | null
}

export type UserStats = {
  totalUsers: number
  adminUsers: number
  customerUsers: number
  usersWithOrders: number
  newUsersThisMonth: number
}

export type UserDetailDTO = {
  id: string
  name: string | null
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
  ordersCount: number
  totalSpent: string
  latestOrderDate: string | null
  orders: OrderDTO[]
}
