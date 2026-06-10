export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
};

export type AuthUserWithPassword = AuthUser & {
  passwordHash: string;
};
