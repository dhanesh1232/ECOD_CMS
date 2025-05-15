// app/api/profile/subscription/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import { User } from "@/models/user/user";
import { validateSession } from "@/lib/auth";
import { Subscription } from "@/models/payment/subscription";

export async function GET(req) {
  try {
    await dbConnect();
    const session = await validateSession(req);

    // Get user with populated data
    const user = await User.findOne({ email: session.user.email })
      .select("+currentWorkspace")
      .populate({
        path: "workspaces.workspace",
        match: { status: "active" },
        select: "name slug subscription",
      })
      .lean();
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get current workspace details
    const currentWorkspace = user.workspaces.find(
      (ws) =>
        ws.workspace &&
        ws.workspace._id.toString() === user.currentWorkspace?.toString()
    )?.workspace;

    if (!currentWorkspace) {
      return NextResponse.json(
        { message: "No active workspace found" },
        { status: 404 }
      );
    }

    // Get subscription details
    const subscription = await Subscription.findOne({
      workspace: currentWorkspace._id,
      status: {
        $in: ["active", "trialing", "past_due", "unpaid"],
      },
    }).lean();

    if (!subscription) {
      return NextResponse.json(
        { message: "No active subscription found" },
        { status: 404 }
      );
    }

    // Calculate usage percentages
    const usagePercentage = {
      chatbots: Math.min(
        Math.round(
          (subscription.usage.chatbots / subscription.limits.chatbots) * 100
        ),
        100
      ),
      messages: Math.min(
        Math.round(
          (subscription.usage.messages / subscription.limits.messages) * 100
        ),
        100
      ),
      members: Math.min(
        Math.round(
          (subscription.usage.members / subscription.limits.members) * 100
        ),
        100
      ),
      storage: Math.min(
        Math.round(
          (subscription.usage.storage / subscription.limits.storage) * 100
        ),
        100
      ),
    };

    // Prepare response data
    const responseData = {
      workspace: {
        id: currentWorkspace._id,
        name: currentWorkspace.name,
        slug: currentWorkspace.slug,
        plan: currentWorkspace.subscription.plan,
        status: currentWorkspace.subscription.status,
        billingCycle: currentWorkspace.subscription.billingCycle,
        currentPeriodStart: currentWorkspace.subscription.currentPeriodStart,
        currentPeriodEnd: currentWorkspace.subscription.currentPeriodEnd,
        trialEnd: currentWorkspace.subscription.trialEnd,
      },
      subscription: {
        id: subscription._id,
        plan: subscription.plan,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        isActive:
          ["active", "trialing"].includes(subscription.status) &&
          (!subscription.currentPeriodEnd ||
            subscription.currentPeriodEnd > new Date()),
        daysUntilRenewal: subscription.currentPeriodEnd
          ? Math.ceil(
              (subscription.currentPeriodEnd - new Date()) /
                (1000 * 60 * 60 * 24)
            )
          : null,
        usage: {
          ...subscription.usage,
          percentage: usagePercentage,
        },
        limits: subscription.limits,
        features: subscription.features,
      },
      user: {
        role:
          user.workspaces.find(
            (ws) =>
              ws.workspace &&
              ws.workspace._id.toString() === currentWorkspace._id.toString()
          )?.role || "member",
      },
    };

    return NextResponse.json(
      {
        message: "Success",
        data: responseData,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
