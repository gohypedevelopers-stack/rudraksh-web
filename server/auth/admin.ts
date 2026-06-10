import "server-only";

import { cookies } from "next/headers";

import { ForbiddenError, UnauthorizedError } from "@/server/http/errors";
import { getAuthUserFromCookieStore } from "@/server/auth/auth.cookies";
import { getCurrentUser } from "@/server/auth/auth.service";
import type { AuthUser } from "@/server/users/user.types";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

async function resolveCookieStore(cookieStore?: CookieStore) {
  return cookieStore ?? (await cookies())
}

export async function getAdminUser(cookieStore?: CookieStore): Promise<AuthUser | null> {
  const store = await resolveCookieStore(cookieStore)
  const session = getAuthUserFromCookieStore(store)

  if (!session) {
    return null
  }

  const user = await getCurrentUser(session.id)

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

export async function requireAdmin(cookieStore?: CookieStore): Promise<AuthUser> {
  const store = await resolveCookieStore(cookieStore)
  const session = getAuthUserFromCookieStore(store)

  if (!session) {
    throw new UnauthorizedError("Unauthorized")
  }

  const user = await getCurrentUser(session.id)

  if (!user) {
    throw new UnauthorizedError("Unauthorized")
  }

  if (user.role !== "ADMIN") {
    throw new ForbiddenError("Forbidden")
  }

  return user
}
