import { User } from "@/models/user/user";
import { Workspace } from "@/models/user/workspace";
import { validateSession } from "@/lib/auth";
import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";

export async function GET(req) {
  await dbConnect();
  try {
    // Get the user session
    const session = await validateSession(req);
    // Find the user and populate their workspaces
    const user = await User.findById(session.user.id).select("+phone").lean();
    if (!user) {
      return ErrorHandles.UserNotFound();
    }

    // Get detailed workspace information for each workspace the user has access to
    const workspaceIds = user.workspaces.map((ws) => ws.workspace);

    const workspaces = await Workspace.find({
      _id: { $in: workspaceIds },
      "members.user": user._id,
      "members.status": "active",
    })
      .select("name slug description logo subscription settings members")
      .lean();

    // Map the workspaces with additional information
    const enrichedWorkspaces = workspaces.map((workspace) => {
      // Find the user's role in this workspace
      const memberInfo = workspace.members.find(
        (member) => member.user.toString() === user._id.toString()
      );

      // Find the workspace in user's workspaces array for additional info
      const userWorkspaceInfo = user.workspaces.find(
        (ws) => ws.workspace.toString() === workspace._id.toString()
      );

      return {
        id: workspace._id,
        name: workspace.name,
        slug: workspace.slug,
        description: workspace.description,
        logo: workspace.logo,
        role: memberInfo?.role || userWorkspaceInfo?.role || "member",
        status: memberInfo?.status || userWorkspaceInfo?.status || "active",
        joinedAt: memberInfo?.joinedAt || userWorkspaceInfo?.joinedAt,
        lastActive: userWorkspaceInfo?.lastActive,
        isCurrent:
          user.currentWorkspace?.toString() === workspace._id.toString(),
        subscription: {
          plan: workspace.subscription.plan,
          status: workspace.subscription.status,
          billingCycle: workspace.subscription.billingCycle,
          isActive:
            ["active", "trialing"].includes(workspace.subscription.status) &&
            (!workspace.subscription.currentPeriodEnd ||
              new Date(workspace.subscription.currentPeriodEnd) > new Date()),
          trialEnd: workspace.subscription.trialEnd,
          currentPeriodEnd: workspace.subscription.currentPeriodEnd,
          limits: workspace.limits,
          usage: workspace.usage,
        },
        settings: {
          chat: workspace.settings.chat,
          branding: workspace.branding,
        },
      };
    });
    const currentWorkspaceDetails = enrichedWorkspaces.find(
      (ws) => ws.isCurrent === true
    );
    // Prepare the response
    const response = {
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          phone: user.phone,
          isVerified: user.isVerified,
          notificationPreferences: user.notificationPreferences,
          metadata: user.metadata,
        },
        workspaces: enrichedWorkspaces,
        currentWorkspace: user.currentWorkspace,
        currentWorkspaceDetails,
      },
    };

    return SuccessHandle.UserProfile(response);
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}

export async function PATCH(req) {
  await dbConnect();
  try {
    const session = await validateSession(req);
    if (!session?.user?.id) {
      return ErrorHandles.Unauthorized();
    }

    const { channel, type, value } = await req.json();

    // Validate input
    if (!["email", "push", "inApp"].includes(channel)) {
      return ErrorHandles.BadRequest("Invalid notification channel");
    }

    if (typeof value !== "boolean") {
      return ErrorHandles.BadRequest("Value must be a boolean");
    }

    // Get current user
    const currentUser = await User.findById(session.user.id)
      .select("notificationPreferences")
      .lean();

    if (!currentUser) {
      return ErrorHandles.UserNotFound();
    }

    // Prepare update data
    const updateData = {
      notificationPreferences: currentUser.notificationPreferences,
    };

    if (type === "all") {
      // Toggle all preferences in the channel
      updateData.notificationPreferences[channel] = Object.fromEntries(
        Object.entries(currentUser.notificationPreferences[channel] || {}).map(
          ([key]) => [key, value]
        )
      );
    } else {
      // Update single preference
      updateData.notificationPreferences[channel] = {
        ...currentUser.notificationPreferences[channel],
        [type]: value,
      };
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true, select: "notificationPreferences" }
    );

    return SuccessHandle.UserNotificationHandle({
      success: true,
      data: updatedUser.notificationPreferences,
    });
  } catch (err) {
    console.error("Error updating notification preferences:", err);
    return ErrorHandles.InternalServer();
  }
}
