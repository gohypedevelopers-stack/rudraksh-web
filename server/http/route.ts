import "server-only"

import { isAppError } from "@/server/http/errors"
import { jsonError } from "@/server/http/response"

export function jsonRouteError(
  error: unknown,
  fallbackMessage: string,
) {
  if (isAppError(error)) {
    return jsonError(error.message, error.status, {
      code: error.code,
    })
  }

  console.error(fallbackMessage, error)
  return jsonError(fallbackMessage, 500)
}
