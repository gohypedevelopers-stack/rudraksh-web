import { z } from "zod"

import { orderStatusValues } from "@/lib/dashboard-types"

export const orderStatusSchema = z.object({
  status: z.enum(orderStatusValues),
})

export type OrderStatusInput = z.infer<typeof orderStatusSchema>
export type OrderStatusValue = (typeof orderStatusValues)[number]
