import { requireAdmin } from "@/server/auth/admin"
import {
  getInventory,
  getInventoryStats,
} from "@/server/inventory/inventory.service"
import { jsonRouteError } from "@/server/http/route"
import { jsonSuccess } from "@/server/http/response"

export const runtime = "nodejs"

export async function GET() {
  try {
    await requireAdmin()

    const [inventory, stats] = await Promise.all([
      getInventory(),
      getInventoryStats(),
    ])

    return jsonSuccess(
      {
        success: true,
        inventory,
        stats,
      },
      200,
    )
  } catch (error) {
    return jsonRouteError(error, "Unable to load inventory right now.")
  }
}
