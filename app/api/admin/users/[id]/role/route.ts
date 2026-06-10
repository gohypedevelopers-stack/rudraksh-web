import { requireAdmin } from "@/server/auth/admin"
import { jsonError, jsonSuccess } from "@/server/http/response"
import { jsonRouteError } from "@/server/http/route"
import { getValidationErrorMessage } from "@/server/http/validation"
import { updateUserRole } from "@/server/users/user.service"
import { userIdSchema, updateUserRoleSchema } from "@/server/users/user.validation"

export const runtime = "nodejs"

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/users/[id]/role">,
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

    const body = await request.json().catch(() => null)
    const parsed = updateUserRoleSchema.safeParse(body)

    if (!parsed.success) {
      return jsonError(
        getValidationErrorMessage(
          parsed.error,
          "Please provide a valid role.",
        ),
        400,
        {
          code: "VALIDATION_ERROR",
        },
      )
    }

    const user = await updateUserRole(parsedId.data, parsed.data.role)

    return jsonSuccess(
      {
        success: true,
        user,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to update the user role right now.")
  }
}
