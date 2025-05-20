import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const session = await validateSession(req);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401, headers }
      );
    }

    const user = await User.findById(session.user.id).populate({
      path: "workspaces.workspace",
      select: "name slug subscription members",
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, headers }
      );
    }

    // Extract populated workspaces
    const workspaces = user.workspaces
      .filter((ws) => ws.workspace)
      .map((ws) => ({
        id: ws.workspace._id,
        name: ws.workspace.name,
        slug: ws.workspace.slug,
        subscription: ws.workspace.subscription,
        members: ws.workspace.members.length,
        role: ws.role,
      }));

    return NextResponse.json(
      {
        message: "Success",
        workspaces,
        currentWorkspace: user.currentWorkspace,
      },
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Error in GET /api/workspaces:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
