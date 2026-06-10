import "server-only";

import { ConflictError, UnauthorizedError } from "@/server/http/errors";
import type { LoginInput, SignupInput } from "@/server/auth/auth.validation";
import { comparePassword, hashPassword } from "@/server/utils/password";
import { createUser, findUserByEmail, findUserByEmailWithPassword, findUserById } from "@/server/users/user.service";
import { toAuthUser } from "@/server/utils/safe-user";
import type { AuthUser } from "@/server/users/user.types";

export async function registerUser(input: SignupInput): Promise<AuthUser> {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new ConflictError("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(input.password);

  return createUser({
    name: input.name,
    email: input.email,
    passwordHash,
  });
}

export async function loginUser(input: LoginInput): Promise<AuthUser> {
  const user = await findUserByEmailWithPassword(input.email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  const passwordMatches = await comparePassword(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw new UnauthorizedError("Invalid email or password.");
  }

  return toAuthUser(user);
}

export async function getCurrentUser(userId: string): Promise<AuthUser | null> {
  return findUserById(userId);
}
