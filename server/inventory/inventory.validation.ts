import { z } from "zod"

const emptyStringToNull = (value: unknown) => {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  return value
}

export const inventoryUpdateSchema = z.object({
  sku: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1, "SKU cannot be empty").max(120).nullable().optional(),
  ),
  stock: z.number().int("Stock must be an integer").min(0, "Stock must be at least 0"),
  lowStock: z
    .number()
    .int("Low stock threshold must be an integer")
    .min(0, "Low stock threshold must be at least 0"),
})

export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>
