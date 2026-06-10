import { requireAdmin } from "@/server/auth/admin"
import { getOrderStats, getOrders } from "@/server/orders/order.service"
import { jsonRouteError } from "@/server/http/route"
import { jsonSuccess } from "@/server/http/response"

export const runtime = "nodejs"

export async function GET() {
  try {
    await requireAdmin()

    const [orders, stats] = await Promise.all([
      getOrders(),
      getOrderStats(),
    ])

    return jsonSuccess(
      {
        success: true,
        orders,
        stats,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load orders right now.")
  }
}
