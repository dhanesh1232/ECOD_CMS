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
    console.log(token);
    return SuccessHandles.Ok("Success", token);
  } catch (err) {
    ErrorHandles.InternalServer();
  }
}
