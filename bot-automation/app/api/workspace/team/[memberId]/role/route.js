import { NextResponse } from "next/server";
import { Workspace } from "@/models/user/workspace";
import { validateSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const session = await validateSession(request);
    const user = session.user;
    if (user instanceof NextResponse) return user;

    const { memberId } = params;
    const { role } = await request.json();

    const workspace = await Workspace.findOne({
      "members.user": user._id,
      "members.status": "active",
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    const currentUserMember = workspace.members.find(
      (m) => m.user.toString() === user._id.toString()
    );

    if (!["owner", "admin"].includes(currentUserMember.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const memberToUpdate = workspace.members.id(memberId);
    if (!memberToUpdate) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    memberToUpdate.role = role;
    await workspace.save();

    return NextResponse.json({
      data: {
        id: memberToUpdate._id,
        role: memberToUpdate.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
