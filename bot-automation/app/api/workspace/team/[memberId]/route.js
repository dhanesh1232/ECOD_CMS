import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { Workspace } from "@/models/user/workspace";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const { memberId } = params;
    const session = await validateSession(request);

    // Find workspace where the current user is a member
    const workspace = await Workspace.findOne({
      "members.user": session.user.id,
      "members.status": "active",
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    // Find the target member in the workspace
    const member = workspace.members.find(
      (m) => m.user._id.toString() === memberId && m.status !== "invited"
    );

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    // Check if current user has permission to view this member
    const currentUserMember = workspace.members.find(
      (m) => m.user._id.toString() === session.user.id
    );

    if (
      !currentUserMember ||
      (currentUserMember.role !== "owner" &&
        currentUserMember.role !== "admin" &&
        currentUserMember.user._id.toString() !== memberId)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Prepare response data
    const memberData = {
      id: member.user._id,
      name: member.user.name,
      email: member.user.email,
      image: member.user.image,
      phone: member.user.phone,
      role: member.role,
      status: member.status,
      joinedAt: member.joinedAt,
      lastActive: member.lastActive,
      permissions: member.permissions || [],
    };

    return NextResponse.json(
      {
        message: "Member details fetched successfully",
        data: memberData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching member details:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();
  try {
    const { memberId } = params;
    const session = await validateSession(request);
    const { role, permissions } = await request.json();

    // Find workspace where the current user is an admin/owner
    const workspace = await Workspace.findOne({
      "members.user": session.user.id,
      "members.status": "active",
      "members.role": { $in: ["owner", "admin"] },
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found or unauthorized" },
        { status: 404 }
      );
    }

    // Find the target member in the workspace
    const memberIndex = workspace.members.findIndex(
      (m) => m.user._id.toString() === memberId
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    // Update role if provided
    if (role) {
      // Prevent changing owner role if last owner
      if (workspace.members[memberIndex].role === "owner") {
        const ownerCount = workspace.members.filter(
          (m) => m.role === "owner"
        ).length;
        if (ownerCount <= 1) {
          return NextResponse.json(
            { message: "Cannot change role of last owner" },
            { status: 400 }
          );
        }
      }
      workspace.members[memberIndex].role = role;
    }

    // Update permissions if provided
    if (permissions) {
      workspace.members[memberIndex].permissions = permissions;
    }

    await workspace.save();

    return NextResponse.json(
      {
        message: "Member updated successfully",
        data: {
          id: workspace.members[memberIndex].user._id,
          role: workspace.members[memberIndex].role,
          permissions: workspace.members[memberIndex].permissions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { memberId } = params;
    const session = await validateSession(request);

    // Find workspace where the current user is an admin/owner
    const workspace = await Workspace.findOne({
      "members.user": session.user.id,
      "members.status": "active",
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found or unauthorized" },
        { status: 404 }
      );
    }

    // Find the target member in the workspace
    const currentUserMember = workspace.members.find(
      (m) => m.user._id.toString() === memberId
    );

    if (!["owner", "admin"].includes(currentUserMember.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Prevent removing last owner
    const memberToRemove = workspace.members.id(memberId);
    if (memberToRemove.role === "owner") {
      const ownerCount = workspace.members.filter(
        (m) => m.role === "owner"
      ).length;
      if (ownerCount <= 1) {
        return NextResponse.json(
          { message: "Cannot remove last owner" },
          { status: 400 }
        );
      }
    }
    // Remove member from workspace
    workspace.members.pull(memberId);
    await workspace.save();

    return NextResponse.json(
      {
        message: "Member removed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
