import "server-only"

import type { ZodError } from "zod"

export function getValidationErrorMessage(
  error: ZodError,
  fallbackMessage: string,
) {
  return error.issues[0]?.message ?? fallbackMessage
}
