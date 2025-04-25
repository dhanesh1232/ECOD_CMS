import { getServerSession } from "next-auth";
import dbConnect from "@/config/dbconnect";
import User from "@/model/par-user";

export async function GET() {
  await dbConnect();
  const session = await getServerSession();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await User.findById(session.user.id);
    return new Response(JSON.stringify({ exists: !!user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("User verification error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
