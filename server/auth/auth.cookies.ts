import "server-only";

import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/server/auth/auth.jwt";
import type { AuthUser } from "@/server/users/user.types";

export const AUTH_COOKIE_NAME = "rudraksha-auth";

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

type CookieStoreLike = {
  get(name: string): { value: string } | undefined;
};

function getBaseCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export function getAuthCookieOptions() {
  return {
    ...getBaseCookieOptions(),
    maxAge: SEVEN_DAYS_IN_SECONDS,
  };
}

export function getClearedAuthCookieOptions() {
  return {
    ...getBaseCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  };
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", getClearedAuthCookieOptions());
}

export function getAuthUserFromCookieStore(cookieStore: CookieStoreLike): AuthUser | null {
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return verifyAuthToken(token);
}
