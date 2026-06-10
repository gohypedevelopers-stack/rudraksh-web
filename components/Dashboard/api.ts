export async function readApiError(response: Response, fallbackMessage: string) {
  try {
    const payload = (await response.json()) as {
      error?: string
      message?: string
    }

    return payload.error ?? payload.message ?? fallbackMessage
  } catch {
    return fallbackMessage
  }
}
