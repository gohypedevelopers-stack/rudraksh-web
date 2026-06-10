import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/format"
import {
  getDashboardStats,
  getRecentActivity,
  getRecentOrders,
} from "@/server/dashboard/dashboard.service"

export const dynamic = "force-dynamic"

function getOrderBadgeClass(status: string) {
  switch (status) {
    case "PROCESSING":
      return "border-amber-200 bg-amber-50 text-amber-700"
    case "CONFIRMED":
      return "border-sky-200 bg-sky-50 text-sky-700"
    case "SHIPPED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    case "DELIVERED":
      return "border-zinc-200 bg-zinc-50 text-zinc-700"
    case "CANCELLED":
    case "PENDING":
      return "border-rose-200 bg-rose-50 text-rose-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

function getActivityTone(type: "order" | "product" | "inventory") {
  switch (type) {
    case "order":
      return "bg-sky-500"
    case "product":
      return "bg-emerald-500"
    case "inventory":
      return "bg-amber-500"
    default:
      return "bg-zinc-500"
  }
}

export default async function DashboardPage() {
  const [stats, recentOrders, recentActivity] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getRecentActivity(6),
  ])
  const isEmptyStore =
    stats.totalProducts === 0 &&
    stats.totalOrders === 0 &&
    recentOrders.length === 0 &&
    recentActivity.length === 0

  const statCards = [
    {
      label: "Total products",
      value: stats.totalProducts,
      note: "Catalog records across the store.",
    },
    {
      label: "Active products",
      value: stats.activeProducts,
      note: "Visible to shoppers right now.",
    },
    {
      label: "Low-stock products",
      value: stats.lowStockProducts,
      note: "Need replenishment soon.",
    },
    {
      label: "Inventory stock",
      value: stats.totalInventoryStock,
      note: "Units on hand across inventory rows.",
    },
    {
      label: "Total orders",
      value: stats.totalOrders,
      note: "All recorded order rows.",
    },
    {
      label: "Pending orders",
      value: stats.pendingOrders,
      note: "Waiting on payment or confirmation.",
    },
    {
      label: "Processing orders",
      value: stats.processingOrders,
      note: "Currently moving through fulfilment.",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.revenueTotal),
      note: "Sum of order totals in the database.",
    },
  ]

  return (
    <SidebarInset className="bg-[#f6f2ea]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/5 bg-[#f6f2ea]/90 px-4 backdrop-blur md:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-5" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-emerald-200 bg-white text-emerald-700"
          >
            Live store sync
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {isEmptyStore ? (
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardContent className="p-6">
              <Empty className="border-border/70 bg-muted/20">
                <EmptyHeader>
                  <EmptyTitle>
                    Your dashboard will show live store metrics once products,
                    inventory, and orders are created.
                  </EmptyTitle>
                  <EmptyDescription>
                    Add a product to begin populating the catalog, inventory,
                    and order views with live Neon data.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CardContent>
          </Card>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-black/5 bg-white/90 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-3xl tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-zinc-500">{stat.note}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1 border-b border-black/5">
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>
                The latest orders pulled straight from Neon.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recentOrders.length === 0 ? (
                <div className="p-6">
                  <Empty className="border-border/70 bg-muted/20">
                    <EmptyHeader>
                      <EmptyTitle>No orders yet</EmptyTitle>
                      <EmptyDescription>
                        Your dashboard will show live store metrics once
                        products, inventory, and orders are created.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <p className="text-sm text-muted-foreground">
                        No fabricated order activity is shown here.
                      </p>
                    </EmptyContent>
                  </Empty>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-zinc-950">
                          <div className="flex flex-col">
                            <span>{order.id}</span>
                            <span className="text-xs text-zinc-500">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{order.customerName ?? "Guest"}</span>
                            <span className="text-xs text-zinc-500">
                              {order.itemCount} item
                              {order.itemCount === 1 ? "" : "s"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                              getOrderBadgeClass(order.status),
                            )}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1 border-b border-black/5">
              <CardTitle>Live activity</CardTitle>
              <CardDescription>
                Recent order, product, and inventory changes from the database.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recentActivity.length === 0 ? (
                <div className="p-6">
                  <Empty className="border-border/70 bg-muted/20">
                    <EmptyHeader>
                      <EmptyTitle>No activity yet</EmptyTitle>
                      <EmptyDescription>
                        Activity will appear once products, inventory, or orders
                        are created or updated.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <p className="text-sm text-muted-foreground">
                        The dashboard does not fabricate operational history.
                      </p>
                    </EmptyContent>
                  </Empty>
                </div>
              ) : (
                <div className="divide-y divide-black/5">
                  {recentActivity.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href ?? "/dashboard"}
                      className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-zinc-50"
                    >
                      <div
                        className={cn(
                          "mt-1 size-2 rounded-full",
                          getActivityTone(item.type),
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-zinc-950">{item.title}</p>
                          <span className="shrink-0 text-xs text-zinc-500">
                            {formatDate(item.updatedAt)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-600">{item.detail}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Products</CardDescription>
              <CardTitle className="text-2xl">Manage catalog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-sm text-zinc-600">
                Review live product listings, pricing, and availability before
                each campaign.
              </p>
              <Link
                href="/dashboard/products"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Open Products
              </Link>
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Inventory</CardDescription>
              <CardTitle className="text-2xl">Track stock health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-sm text-zinc-600">
                Watch low-stock SKUs and keep the warehouse record aligned with
                the storefront.
              </p>
              <Link
                href="/dashboard/inventory"
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#c3a267]/30 bg-[#f6ede2] px-4 text-sm font-medium text-[#8c4f1c] transition-colors hover:bg-[#f0e1cf]"
              >
                View Inventory
              </Link>
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Orders</CardDescription>
              <CardTitle className="text-2xl">Process fulfillment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-sm text-zinc-600">
                Sort pending, confirmed, and shipped orders with one workflow.
              </p>
              <Link
                href="/dashboard/orders"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
              >
                Review Orders
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </SidebarInset>
  )
}
