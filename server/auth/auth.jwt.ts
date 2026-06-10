import "server-only";

import jwt from "jsonwebtoken";
import { env } from "@/server/config/env";
import type { AuthUser } from "@/server/users/user.types";

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

type AuthTokenPayload = AuthUser;

export function createAuthToken(user: AuthUser) {
  return jwt.sign(user as AuthTokenPayload, env.JWT_SECRET, {
    expiresIn: SEVEN_DAYS_IN_SECONDS,
  });
}

export function verifyAuthToken(token: string) {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }

    const { id, name, email, role } = decoded as AuthTokenPayload;

    if (!id || !email || !role) {
      return null;
    }

    return {
      id,
      name: typeof name === "string" ? name : null,
      email,
      role,
    } satisfies AuthUser;
  } catch {
    return null;
  }
}
