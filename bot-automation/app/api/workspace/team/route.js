import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { User } from "@/models/user/user";
import { Workspace } from "@/models/user/workspace";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const session = await validateSession(request);
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const workspace = await Workspace.findById(user.currentWorkspace)
      .populate({
        path: "members.user",
        select: "name email image phone",
      })
      .select("members");

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }

    // Transform the members data to a cleaner format
    const teamMembers = workspace.members.map((member) => ({
      id: member.user._id,
      name: member.user.name,
      email: member.user.email,
      image: member.user.image,
      phone: member.user.phone,
      role: member.role,
      status: member.status,
      joinedAt: member.joinedAt,
      lastActive: member.lastActive,
      permissions: member.permissions,
    }));

    return NextResponse.json(
      {
        message: "Team fetched successfully",
        data: teamMembers,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
