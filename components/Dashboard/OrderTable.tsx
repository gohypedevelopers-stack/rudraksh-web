"use client"

import { OrderDetailsDialog } from "@/components/Dashboard/OrderDetailsDialog"
import { OrderStatusSelect } from "@/components/Dashboard/OrderStatusSelect"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { OrderDTO, OrderStats } from "@/lib/dashboard-types"
import { formatCurrency, formatDate } from "@/lib/format"

type OrderTableProps = {
  orders: OrderDTO[]
  stats: OrderStats
}

function getOrderStatusClass(status: OrderDTO["status"]) {
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
      return "border-rose-200 bg-rose-50 text-rose-700"
    case "PENDING":
      return "border-rose-200 bg-rose-50 text-rose-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

export function OrderTable({ orders, stats }: OrderTableProps) {
  const attentionOrders = orders.filter((order) =>
    ["PENDING", "CONFIRMED", "PROCESSING"].includes(order.status),
  ).slice(0, 3)

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Processing</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.processingCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Orders currently in fulfilment.
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Confirmed</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.confirmedCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Paid or approved orders ready for pick-pack.
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Shipped</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.shippedCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Orders handed to the courier.
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.pendingCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Waiting for payment or confirmation.
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="space-y-1 border-b border-black/5">
            <CardTitle>Order queue</CardTitle>
            <CardDescription>
              Track each order from checkout to delivery completion.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="p-6">
                <Empty className="border-border/70 bg-muted/20">
                  <EmptyHeader>
                    <EmptyTitle>No orders found.</EmptyTitle>
                    <EmptyDescription>
                      The dashboard will show live order fulfillment once the
                      first checkout is recorded in Neon.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <p className="text-sm text-muted-foreground">
                      No fabricated order rows are shown here.
                    </p>
                  </EmptyContent>
                </Empty>
              </div>
            ) : (
              <div className="px-6 pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email / Phone</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="align-top font-medium text-zinc-950">
                          {order.id}
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="space-y-1">
                            <p className="font-medium text-zinc-950">
                              {order.customerName ?? "Guest"}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {order.itemCount} item
                              {order.itemCount === 1 ? "" : "s"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="space-y-1 text-sm text-zinc-600">
                            <p className="truncate">{order.email ?? "No email"}</p>
                            <p className="truncate">{order.phone ?? "No phone"}</p>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="max-w-[16rem] space-y-1">
                            <p className="truncate text-sm text-zinc-950">
                              {order.summary}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell className="align-top">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${getOrderStatusClass(order.status)}`}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex flex-col items-end gap-2">
                            <OrderStatusSelect
                              key={`${order.id}-${order.status}`}
                              orderId={order.id}
                              status={order.status}
                            />
                            <OrderDetailsDialog order={order} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Attention queue</CardDescription>
              <CardTitle className="text-2xl">Respond next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {attentionOrders.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No open orders need immediate attention.
                </p>
              ) : (
                attentionOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-black/5 bg-zinc-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-950">
                          {order.id}
                        </p>
                        <p className="truncate text-sm text-zinc-500">
                          {order.customerName ?? "Guest"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${getOrderStatusClass(order.status)}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm text-zinc-600">
                      {order.summary}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {formatCurrency(stats.revenueTotal)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-sm text-zinc-600">
              <p>
                Total fulfilled and pending order value stored in the database.
              </p>
              <p>
                Update statuses inline to keep the fulfillment timeline current.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
