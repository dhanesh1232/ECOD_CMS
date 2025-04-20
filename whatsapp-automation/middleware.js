import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/en", // English homepage
  "/en/", // Alternative English homepage
  "/en/product", // Product page
  "/en/pricing", // Pricing page
  "/auth", // All auth pages
  "/_next", // Next.js internal routes
  "/favicon.ico", // Favicon
  "/api/auth", // Auth API endpoints
  "/images", // Public images
  "/assets", // Static assets
];

// Routes that should never be intercepted
const EXCLUDED_ROUTES = [
  "/api", // All API routes
  "/_next/static", // Next.js static files
  "/_next/image", // Next.js image optimization
  "/favicon.ico", // Favicon
];

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Skip middleware for excluded routes
  if (EXCLUDED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow public routes to proceed without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get authentication token
  const token = await getToken({ req: request });

  // Redirect unauthenticated users to login
  if (!token) {
    // Special case: don't redirect if already going to login
    if (pathname.startsWith("/auth/login")) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/auth/login", origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes
     * - Static files
     * - Image optimization files
     * - Favicon
     * - Public folders
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)",
  ],
};
