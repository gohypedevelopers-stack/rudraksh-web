"use client"

import { UpdateStockDialog } from "@/components/Dashboard/UpdateStockDialog"
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
import type { InventoryDTO, InventoryStats } from "@/lib/dashboard-types"
import { formatDate } from "@/lib/format"

type InventoryTableProps = {
  inventory: InventoryDTO[]
  stats: InventoryStats
}

function getInventoryStatusClass(status: InventoryDTO["status"]) {
  switch (status) {
    case "HEALTHY":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    case "LOW STOCK":
      return "border-amber-200 bg-amber-50 text-amber-700"
    case "OUT OF STOCK":
      return "border-rose-200 bg-rose-50 text-rose-700"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

export function InventoryTable({ inventory, stats }: InventoryTableProps) {
  const lowStockItems = inventory.filter((item) => item.status !== "HEALTHY")

  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-black/5 bg-white/90 shadow-sm">
        <CardHeader className="space-y-1 border-b border-black/5">
          <CardTitle>Warehouse stock</CardTitle>
          <CardDescription>
            Monitor on-hand stock, reorder thresholds, and SKU health.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {inventory.length === 0 ? (
            <div className="p-6">
              <Empty className="border-border/70 bg-muted/20">
                <EmptyHeader>
                  <EmptyTitle>No inventory records found.</EmptyTitle>
                  <EmptyDescription>
                    Add a product to create its inventory record, then update
                    SKU and stock from this dashboard.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <p className="text-sm text-muted-foreground">
                    Inventory is created automatically when a new product is
                    added.
                  </p>
                </EmptyContent>
              </Empty>
            </div>
          ) : (
            <div className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Current stock</TableHead>
                    <TableHead>Low stock threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          <p className="font-medium text-zinc-950">
                            {item.productName}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {item.category ?? "Uncategorized"} ·{" "}
                            {item.productSlug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="align-top text-zinc-500">
                        {item.sku ?? "—"}
                      </TableCell>
                      <TableCell className="align-top tabular-nums font-medium">
                        {item.stock}
                      </TableCell>
                      <TableCell className="align-top tabular-nums font-medium">
                        {item.lowStock}
                      </TableCell>
                      <TableCell className="align-top">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${getInventoryStatusClass(item.status)}`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="align-top text-zinc-500">
                        {formatDate(item.updatedAt)}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex justify-end">
                          <UpdateStockDialog inventory={item} />
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
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total SKUs</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.totalSkus}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              One row per inventory record.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Ready to ship</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.readyToShipStock}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Stock available for fulfillment right now.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Below reorder</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.belowReorderCount}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Items requiring supplier follow-up.
            </CardContent>
          </Card>
          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Reserved stock</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stats.reservedStock}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-zinc-500">
              Currently held for open orders.
            </CardContent>
          </Card>
        </section>

        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="space-y-1">
            <CardDescription>Risk review</CardDescription>
            <CardTitle className="text-2xl">Replenish soon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No inventory records are currently below their reorder point.
              </p>
            ) : (
              lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-zinc-950">
                        {item.productName}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {item.category ?? "Uncategorized"} ·{" "}
                        {item.sku ?? "No SKU"}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-rose-200 bg-white text-rose-700"
                    >
                      {item.stock} on hand
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-zinc-600">
                    Reorder threshold is {item.lowStock}. Update the record
                    before it drops to zero.
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="space-y-1">
            <CardDescription>Operational note</CardDescription>
            <CardTitle className="text-2xl">Keep stock current</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0 text-sm text-zinc-600">
            <p>
              Keep SKU values aligned with the warehouse record so every order
              and product row points to the same item.
            </p>
            <p>
              Update stock before packing begins to avoid accidental oversells.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
