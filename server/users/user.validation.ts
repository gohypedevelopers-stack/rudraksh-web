import { z } from "zod"

export const userIdSchema = z.string().trim().min(1, "User ID is required")

export const userRoleSchema = z.enum(["USER", "ADMIN"], {
  message: "Role must be USER or ADMIN.",
})

export const updateUserRoleSchema = z.object({
  role: userRoleSchema,
})

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>
