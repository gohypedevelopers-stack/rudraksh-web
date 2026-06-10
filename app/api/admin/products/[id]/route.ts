import { requireAdmin } from "@/server/auth/admin"
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/server/products/product.service"
import { productFormSchema } from "@/server/products/product.validation"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { jsonRouteError } from "@/server/http/route"
import { getValidationErrorMessage } from "@/server/http/validation"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const product = await getProductById(id)

    if (!product) {
      return jsonError("Product not found.", 404, {
        code: "NOT_FOUND",
      })
    }

    return jsonSuccess(
      {
        success: true,
        product,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load the product right now.")
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const body = await request.json().catch(() => null)
    const parsed = productFormSchema.safeParse(body)

    if (!parsed.success) {
      return jsonError(
        getValidationErrorMessage(parsed.error, "Please provide valid product details."),
        400,
        {
          code: "VALIDATION_ERROR",
        },
      )
    }

    const product = await updateProduct(id, parsed.data)

    return jsonSuccess(
      {
        success: true,
        product,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to update the product right now.")
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const product = await deleteProduct(id)

    return jsonSuccess(
      {
        success: true,
        product,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to deactivate the product right now.")
  }
}
