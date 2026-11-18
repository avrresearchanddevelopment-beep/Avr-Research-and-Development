/**
 * Mirrors the `Role` enum in prisma/schema.prisma.
 * Kept as a plain TS union (not re-exported from @prisma/client) so
 * client components can import it without pulling in Prisma.
 */
export type Role = "PUBLIC" | "STUDENT" | "CLIENT" | "ADMIN";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
