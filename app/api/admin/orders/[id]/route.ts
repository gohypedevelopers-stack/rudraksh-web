import { requireAdmin } from "@/server/auth/admin"
import {
  getOrderById,
  updateOrderStatus,
} from "@/server/orders/order.service"
import { orderStatusSchema } from "@/server/orders/order.validation"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { jsonRouteError } from "@/server/http/route"
import { getValidationErrorMessage } from "@/server/http/validation"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  context: RouteContext<"/api/admin/orders/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const order = await getOrderById(id)

    if (!order) {
      return jsonError("Order not found.", 404, {
        code: "NOT_FOUND",
      })
    }

    return jsonSuccess(
      {
        success: true,
        order,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load the order right now.")
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/orders/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const body = await request.json().catch(() => null)
    const parsed = orderStatusSchema.safeParse(body)

    if (!parsed.success) {
      return jsonError(
        getValidationErrorMessage(parsed.error, "Please choose a valid order status."),
        400,
        {
          code: "VALIDATION_ERROR",
        },
      )
    }

    const order = await updateOrderStatus(id, parsed.data)

    return jsonSuccess(
      {
        success: true,
        order,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to update the order right now.")
  }
}
