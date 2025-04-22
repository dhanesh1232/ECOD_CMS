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
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

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
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};
