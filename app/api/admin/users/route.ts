import { requireAdmin } from "@/server/auth/admin"
import { getAdminUsers, getUserStats } from "@/server/users/user.service"
import { jsonRouteError } from "@/server/http/route"
import { jsonSuccess } from "@/server/http/response"

export const runtime = "nodejs"

export async function GET() {
  try {
    await requireAdmin()

    const [users, stats] = await Promise.all([getAdminUsers(), getUserStats()])

    return jsonSuccess(
      {
        success: true,
        users,
        stats,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load users right now.")
  }
}
