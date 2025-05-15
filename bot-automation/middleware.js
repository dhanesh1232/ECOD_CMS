import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = pathname.startsWith("/auth");

  if (token && (isAuthPage || pathname === "/")) {
    return NextResponse.redirect(new URL(`/${token.workspaceSlug}`, req.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`,
        req.url
      )
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
