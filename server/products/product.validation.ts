import { z } from "zod"

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }

  return value
}

const optionalText = (maxLength: number) =>
  z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(1)
      .max(maxLength)
      .optional(),
  )

const optionalUrl = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().url("Enter a valid image URL").optional(),
)

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Product name is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Use letters, numbers, and hyphens only")
    .transform((value) => value.toLowerCase()),
  description: optionalText(2000),
  category: optionalText(120),
  price: z.number().finite().min(0, "Price must be at least 0"),
  imageUrl: optionalUrl,
  isActive: z.boolean(),
  sku: z.string().trim().min(1, "SKU is required").max(120),
  stock: z.number().int("Stock must be an integer").min(0, "Stock must be at least 0"),
  lowStock: z
    .number()
    .int("Low stock threshold must be an integer")
    .min(0, "Low stock threshold must be at least 0"),
})

export const inventoryUpdateSchema = z.object({
  sku: z
    .preprocess(emptyStringToUndefined, z.string().trim().min(1).max(120).optional())
    .optional(),
  stock: z.number().int("Stock must be an integer").min(0, "Stock must be at least 0"),
  lowStock: z
    .number()
    .int("Low stock threshold must be an integer")
    .min(0, "Low stock threshold must be at least 0"),
})

export type ProductFormInput = z.infer<typeof productFormSchema>
export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>
