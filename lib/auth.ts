import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import type { Role, SessionUser } from "@/types/user";

const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not set. Add a strong random value to your .env file.",
    );
  }
  return new TextEncoder().encode(secret);
}

// ---------------------------------------------------------------------------
// Passwords
// ---------------------------------------------------------------------------

const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}

// ---------------------------------------------------------------------------
// Session tokens (signed JWT, stored in an httpOnly cookie)
// ---------------------------------------------------------------------------

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.sub !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role as Role,
    };
  } catch {
    // Expired, malformed, or invalid signature — treat as "not logged in"
    // rather than throwing, so callers don't need a try/catch of their own.
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS };
