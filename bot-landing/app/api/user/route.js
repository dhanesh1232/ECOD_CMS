import { ErrorHandles, SuccessHandles } from "@/lib/server/respons_handles";

import { getToken } from "next-auth/jwt";
const isProd = process.env.NODE_ENV === "production";
export async function GET(req) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: isProd
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
    });
    return SuccessHandles.Ok("Success", {
      loggedIn: !!token,
      user: token
        ? {
            name: token.name,
            email: token.email,
            workspaceSlug: token.workspaceSlug,
            id: token.userId,
            image: token.picture,
          }
        : null,
    });
  } catch (err) {
    ErrorHandles.InternalServer();
  }
}
