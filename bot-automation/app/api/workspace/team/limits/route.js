import { NextResponse } from "next/server";
import { Workspace } from "@/models/user/workspace";
import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";

export async function GET(request) {
  await dbConnect();
  try {
    const session = await validateSession(request);
    const user = session.user;
    if (user instanceof NextResponse) return user;

    const workspace = await Workspace.findOne({
      "members.user": user.id,
      "members.status": "active",
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        ownerCount: workspace.members.filter((m) => m.role === "owner").length,
        memberLimit: workspace.limits.members,
        currentMembers: workspace.members.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
