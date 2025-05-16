// app/api/workspace/api-keys/[id]/route.js
import { NextResponse } from "next/server";
import { ApiKey } from "@/models/user/ApiKey";
import { User } from "@/models/user/user";
import { validateSession } from "@/lib/auth";

export async function DELETE(request, { params }) {
  const session = await validateSession(request);

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has permission to delete API keys (owner or admin)
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );

    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to delete API keys" },
        { status: 403 }
      );
    }

    const apiKey = await ApiKey.findOneAndUpdate(
      {
        _id: params.id,
        workspace: user.currentWorkspace,
      },
      { isActive: false, "metadata.deletedAt": new Date() },
      { new: true }
    );

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting API key:", error);
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const session = await validateSession(request);
  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has permission to rotate API keys (owner or admin)
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );

    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to rotate API keys" },
        { status: 403 }
      );
    }

    const apiKey = await ApiKey.findOne({
      _id: params.id,
      workspace: user.currentWorkspace,
      isActive: true,
    });

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    await apiKey.rotate();

    // Return the new key only once (during rotation)
    const response = apiKey.toObject();
    response.key = apiKey.key;

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error rotating API key:", error);
    return NextResponse.json(
      { error: "Failed to rotate API key" },
      { status: 500 }
    );
  }
}
