import "server-only";

import { prisma } from "@/server/db/prisma";
import type { AuthUser, AuthUserWithPassword } from "@/server/users/user.types";
import { safeUserSelect, toAuthUser } from "@/server/utils/safe-user";

const userWithPasswordSelect = {
  ...safeUserSelect,
  passwordHash: true,
} as const;

export async function findUserByEmail(email: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: safeUserSelect,
  });

  return user ? toAuthUser(user) : null;
}

export async function findUserByEmailWithPassword(email: string): Promise<AuthUserWithPassword | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: userWithPasswordSelect,
  });

  return user ? { ...toAuthUser(user), passwordHash: user.passwordHash } : null;
}

export async function findUserById(id: string): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });

  return user ? toAuthUser(user) : null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<AuthUser> {
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
    },
    select: safeUserSelect,
  });

  return toAuthUser(user);
}
