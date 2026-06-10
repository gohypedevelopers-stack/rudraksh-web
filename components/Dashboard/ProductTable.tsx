"use client"

import Link from "next/link"
import * as React from "react"

import { DeleteProductButton } from "@/components/Dashboard/DeleteProductButton"
import { ProductForm } from "@/components/Dashboard/ProductForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProductDTO, ProductStats } from "@/lib/dashboard-types"
import { formatCurrency, formatDate } from "@/lib/format"

type ProductTableProps = {
  products: ProductDTO[]
  stats: ProductStats
}

function getProductStatusClass(status: ProductDTO["status"]) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    case "LOW STOCK":
      return "border-amber-200 bg-amber-50 text-amber-700"
    case "OUT OF STOCK":
      return "border-rose-200 bg-rose-50 text-rose-700"
    case "INACTIVE":
      return "border-zinc-200 bg-zinc-50 text-zinc-500"
    default:
      return "border-zinc-200 bg-zinc-50 text-zinc-600"
  }
}

export function ProductTable({ products, stats }: ProductTableProps) {
  const [dialogState, setDialogState] = React.useState<
    { mode: "create" } | { mode: "edit"; product: ProductDTO } | null
  >(null)

  const lowStockProducts = products.filter(
    (product) =>
      product.isActive &&
      (product.status === "LOW STOCK" || product.status === "OUT OF STOCK"),
  )

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total catalog</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.totalCatalog}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            All product records tracked in the database.
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Active listings</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.activeListings}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Live catalog entries visible to shoppers.
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Low stock</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {stats.lowStockCount}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-zinc-500">
            Products at or below their reorder threshold.
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="border-black/5 bg-white/90 shadow-sm">
          <CardHeader className="flex flex-col gap-3 border-b border-black/5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Catalog table</CardTitle>
              <CardDescription>
                Review stock, pricing, and publish state before pushing updates
                live.
              </CardDescription>
            </div>
            <Button onClick={() => setDialogState({ mode: "create" })}>
              Add Product
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {products.length === 0 ? (
              <div className="p-6">
                <Empty className="border-border/70 bg-muted/20">
                  <EmptyHeader>
                    <EmptyTitle>No products found.</EmptyTitle>
                    <EmptyDescription>
                      Add your first product.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button onClick={() => setDialogState({ mode: "create" })}>
                      Add Your First Product
                    </Button>
                  </EmptyContent>
                </Empty>
              </div>
            ) : (
              <div className="px-6 pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="align-top">
                          <div className="space-y-1">
                            <p className="font-medium text-zinc-950">
                              {product.name}
                            </p>
                            <p className="max-w-[20rem] truncate text-xs text-zinc-500">
                              {product.slug}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          {product.category ?? "Uncategorized"}
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {product.sku ?? "—"}
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {product.stock}
                        </TableCell>
                        <TableCell className="align-top tabular-nums font-medium">
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell className="align-top">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${getProductStatusClass(product.status)}`}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="align-top text-zinc-500">
                          {formatDate(product.updatedAt)}
                        </TableCell>
                        <TableCell className="align-top">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setDialogState({ mode: "edit", product })
                              }
                            >
                              Edit
                            </Button>
                            <DeleteProductButton product={product} />
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
              <CardDescription>Low-stock watchlist</CardDescription>
              <CardTitle className="text-2xl">Reorder first</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {lowStockProducts.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No active products are currently below their reorder point.
                </p>
              ) : (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-950">
                          {product.name}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {product.category ?? "Uncategorized"} ·{" "}
                          {product.sku ?? "No SKU"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-white text-amber-700"
                      >
                        {product.stock} left
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm text-zinc-600">
                      Reorder threshold: {product.lowStock}. Update inventory
                      before the listing slips into stockout.
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-black/5 bg-white/90 shadow-sm">
            <CardHeader className="space-y-1">
              <CardDescription>Quick links</CardDescription>
              <CardTitle className="text-2xl">Move faster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <Link
                href="/dashboard/inventory"
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <span>Inspect inventory health</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/dashboard/orders"
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <span>Review active orders</span>
                <span aria-hidden="true">→</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {dialogState ? (
        <ProductForm
          key={
            dialogState.mode === "edit"
              ? `edit-${dialogState.product.id}`
              : "create"
          }
          onOpenChange={(open) => {
            if (!open) {
              setDialogState(null)
            }
          }}
          product={dialogState.mode === "edit" ? dialogState.product : null}
        />
      ) : null}
    </>
  )
}
