import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = [
  "/en",
  "/en/",
  "/en/product",
  "/en/pricing",
  "/auth",
  "/_next",
  "/favicon.ico",
  "/api/auth",
  "/images",
  "/assets",
];

const EXCLUDED_ROUTES = [
  "/api",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
];

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  if (EXCLUDED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secure: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Handle authenticated users
  if (token) {
    if (isPublicRoute && !pathname.startsWith("/auth/callback")) {
      return NextResponse.redirect(new URL("/", origin));
    }
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!token) {
    if (isPublicRoute) return NextResponse.next();
    if (pathname.startsWith("/auth/login")) return NextResponse.next();
    return NextResponse.redirect(new URL("/en", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};
