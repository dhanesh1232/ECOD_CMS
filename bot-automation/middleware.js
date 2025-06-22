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

  // ✅ Allow /workspaces if authenticated (even without workspaceSlug)
  if (pathname.startsWith("/workspaces")) {
    if (!token) {
      return safeRedirectToLogin(pathname, origin);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth") && token) {
    const redirectPath =
      token.role === "super_admin"
        ? "/admin"
        : `/${token.workspaceSlug}/dashboard`;
    return NextResponse.redirect(new URL(redirectPath, origin));
  }

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
  // Handle user role
  if (role === "user") {
    if (!userWorkspaceSlug) {
      return NextResponse.redirect(new URL("/workspaces", origin));
    }

    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${userWorkspaceSlug}/dashboard`, origin)
      );
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const pathWorkspaceSlug = pathSegments[0];

    if (!isValidWorkspaceSlug(pathWorkspaceSlug)) {
      // Invalid slug in URL — show 404
      return NextResponse.redirect(new URL("/404", origin));
    }

    if (pathWorkspaceSlug !== userWorkspaceSlug) {
      const verificationResult = await verifyWorkspaceAccess(
        userId,
        pathWorkspaceSlug
      );

      if (verificationResult.error) {
        return handleVerificationError(verificationResult, origin);
      }

      const response = handleWorkspaceSwitch(verificationResult, req, origin);

      if (pathSegments.length === 1) {
        return NextResponse.redirect(
          new URL(`/${pathWorkspaceSlug}/dashboard`, origin)
        );
      }

      return response;
    }

    // ✅ If path is just /slug → redirect to dashboard
    if (pathSegments.length === 1) {
      return NextResponse.redirect(
        new URL(`/${pathWorkspaceSlug}/dashboard`, origin)
      );
    }

    // ✅ If user accesses /slug/anything, let Next.js handle it (shows 404 if invalid)
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Helper functions (remain the same as in your original code)
function shouldSkipMiddleware(pathname) {
  return ["/api/", "/_next/", "/static/", "/favicon.ico"].some(
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

  const cookieOptions = {
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  };
  if (verificationResult.workspace) {
    try {
      if (isProduction && origin) {
        const domain = new URL(origin).hostname;
        if (domain.endsWith("ecodrix.com")) {
          cookieOptions.domain = "ecodrix.com"; // Root domain only
        }
      }
    } catch (err) {
      console.error("Error parsing origin for cookie domain:", e);
    }
    response.cookies.set({
      name: cookieName,
      value: verificationResult.workspace.slug,
      ...cookieOptions,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|static|404|500|forbidden).*)",
  ],
};
