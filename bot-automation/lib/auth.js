//
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function validateSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return new NextResponse(
      {
        message: "Unauthorized",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        status: 401,
      }
    );
  }
  return session;
}
