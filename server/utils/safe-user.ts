import "server-only";

import type { AuthUser } from "@/server/users/user.types";

export const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
} as const;

type SafeUserLike = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

export function toAuthUser(user: SafeUserLike): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
