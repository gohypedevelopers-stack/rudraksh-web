import { type NextRequest } from "next/server";
import { createAuthToken } from "@/server/auth/auth.jwt";
import { clearAuthCookie, getAuthUserFromCookieStore, setAuthCookie } from "@/server/auth/auth.cookies";
import { loginSchema, signupSchema } from "@/server/auth/auth.validation";
import { getCurrentUser, loginUser, registerUser } from "@/server/auth/auth.service";
import { isAppError } from "@/server/http/errors";
import { jsonError, jsonSuccess } from "@/server/http/response";

export async function signup(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Please provide a valid name, email, and password.", 400);
    }

    const user = await registerUser(parsed.data);
    const token = createAuthToken(user);
    const response = jsonSuccess({ user }, 201);

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    if (isAppError(error)) {
      return jsonError(error.message, error.status, { code: error.code });
    }

    console.error("AUTH_SIGNUP_ERROR", error);
    return jsonError("Unable to create your account right now.", 500);
  }
}

export async function login(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Please provide a valid email and password.", 400);
    }

    const user = await loginUser(parsed.data);
    const token = createAuthToken(user);
    const response = jsonSuccess({ user }, 200);

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    if (isAppError(error)) {
      return jsonError(error.message, error.status, { code: error.code });
    }

    console.error("AUTH_LOGIN_ERROR", error);
    return jsonError("Unable to sign you in right now.", 500);
  }
}

export async function logout() {
  const response = jsonSuccess({ success: true }, 200);
  clearAuthCookie(response);
  return response;
}

export async function me(request: NextRequest) {
  try {
    const session = getAuthUserFromCookieStore(request.cookies);

    if (!session) {
      return jsonError("Unauthorized", 401);
    }

    const user = await getCurrentUser(session.id);

    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    return jsonSuccess({ user }, 200);
  } catch (error) {
    console.error("AUTH_ME_ERROR", error);
    return jsonError("Unable to load the current user.", 500);
  }
}
