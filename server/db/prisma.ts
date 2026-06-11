import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { env } from "@/server/config/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaNeon({
  url: env.DATABASE_URL,
} as any)

function hasRequiredDelegates(client: PrismaClient | undefined): client is PrismaClient {
  return Boolean(
    client &&
      typeof client.product !== "undefined" &&
      typeof client.inventory !== "undefined" &&
      typeof client.order !== "undefined",
  )
}

const existingClient = globalForPrisma.prisma
let prismaClient: PrismaClient

if (hasRequiredDelegates(existingClient)) {
  prismaClient = existingClient
} else {
  prismaClient = new PrismaClient({ adapter })
}

export const prisma = prismaClient

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
