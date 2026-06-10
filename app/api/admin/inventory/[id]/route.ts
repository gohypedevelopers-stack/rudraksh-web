import { requireAdmin } from "@/server/auth/admin"
import {
  getInventoryById,
  updateInventory,
} from "@/server/inventory/inventory.service"
import { inventoryUpdateSchema } from "@/server/inventory/inventory.validation"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { jsonRouteError } from "@/server/http/route"
import { getValidationErrorMessage } from "@/server/http/validation"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  context: RouteContext<"/api/admin/inventory/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const inventory = await getInventoryById(id)

    if (!inventory) {
      return jsonError("Inventory record not found.", 404, {
        code: "NOT_FOUND",
      })
    }

    return jsonSuccess(
      {
        success: true,
        inventory,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load the inventory record right now.")
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/inventory/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const body = await request.json().catch(() => null)
    const parsed = inventoryUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return jsonError(
        getValidationErrorMessage(parsed.error, "Please provide valid inventory details."),
        400,
        {
          code: "VALIDATION_ERROR",
        },
      )
    }

    const inventory = await updateInventory(id, parsed.data)

    return jsonSuccess(
      {
        success: true,
        inventory,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to update inventory right now.")
  }
}
