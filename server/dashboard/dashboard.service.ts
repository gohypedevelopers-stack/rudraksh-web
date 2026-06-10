import "server-only"

import type { DashboardActivityItem, DashboardStats } from "@/lib/dashboard-types"

import { getInventory, getInventoryStats } from "@/server/inventory/inventory.service"
import { getOrders, getOrderStats, getRecentOrders as getRecentOrderRecords } from "@/server/orders/order.service"
import { getProductStats, getProducts } from "@/server/products/product.service"

function sortByNewest(items: DashboardActivityItem[]) {
  return items.sort((left, right) => {
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  })
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [productStats, inventoryStats, orderStats] = await Promise.all([
    getProductStats(),
    getInventoryStats(),
    getOrderStats(),
  ])

  return {
    totalProducts: productStats.totalCatalog,
    activeProducts: productStats.activeListings,
    lowStockProducts: productStats.lowStockCount,
    totalInventoryStock: inventoryStats.readyToShipStock,
    totalOrders: orderStats.totalOrders,
    pendingOrders: orderStats.pendingCount,
    processingOrders: orderStats.processingCount,
    revenueTotal: orderStats.revenueTotal,
  }
}

export async function getRecentOrders(limit = 5) {
  return getRecentOrderRecords(limit)
}

export async function getRecentActivity(limit = 6): Promise<DashboardActivityItem[]> {
  const [products, inventory, orders] = await Promise.all([
    getProducts(),
    getInventory(),
    getOrders(),
  ])

  const activity = sortByNewest([
    ...orders.slice(0, 3).map((order) => ({
      id: `order-${order.id}`,
      title: "Order placed",
      detail: `${order.id} from ${order.customerName ?? order.email ?? "Guest"}`,
      updatedAt: order.createdAt,
      type: "order" as const,
      href: "/dashboard/orders",
    })),
    ...products.slice(0, 3).map((product) => ({
      id: `product-${product.id}`,
      title: product.isActive ? "Product updated" : "Product deactivated",
      detail: `${product.name} · ${product.category ?? "Uncategorized"}`,
      updatedAt: product.updatedAt,
      type: "product" as const,
      href: "/dashboard/products",
    })),
    ...inventory.slice(0, 3).map((item) => ({
      id: `inventory-${item.id}`,
      title: item.status === "LOW STOCK" ? "Low-stock alert" : "Inventory updated",
      detail: `${item.productName} · SKU ${item.sku ?? "Unassigned"}`,
      updatedAt: item.updatedAt,
      type: "inventory" as const,
      href: "/dashboard/inventory",
    })),
  ])

  return activity.slice(0, limit)
}
