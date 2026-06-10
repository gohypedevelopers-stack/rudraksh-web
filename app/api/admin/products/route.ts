import { requireAdmin } from "@/server/auth/admin"
import { createProduct, getProductStats, getProducts } from "@/server/products/product.service"
import { productFormSchema } from "@/server/products/product.validation"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { jsonRouteError } from "@/server/http/route"
import { getValidationErrorMessage } from "@/server/http/validation"

export const runtime = "nodejs"

export async function GET() {
  try {
    await requireAdmin()

    const [products, stats] = await Promise.all([
      getProducts(),
      getProductStats(),
    ])

    return jsonSuccess(
      {
        success: true,
        products,
        stats,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load products right now.")
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()

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

    const product = await createProduct(parsed.data)

    return jsonSuccess(
      {
        success: true,
        product,
      },
      201,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to create the product right now.")
  }
}
