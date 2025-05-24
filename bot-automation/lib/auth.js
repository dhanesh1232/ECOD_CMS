//
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ErrorHandles } from "./server/errors";

export async function validateSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    ErrorHandles.UnauthorizedAccess();
  }
  return session;
}
