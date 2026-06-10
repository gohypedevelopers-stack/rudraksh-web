"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { OrderDTO } from "@/lib/dashboard-types"
import { formatCurrency, formatDateTime } from "@/lib/format"

type OrderDetailsDialogProps = {
  order: OrderDTO
}

export function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order details</DialogTitle>
          <DialogDescription>
            {order.id} · {order.itemCount} item{order.itemCount === 1 ? "" : "s"} ·{" "}
            {formatDateTime(order.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Customer
            </p>
            <p className="font-medium text-zinc-950">
              {order.customerName ?? "Guest"}
            </p>
            <p className="text-sm text-zinc-500">
              {order.email ?? "No email"} · {order.phone ?? "No phone"}
            </p>
          </div>
          <div className="space-y-1 md:text-right">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Total
            </p>
            <p className="font-medium text-zinc-950">
              {formatCurrency(order.totalAmount)}
            </p>
            <p className="text-sm text-zinc-500">Status: {order.status}</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit price</TableHead>
              <TableHead className="text-right">Line total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <p className="font-medium text-zinc-950">
                      {item.productName}
                    </p>
                    <p className="text-xs text-zinc-500">{item.productSlug}</p>
                  </div>
                </TableCell>
                <TableCell className="align-top tabular-nums font-medium">
                  {item.quantity}
                </TableCell>
                <TableCell className="align-top tabular-nums">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell className="align-top text-right tabular-nums font-medium">
                  {formatCurrency(item.lineTotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
