"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { readApiError } from "@/components/Dashboard/api"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import type { ProductDTO } from "@/lib/dashboard-types"

type DeleteProductButtonProps = {
  product: ProductDTO
}

export function DeleteProductButton({ product }: DeleteProductButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleConfirm() {
    setIsSubmitting(true)
    const loadingToast = toast.loading(
      product.isActive ? "Deactivating product…" : "Reactivating product…",
    )

    try {
      const response = product.isActive
        ? await fetch(`/api/admin/products/${product.id}`, {
            method: "DELETE",
            credentials: "include",
          })
        : await fetch(`/api/admin/products/${product.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: product.name,
              slug: product.slug,
              description: product.description ?? "",
              category: product.category ?? "",
              price: Number(product.price),
              imageUrl: product.imageUrl ?? "",
              isActive: true,
              sku: product.sku ?? "",
              stock: product.stock,
              lowStock: product.lowStock,
            }),
          })

      if (!response.ok) {
        const message = await readApiError(
          response,
          product.isActive
            ? "Unable to deactivate the product."
            : "Unable to reactivate the product.",
        )

        if (response.status === 401) {
          router.replace("/login")
          return
        }

        if (response.status === 403) {
          router.replace("/")
          return
        }

        throw new Error(message)
      }

      toast.success(
        product.isActive ? "Product deactivated." : "Product reactivated.",
        {
          id: loadingToast,
        },
      )
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : product.isActive
            ? "Unable to deactivate the product."
            : "Unable to reactivate the product.",
        {
          id: loadingToast,
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant={product.isActive ? "outline" : "secondary"}
          className={product.isActive ? "text-rose-700 hover:text-rose-700" : ""}
        >
          {product.isActive ? "Deactivate" : "Reactivate"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {product.isActive ? "Deactivate product?" : "Reactivate product?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {product.isActive
              ? "This product will stop appearing in the active catalog, but the record will stay in the database."
              : "This product will become active again and return to the catalog after the next refresh."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2" />}
            {product.isActive ? "Deactivate" : "Reactivate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
