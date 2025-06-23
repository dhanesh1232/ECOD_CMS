import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PUBLIC_PATHS, SLUG_REGEX } from "./lib/validator";

// Validate workspace slug format (prefix-xxxx-xxxx or xxxx-xxxx)
const isValidWorkspaceSlug = (slug) => {
  return SLUG_REGEX.test(slug);
};

// Cache for workspace access verification (short-lived)
const accessCache = new Map();
const CACHE_TTL = 5000; // 5 seconds
const isProd = process.env.NODE_ENV === "production";
const cookies_name = isProd
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";
const isAdmin = process.env.SUPER_ADMIN_EMAIL;
// List of valid paths that don't require workspace slug
const VALID_NON_WORKSPACE_PATHS = ["/workspaces", "/404", "/500", "/forbidden"];
const SKIP_PATHS = [
  "/api/",
  "/_next/",
  "/static/",
  "/favicon.ico",
  "/500",
  "/forbidden",
];
export async function middleware(req) {
  const { pathname, origin, searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callbackUrl");
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: cookies_name,
  });

  console.log(token, "initial call of token"); /// is this run first right
  // Skip middleware for API, static files, etc.
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!token) {
    // Allow only specific auth paths and 404
    if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    // Redirect all other paths to login with callback URL
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, origin)
    );
  }
  // Block access to auth paths
  if (pathname.startsWith("/auth")) {
    if (!token?.workspaceSlug && token.email !== isAdmin) {
      return NextResponse.redirect(new URL("/workspaces", origin));
    }

    return NextResponse.redirect(
      new URL(`/${token.workspaceSlug}/dashboard`, origin)
    );
  }

  // Allow access to 404 page for authenticated users
  if (pathname === "/404") {
    return NextResponse.next();
  }

  const { role, workspaceSlug: userWorkspaceSlug, id: userId } = token;

  // Handle super_admin role
  if (role === "super_admin") {
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin", origin));
  }

  // Handle regular users
  if (role === "user") {
    // Check if path is one of the valid non-workspace paths
    if (VALID_NON_WORKSPACE_PATHS.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // If user doesn't have a workspaceSlug, redirect to workspaces page
    if (!userWorkspaceSlug || !isValidWorkspaceSlug(userWorkspaceSlug)) {
      return NextResponse.redirect(new URL("/workspaces", origin));
    }

    // ✅ Handle root path before slug validation
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${userWorkspaceSlug}/dashboard`, origin)
      );
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const pathWorkspaceSlug = pathSegments[0];

    // If path doesn't start with valid workspace slug
    if (!isValidWorkspaceSlug(pathWorkspaceSlug)) {
      return NextResponse.redirect(new URL("/404", origin));
    }

    // Verify workspace access if different from user's default workspace
    if (pathWorkspaceSlug !== userWorkspaceSlug) {
      try {
        const verificationResult = await verifyWorkspaceAccess(
          userId,
          pathWorkspaceSlug
        );

        if (verificationResult.error) {
          return handleVerificationError(verificationResult, origin);
        }

        const response = handleWorkspaceSwitch(verificationResult, req, origin);

        // Redirect to dashboard if path is only the workspace slug
        if (pathSegments.length === 1) {
          return NextResponse.redirect(
            new URL(`/${pathWorkspaceSlug}/dashboard`, origin)
          );
        }

        return response;
      } catch (error) {
        return NextResponse.redirect(new URL("/500", origin));
      }
    }

    // Redirect to dashboard if path is only the workspace slug
    if (pathSegments.length === 1) {
      return NextResponse.redirect(
        new URL(`/${pathWorkspaceSlug}/dashboard`, origin)
      );
    }
  }

  return NextResponse.next();
}

// Helper functions
function shouldSkipMiddleware(pathname) {
  return SKIP_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === path
  );
}

async function verifyWorkspaceAccess(userId, workspaceSlug) {
  const cacheKey = `${userId}:${workspaceSlug}`;
  const cached = accessCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }

  try {
    const res = await fetch(
      `${
        process.env.NEXTAUTH_URL
      }/api/workspace/check-access?slug=${encodeURIComponent(workspaceSlug)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=10",
        },
      }
    );

    const data = await res.json();
    return {
      status: res.status,
      ...data,
      fromCache: false,
      error: res.status !== 200,
    };
  } catch (error) {
    return { error: "Network error", redirectTo: "/500" };
  }
}

function handleVerificationError(result, origin) {
  return NextResponse.redirect(
    new URL(result.status === 404 ? "/404" : "/forbidden", origin)
  );
}

function handleWorkspaceSwitch(verificationResult, req, origin) {
  const response = NextResponse.next();
  if (verificationResult.workspace) {
    response.cookies.set({
      name: isProd
        ? "__Secure-next-auth.session-token.workspace"
        : "next-auth.session-token.workspace",
      value: verificationResult.workspace.slug,
      path: "/",
      sameSite: "lax",
      secure: isProd,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"],
};
