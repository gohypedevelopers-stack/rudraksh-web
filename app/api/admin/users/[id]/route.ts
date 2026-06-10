import { requireAdmin } from "@/server/auth/admin"
import { jsonRouteError } from "@/server/http/route"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { getUserByIdWithOrders } from "@/server/users/user.service"
import { userIdSchema } from "@/server/users/user.validation"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  context: RouteContext<"/api/admin/users/[id]">,
) {
  try {
    await requireAdmin()

    const { id } = await context.params
    const parsedId = userIdSchema.safeParse(id)

    if (!parsedId.success) {
      return jsonError("Please provide a valid user ID.", 400, {
        code: "VALIDATION_ERROR",
      })
    }

    const user = await getUserByIdWithOrders(parsedId.data)

    if (!user) {
      return jsonError("User not found.", 404, {
        code: "NOT_FOUND",
      })
    }

    return jsonSuccess(
      {
        success: true,
        user,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load the user right now.")
  }
}
