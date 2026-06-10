"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { readApiError } from "@/components/Dashboard/api"
import { InventoryForm } from "@/components/Dashboard/InventoryForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { InventoryDTO } from "@/lib/dashboard-types"

type InventoryFormState = {
  sku: string
  stock: string
  lowStock: string
}

function getInitialState(inventory: InventoryDTO): InventoryFormState {
  return {
    sku: inventory.sku ?? "",
    stock: String(inventory.stock),
    lowStock: String(inventory.lowStock),
  }
}

type InventoryUpdateFormProps = {
  inventory: InventoryDTO
  onClose: () => void
}

function InventoryUpdateForm({ inventory, onClose }: InventoryUpdateFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formState, setFormState] = React.useState<InventoryFormState>(() =>
    getInitialState(inventory),
  )

  function updateField<K extends keyof InventoryFormState>(
    key: K,
    value: InventoryFormState[K],
  ) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const stock = Number(formState.stock)
    const lowStock = Number(formState.lowStock)

    if (!Number.isInteger(stock) || stock < 0) {
      toast.error("Enter a valid stock count.")
      return
    }

    if (!Number.isInteger(lowStock) || lowStock < 0) {
      toast.error("Enter a valid low-stock threshold.")
      return
    }

    setIsSubmitting(true)
    const loadingToast = toast.loading("Saving inventory…")

    try {
      const response = await fetch(`/api/admin/inventory/${inventory.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: formState.sku.trim(),
          stock,
          lowStock,
        }),
      })

      if (!response.ok) {
        const message = await readApiError(response, "Unable to save inventory.")

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

      toast.success("Inventory saved.", {
        id: loadingToast,
      })
      onClose()
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save inventory.",
        {
          id: loadingToast,
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <InventoryForm
      state={formState}
      isSubmitting={isSubmitting}
      onCancel={onClose}
      onSubmit={handleSubmit}
      onFieldChange={updateField}
    />
  )
}

type UpdateStockDialogProps = {
  inventory: InventoryDTO
}

export function UpdateStockDialog({ inventory }: UpdateStockDialogProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" type="button">
          Update
        </Button>
      </DialogTrigger>

      {open ? (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update inventory</DialogTitle>
            <DialogDescription>
              {inventory.productName} · SKU {inventory.sku ?? "No SKU"}
            </DialogDescription>
          </DialogHeader>

          <InventoryUpdateForm
            key={inventory.id}
            inventory={inventory}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
