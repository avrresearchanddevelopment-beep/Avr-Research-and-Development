import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import type { Role } from "@/types/user";

// Maps a protected path prefix to the role allowed to access it, and the
// login page to bounce unauthenticated/unauthorized visitors back to.
const PROTECTED_PREFIXES: { prefix: string; role: Role; loginPath: string }[] = [
  { prefix: "/student/dashboard", role: "STUDENT", loginPath: "/student" },
  { prefix: "/client/dashboard", role: "CLIENT", loginPath: "/client" },
  { prefix: "/admin/dashboard", role: "ADMIN", loginPath: "/admin" },
];

// POST rate limits per client IP: limit requests per window.
const RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "/api/auth/login": { limit: 10, windowMs: 15 * 60 * 1000 },
  "/api/auth/register": { limit: 5, windowMs: 60 * 60 * 1000 },
  "/api/contact": { limit: 5, windowMs: 10 * 60 * 1000 },
};

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rule = RATE_LIMITS[pathname];
  if (rule && request.method === "POST") {
    const result = rateLimit(
      `${pathname}:${clientIp(request)}`,
      rule.limit,
      rule.windowMs,
    );
    if (!result.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(result.retryAfter) } },
      );
    }
    return NextResponse.next();
  }

  const match = PROTECTED_PREFIXES.find((p) => pathname.startsWith(p.prefix));
  if (!match) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session || session.role !== match.role) {
    const loginUrl = new URL(match.loginPath, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/dashboard/:path*",
    "/client/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/api/auth/login",
    "/api/auth/register",
    "/api/contact",
  ],
};