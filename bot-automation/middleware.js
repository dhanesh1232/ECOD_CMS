import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Validate workspace slug format (prefix-xxxx-xxxx or xxxx-xxxx)
const isValidWorkspaceSlug = (slug) => {
  return /^(?:[a-z0-9]+-)?[a-z0-9]{4}-[a-z0-9]{4}$/.test(slug);
};

// Cache for workspace access verification (short-lived)
const accessCache = new Map();
const CACHE_TTL = 5000; // 5 seconds

export async function middleware(req) {
  const { pathname, origin } = new URL(req.url);
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return safeRedirectToLogin(pathname, origin);
  }

  const { role, workspaceSlug: userWorkspaceSlug, id: userId } = token;

  // Handle super_admin role
  if (role === "super_admin") {
    // If super_admin tries to access a workspace, redirect to admin
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", origin));
    }
    // Allow static or API routes
    if (shouldSkipMiddleware(pathname)) {
      return NextResponse.next();
    }
    // Default redirect for super_admin
    return NextResponse.redirect(new URL("/admin", origin));
  }

  // Handle user role
  if (role === "user") {
    if (!userWorkspaceSlug || !isValidWorkspaceSlug(userWorkspaceSlug)) {
      return NextResponse.redirect(new URL("/404", origin));
    }

    // Redirect root path to default workspace dashboard
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${userWorkspaceSlug}/dashboard`, origin)
      );
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const pathWorkspaceSlug = pathSegments[0];

    // Correct invalid workspace slug and preserve path
    if (!isValidWorkspaceSlug(pathWorkspaceSlug)) {
      const remainingPath = pathSegments.slice(1).join("/");
      const newPath = remainingPath
        ? `/${userWorkspaceSlug}/${remainingPath}`
        : `/${userWorkspaceSlug}/dashboard`;
      return NextResponse.redirect(new URL(newPath, origin));
    }

    // Handle workspace access and path correction
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
        console.error("Workspace access verification failed:", error);
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

// Helper functions (remain the same as in your original code)
function shouldSkipMiddleware(pathname) {
  return ["/api/", "/auth/", "/_next/", "/static/", "/favicon.ico"].some(
    (path) => pathname.startsWith(path) || pathname === path
  );
}

function safeRedirectToLogin(pathname, origin) {
  const sanitizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const callbackUrl = encodeURIComponent(sanitizedPath);
  return NextResponse.redirect(
    new URL(`/auth/login?callbackUrl=${callbackUrl}`, origin)
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
    const result = {
      status: res.status,
      ...data,
      fromCache: false,
      error: res.status !== 200 ? true : false,
    };

    // Cache successful verifications
    if (res.status === 200) {
      accessCache.set(cacheKey, {
        result,
        timestamp: Date.now(),
      });
    }

    return result;
  } catch (error) {
    console.error("Access verification failed:", error);
    return {
      error: "Network error",
      redirectTo: "/500",
    };
  }
}

function handleVerificationError(result, origin) {
  if (result.redirectTo) {
    return NextResponse.redirect(new URL(result.redirectTo, origin));
  }

  return NextResponse.redirect(
    new URL(result.status === 404 ? "/404" : "/forbidden", origin)
  );
}

function handleWorkspaceSwitch(verificationResult, req, origin) {
  const response = NextResponse.next();
  const isProduction = process.env.NODE_ENV === "production";
  const cookieName = isProduction
    ? "__Secure-next-auth.session-token.workspace"
    : "next-auth.session-token.workspace";

  if (verificationResult.workspace) {
    response.cookies.set(cookieName, verificationResult.workspace.slug, {
      path: "/",
      sameSite: "lax",
      secure: isProduction,
      domain: isProduction ? "bot-automation.vercel.app" : undefined,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|static|404|500|forbidden).*)",
  ],
};
