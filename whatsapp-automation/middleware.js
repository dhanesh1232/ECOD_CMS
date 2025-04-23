// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/error",
];

const EXCLUDED_ROUTES = [
  "/api/auth",
  "/_next",
  "/favicon.ico",
  "/images",
  "/assets",
];

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Skip middleware for excluded routes
  if (EXCLUDED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Handle authenticated users
  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!token) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  return NextResponse.next();
}
