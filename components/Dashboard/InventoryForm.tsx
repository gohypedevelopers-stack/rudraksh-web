"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

type InventoryFormState = {
  sku: string
  stock: string
  lowStock: string
}

type InventoryFormProps = {
  state: InventoryFormState
  isSubmitting: boolean
  onCancel: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onFieldChange: <K extends keyof InventoryFormState>(
    key: K,
    value: InventoryFormState[K],
  ) => void
}

export function InventoryForm({
  state,
  isSubmitting,
  onCancel,
  onSubmit,
  onFieldChange,
}: InventoryFormProps) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="inventory-sku">SKU</Label>
          <Input
            id="inventory-sku"
            name="sku"
            autoComplete="off"
            spellCheck={false}
            value={state.sku}
            onChange={(event) => onFieldChange("sku", event.target.value)}
            placeholder="RL-1001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inventory-stock">Stock</Label>
          <Input
            id="inventory-stock"
            name="stock"
            inputMode="numeric"
            type="number"
            min="0"
            step="1"
            value={state.stock}
            onChange={(event) => onFieldChange("stock", event.target.value)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inventory-low-stock">Low stock threshold</Label>
          <Input
            id="inventory-low-stock"
            name="lowStock"
            inputMode="numeric"
            type="number"
            min="0"
            step="1"
            value={state.lowStock}
            onChange={(event) => onFieldChange("lowStock", event.target.value)}
            placeholder="5"
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2" />}
          Save Inventory
        </Button>
      </DialogFooter>
    </form>
  )
}
