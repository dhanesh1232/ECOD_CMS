// app/api/workspace/settings/route.js
import { NextResponse } from "next/server";
import { Workspace } from "@/models/user/workspace";
import { User } from "@/models/user/user";
import { validateSession } from "@/lib/auth";

export async function GET() {
  const session = await validateSession();

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const workspace = await Workspace.findById(user.currentWorkspace)
      .select(
        "name description logo industry timezone contactInfo branding security settings"
      )
      .lean();

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workspace);
  } catch (error) {
    console.error("Error fetching workspace settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspace settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const session = validateSession();
  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check if user has permission to update settings (owner or admin)
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );
    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to update these settings" },
        { status: 403 }
      );
    }
    const updateData = await request.json();
    // Validate update data
    const allowedUpdates = {
      name: { type: "string", maxLength: 100 },
      description: { type: "string", maxLength: 500 },
      logo: { type: "string" },
      industry: { type: "string" },
      timezone: { type: "string" },
      contactInfo: {
        type: "object",
        properties: {
          supportEmail: { type: "string" },
          websiteURL: { type: "string" },
          phone: { type: "string" },
          address: {
            type: "object",
            properties: {
              street: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              postalCode: { type: "string" },
              country: { type: "string" },
            },
          },
        },
      },
      branding: {
        type: "object",
        properties: {
          primaryColor: { type: "string" },
          secondaryColor: { type: "string" },
          logoUrl: { type: "string" },
          faviconUrl: { type: "string" },
          customDomain: { type: "string" },
        },
      },
      security: {
        type: "object",
        properties: {
          widgetDomainWhitelist: { type: "array", items: { type: "string" } },
          apiKeyRotationDays: { type: "number", min: 1, max: 365 },
        },
      },
    };
    // Filter out any fields not in allowedUpdates
    const filteredUpdate = {};
    Object.keys(updateData).forEach((key) => {
      if (allowedUpdates[key]) {
        if (
          typeof updateData[key] === "object" &&
          !Array.isArray(updateData[key])
        ) {
          filteredUpdate[key] = {};
          Object.keys(updateData[key]).forEach((subKey) => {
            if (allowedUpdates[key].properties?.[subKey]) {
              filteredUpdate[key][subKey] = updateData[key][subKey];
            }
          });
        } else {
          filteredUpdate[key] = updateData[key];
        }
      }
    });

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      user.currentWorkspace,
      filteredUpdate,
      { new: true, runValidators: true }
    ).select(
      "name description logo industry timezone contactInfo branding security settings"
    );

    return NextResponse.json(updatedWorkspace);
  } catch (err) {
    console.error("Error updating workspace settings:", error);
    return NextResponse.json(
      { error: "Failed to update workspace settings" },
      { status: 500 }
    );
  }
}
