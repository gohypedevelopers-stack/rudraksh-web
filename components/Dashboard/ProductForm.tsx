"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { readApiError } from "@/components/Dashboard/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { ProductDTO } from "@/lib/dashboard-types"
import { formatCurrency } from "@/lib/format"

type ProductFormState = {
  name: string
  slug: string
  description: string
  category: string
  price: string
  imageUrl: string
  isActive: boolean
  sku: string
  stock: string
  lowStock: string
}

function getInitialState(product?: ProductDTO | null): ProductFormState {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    price: product?.price ?? "",
    imageUrl: product?.imageUrl ?? "",
    isActive: product?.isActive ?? true,
    sku: product?.sku ?? "",
    stock: product ? String(product.stock) : "0",
    lowStock: product ? String(product.lowStock) : "5",
  }
}

type ProductFormProps = {
  onOpenChange: (open: boolean) => void
  product?: ProductDTO | null
}

export function ProductForm({ onOpenChange, product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formState, setFormState] = React.useState<ProductFormState>(() =>
    getInitialState(product),
  )

  const isEditing = Boolean(product)
  const dialogTitle = product ? `Edit ${product.name}` : "Add Product"

  function updateField<K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K],
  ) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const price = Number(formState.price)
    const stock = Number(formState.stock)
    const lowStock = Number(formState.lowStock)

    if (!formState.name.trim() || !formState.slug.trim() || !formState.sku.trim()) {
      toast.error("Product name, slug, and SKU are required.")
      return
    }

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Enter a valid product price.")
      return
    }

    if (!Number.isInteger(stock) || stock < 0) {
      toast.error("Enter a valid stock count.")
      return
    }

    if (!Number.isInteger(lowStock) || lowStock < 0) {
      toast.error("Enter a valid low-stock threshold.")
      return
    }

    if (formState.imageUrl.trim()) {
      try {
        new URL(formState.imageUrl.trim())
      } catch {
        toast.error("Enter a valid image URL or leave it blank.")
        return
      }
    }

    setIsSubmitting(true)
    const loadingToast = toast.loading(
      isEditing ? "Saving product…" : "Creating product…",
    )

    try {
      const endpoint = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products"
      const method = product ? "PATCH" : "POST"

      const response = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          slug: formState.slug.trim(),
          description: formState.description.trim(),
          category: formState.category.trim(),
          price,
          imageUrl: formState.imageUrl.trim(),
          isActive: formState.isActive,
          sku: formState.sku.trim(),
          stock,
          lowStock,
        }),
      })

      if (!response.ok) {
        const message = await readApiError(
          response,
          isEditing ? "Unable to save the product." : "Unable to create the product.",
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

      toast.success(isEditing ? "Product updated." : "Product created.", {
        id: loadingToast,
      })
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : isEditing
            ? "Unable to save the product."
            : "Unable to create the product.",
        {
          id: loadingToast,
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Manage catalog details and the initial inventory record from one
            place. Current price preview: {formatCurrency(formState.price || 0)}.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="product-name">Product name</Label>
              <Input
                id="product-name"
                name="name"
                autoComplete="off"
                value={formState.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="1 Mukhi Rudraksha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-slug">Slug</Label>
              <Input
                id="product-slug"
                name="slug"
                autoComplete="off"
                spellCheck={false}
                value={formState.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                placeholder="1-mukhi-rudraksha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-category">Category</Label>
              <Input
                id="product-category"
                name="category"
                autoComplete="off"
                value={formState.category}
                onChange={(event) => updateField("category", event.target.value)}
                placeholder="Premium Beads"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                name="description"
                value={formState.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the product for the storefront and internal team."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                name="price"
                inputMode="decimal"
                type="number"
                min="0"
                step="0.01"
                value={formState.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-image">Image URL</Label>
              <Input
                id="product-image"
                name="imageUrl"
                autoComplete="off"
                value={formState.imageUrl}
                onChange={(event) => updateField("imageUrl", event.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-sku">SKU</Label>
              <Input
                id="product-sku"
                name="sku"
                autoComplete="off"
                spellCheck={false}
                value={formState.sku}
                onChange={(event) => updateField("sku", event.target.value)}
                placeholder="RL-1001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-stock">Stock</Label>
              <Input
                id="product-stock"
                name="stock"
                inputMode="numeric"
                type="number"
                min="0"
                step="1"
                value={formState.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-low-stock">Low stock threshold</Label>
              <Input
                id="product-low-stock"
                name="lowStock"
                inputMode="numeric"
                type="number"
                min="0"
                step="1"
                value={formState.lowStock}
                onChange={(event) => updateField("lowStock", event.target.value)}
                placeholder="5"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
                <div className="space-y-1">
                  <Label htmlFor="product-active" className="text-sm font-medium">
                    Active listing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Active products are visible to shoppers once the storefront
                    syncs.
                  </p>
                </div>
                <Switch
                  id="product-active"
                  checked={formState.isActive}
                  onCheckedChange={(checked) =>
                    updateField("isActive", checked)
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="mr-2" />}
              {isEditing ? "Save Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
