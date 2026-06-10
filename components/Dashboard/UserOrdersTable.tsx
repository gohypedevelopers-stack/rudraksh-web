import { OrderDetailsDialog } from "@/components/Dashboard/OrderDetailsDialog"
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
import type { OrderDTO } from "@/lib/dashboard-types"
import { formatCurrency, formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

type UserOrdersTableProps = {
  orders: OrderDTO[]
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
    case "PENDING":
      return "border-rose-200 bg-rose-50 text-rose-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

export function UserOrdersTable({ orders }: UserOrdersTableProps) {
  return (
    <Card className="border-black/5 bg-white/90 shadow-sm">
      <CardHeader className="space-y-1 border-b border-black/5">
        <CardTitle>Order history</CardTitle>
        <CardDescription>
          Review every order tied to this user and open a full breakdown when needed.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="p-6">
            <Empty className="border-border/70 bg-muted/20">
              <EmptyHeader>
                <EmptyTitle>No orders found for this user.</EmptyTitle>
                <EmptyDescription>
                  Orders will appear here once this account checks out.
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
          <>
            <div className="grid gap-4 p-4 md:hidden">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-black/5 bg-[#faf8f2] p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-zinc-950">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                        getOrderStatusClass(order.status),
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                      <p className="text-xs text-zinc-500">Items</p>
                      <p className="mt-1 font-medium text-zinc-950">
                        {order.itemCount}
                      </p>
                    </div>
                    <div className="rounded-xl border border-black/5 bg-white px-3 py-2">
                      <p className="text-xs text-zinc-500">Total</p>
                      <p className="mt-1 font-medium text-zinc-950">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-zinc-600">{order.summary}</p>

                  <div className="mt-4">
                    <OrderDetailsDialog order={order} />
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden md:block">
              <div className="px-6 pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
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
                        <TableCell className="align-top">
                          <div className="space-y-1">
                            <p className="font-medium text-zinc-950">{order.id}</p>
                            <p className="max-w-[18rem] truncate text-xs text-zinc-500">
                              {order.summary}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {order.itemCount}
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell className="align-top">
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                              getOrderStatusClass(order.status),
                            )}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="align-top text-right">
                          <OrderDetailsDialog order={order} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
