// app/api/workspace/api-keys/route.js
import { NextResponse } from "next/server";
import { ApiKey } from "@/models/user/ApiKey";
import { Workspace } from "@/models/user/workspace";
import { User } from "@/models/user/user";
import { validateSession } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  const session = await validateSession();

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has permission to view API keys (owner or admin)
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );

    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to view API keys" },
        { status: 403 }
      );
    }

    const apiKeys = await ApiKey.find({
      workspace: user.currentWorkspace,
      isActive: true,
    }).select("-key");

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await validateSession(request);

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has permission to create API keys (owner or admin)
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );

    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to create API keys" },
        { status: 403 }
      );
    }

    const { name, scopes } = await request.json();

    if (!name || !scopes || !Array.isArray(scopes)) {
      return NextResponse.json(
        { error: "Name and scopes are required" },
        { status: 400 }
      );
    }

    // Generate the API key and prefix
    const key = crypto.randomBytes(32).toString("hex");
    const prefix = key.substring(0, 8);

    // Get workspace to determine rotation settings
    const workspace = await Workspace.findById(user.currentWorkspace).select(
      "security"
    );
    let expiresAt = null;

    if (workspace.security?.apiKeyRotationDays) {
      expiresAt = new Date();
      expiresAt.setDate(
        expiresAt.getDate() + workspace.security.apiKeyRotationDays
      );
    }

    const apiKey = await ApiKey.create({
      workspace: user.currentWorkspace,
      name,
      prefix,
      key,
      scopes,
      expiresAt,
      createdBy: user._id,
    });

    // Return the full key only once (during creation)
    const response = apiKey.toObject();
    response.key = apiKey.key;

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating API key:", error);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}
