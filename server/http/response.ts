import "server-only";

import { NextResponse } from "next/server";

export function jsonSuccess<TBody>(body: TBody, status = 200) {
  return NextResponse.json(body, { status });
}

export function jsonError(message: string, status = 500, extra?: Record<string, unknown>) {
  return NextResponse.json(
    {
      error: message,
      ...(extra ?? {}),
    },
    { status },
  );
}
