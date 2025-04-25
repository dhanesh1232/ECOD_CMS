import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
