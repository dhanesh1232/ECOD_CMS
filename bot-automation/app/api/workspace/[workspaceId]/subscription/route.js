// app/api/workspaces/[slug]/subscription/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";
import { User } from "@/models/user/user";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { workspaceId: slug } = await params;
    // Validate session and get user
    const session = await validateSession(req);
    const user = await User.findById(session.user.id);
    // Find workspace by slug with basic subscription info
    const workspace = await Workspace.findOne({ slug })
      .select("name slug subscription members")
      .lean();

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }
    // Check if user has access to this workspace
    const userWorkspaceAccess = workspace.members.some(
      (member) =>
        member.user.toString() === session.user.id.toString() &&
        member.status === "active"
    );

    if (!userWorkspaceAccess) {
      return NextResponse.json(
        { message: "You don't have access to this workspace" },
        { status: 403 }
      );
    }

    // Get full subscription details
    const subscription = await Subscription.findOne({
      workspace: workspace._id,
      status: {
        $in: ["active", "trialing", "past_due", "unpaid"],
      },
    })
      .select("+usage +limits +features")
      .lean();

    if (!subscription) {
      return NextResponse.json(
        {
          message: "No active subscription found",
          data: {
            workspace: {
              id: workspace._id,
              name: workspace.name,
              slug: workspace.slug,
              plan: "free", // Default to free if no subscription
              status: "active",
              billingCycle: "lifetime",
            },
            subscription: null,
          },
        },
        { status: 404 }
      );
    }

    // Calculate usage percentages with protection against division by zero
    const calculatePercentage = (usage, limit) => {
      if (!limit || limit === 0) return 0;
      return Math.min(Math.round((usage / limit) * 100), 100);
    };

    const usagePercentage = {
      chatbots: calculatePercentage(
        subscription.usage.chatbots,
        subscription.limits.chatbots
      ),
      messages: calculatePercentage(
        subscription.usage.messages,
        subscription.limits.messages
      ),
      members: calculatePercentage(
        subscription.usage.members,
        subscription.limits.members
      ),
      storage: calculatePercentage(
        subscription.usage.storage,
        subscription.limits.storage
      ),
    };

    // Calculate days until renewal
    const currentDate = new Date();
    const daysUntilRenewal = subscription.currentPeriodEnd
      ? Math.ceil(
          (subscription.currentPeriodEnd - currentDate) / (1000 * 60 * 60 * 24)
        )
      : null;

    // Prepare comprehensive response data
    const responseData = {
      workspace: {
        id: workspace._id,
        name: workspace.name,
        slug: workspace.slug,
        plan: subscription.plan,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        trialEnd: subscription.trialEnd,
        isTrialActive:
          subscription.status === "trialing" &&
          subscription.trialEnd &&
          subscription.trialEnd > currentDate,
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
            subscription.currentPeriodEnd > currentDate),
        daysUntilRenewal,
        usage: {
          ...subscription.usage,
          percentage: usagePercentage,
        },
        limits: subscription.limits,
        features: subscription.features,
        nextBillingDate: subscription.currentPeriodEnd,
        paymentMethod: subscription.paymentMethod,
        invoiceSettings: subscription.invoiceSettings,
      },
      user: {
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: workspace.members.find(
          (member) => member.user.toString() === session.user.id.toString()
        )?.role,
      },
    };

    return NextResponse.json(
      {
        message: "Subscription details retrieved successfully",
        data: responseData,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
          "CDN-Cache-Control": "public, s-maxage=120",
          "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
        },
      }
    );
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json(
      {
        message: "Internal server error",
        details: process.env.NODE_ENV === "development" ? err.message : null,
      },
      { status: 500 }
    );
  }
}
