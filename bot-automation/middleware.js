import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = pathname.startsWith("/auth");
  console.log(token);
  const slug = token?.workspaceSlug;

  if (token) {
    if (isAuthPage || pathname === "/") {
      const redirectUrl = new URL(`${slug}`, origin);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, origin)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
