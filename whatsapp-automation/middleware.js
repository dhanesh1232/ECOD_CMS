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

<<<<<<< HEAD
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
=======
export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Skip middleware for excluded paths
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets')
  ) {
>>>>>>> 77bff3754318d391b2c732714e52eac71d1077f5
    return NextResponse.next();
  }

  // Get the authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

<<<<<<< HEAD
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
=======
  // If authenticated
  if (token) {
    // Redirect away from auth/public routes to home
    if (isPublicRoute || pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', origin));
    }
    return NextResponse.next();
  }
  // If not authenticated
  else {
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next();
    }
    // Redirect to login for private routes
    return NextResponse.redirect(new URL('/auth/login', origin));
>>>>>>> 77bff3754318d391b2c732714e52eac71d1077f5
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};
