// Create proper workspace API route at /api/workspaces/[workspaceId]/route.js
import { NextResponse } from "next/server";
import { Workspace } from "@/models/user/workspace";
import { validateSession } from "@/lib/auth";
import dbConnect from "@/config/dbconnect";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const session = await validateSession(req);
    console.log(params.workspaceId);
    const workspaceId = await params.workspaceId;

    const workspace = await Workspace.findById(workspaceId)
      .populate({
        path: "members.user",
        select: "name email image role",
      })
      .lean();

    if (!workspace?.members.some((m) => m.user._id.equals(session.user.id))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
