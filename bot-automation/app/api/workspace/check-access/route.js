// api/workspace/check-access/route.js

import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { User } from "@/models/user/user";
import { Workspace } from "@/models/user/workspace";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const headers = { "Cache-Control": "no-store, max-age=0" };
  try {
    // Validate user session
    const session = await validateSession(req);
    console.log(session);
    // Get workspace slug from query params
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("userId");
    console.log(slug, id);
    if (!slug) {
      return NextResponse.json(
        {
          message: "Workspace slug is required",
          redirectTo: "/404", // Indicate client should redirect
        },
        { status: 400 }
      );
    }

    // Find the workspace by slug
    const workspace = await Workspace.findOne({ slug })
      .select("name slug members subscription settings metadata")
      .populate("subscription")
      .lean();

    if (!workspace) {
      return NextResponse.json(
        {
          message: "Workspace not found",
          redirectTo: "/404", // Indicate client should redirect
        },
        { status: 404 }
      );
    }

    // Check if workspace is active (not deleted)
    if (workspace.metadata?.deletedAt) {
      return NextResponse.json(
        {
          message: "Workspace has been deleted",
          redirectTo: "/404", // Indicate client should redirect
        },
        { status: 404 }
      );
    }

    // Get user with workspace access information
    const user = await User.findById(id)
      .select("workspaces currentWorkspace")
      .lean();

    // Check if user has access to the workspace
    const userWorkspace = user.workspaces.find(
      (ws) =>
        ws.workspace.toString() === workspace._id.toString() &&
        ws.status === "active"
    );

    if (!userWorkspace) {
      return NextResponse.json(
        {
          message: "You don't have access to this workspace",
          redirectTo: "/forbidden", // Optional: redirect to forbidden page
        },
        { status: 403 }
      );
    }

    // Check if workspace subscription is active
    if (!["active", "trialing"].includes(workspace.subscription?.status)) {
      return NextResponse.json(
        {
          message: "Workspace subscription is not active",
          subscriptionStatus: workspace.subscription?.status,
          redirectTo: "/subscription-expired", // Optional: custom page
        },
        { status: 403 }
      );
    }

    // Return access information
    return NextResponse.json(
      {
        hasAccess: true,
        role: userWorkspace.role,
        workspace: {
          id: workspace._id,
          name: workspace.name,
          slug: workspace.slug,
          subscriptionStatus: workspace.subscription.status,
          settings: workspace.settings,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Workspace access check error:", err);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
        redirectTo: "/500", // Optional: server error page
      },
      { status: 500 }
    );
  }
}
