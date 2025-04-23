import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that don't require authentication
const AUTH_ROUTES = [
  "/auth",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

// Static files and API routes that should be excluded from middleware
const EXCLUDED_ROUTES = [
  "/api/auth", // NextAuth.js API routes
  "/_next/static",
  "/_next/image",
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

  // Get the authentication token
  const token = await getToken({
    req: request,
    secure: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Handle authenticated users
  if (token) {
    // Redirect authenticated users away from auth routes to home
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!token) {
    // Allow access to auth routes
    if (isAuthRoute) {
      return NextResponse.next();
    }
    // Redirect all other requests to login
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};
