// app/api/workspaces/[slug]/subscription/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";
import { User } from "@/models/user/user";
import { ErrorHandles } from "@/lib/server/errors";
import { PLANS } from "@/config/pricing.config";
import { cache } from "react";

// Cache workspace lookup for 60 seconds
const getCachedWorkspace = cache(async (slug) => {
  return Workspace.findOne({ slug })
    .select("name slug subscription members")
    .populate("subscription")
    .lean();
});

export async function GET(req, { params }) {
  try {
    await dbConnect();

    // Validate parameters
    const { workspaceId: slug } = await params;
    if (!slug) {
      return ErrorHandles.BadRequest("Workspace slug is required");
    }

    // Validate session and get user
    const session = await validateSession(req);
    if (!session?.user?.id) {
      return ErrorHandles.UnauthorizedAccess("Invalid session");
    }

    // Get user with minimal fields
    const user = await User.findById(session.user.id)
      .select("email phone name")
      .lean();
    if (!user) {
      return ErrorHandles.UserNotFound("User not found");
    }

    // Find workspace with basic subscription info (cached)
    const workspace = await getCachedWorkspace(slug);
    if (!workspace) {
      return ErrorHandles.UserNotFound("Workspace not found");
    }

    // Check user access to workspace
    const hasAccess = workspace.members.some(
      (member) =>
        member.user.toString() === session.user.id.toString() &&
        member.status === "active"
    );

    if (!hasAccess) {
      return ErrorHandles.Forbidden("No access to this workspace");
    }

    // Get user role in workspace
    const userRole = workspace.members.find(
      (member) => member.user.toString() === session.user.id.toString()
    )?.role;

    // Get full subscription details if exists
    let subscription = null;
    let isFreePlan = true;

    if (workspace.subscription) {
      subscription = await Subscription.findOne({
        _id: workspace.subscription._id,
        status: {
          $in: [
            "pending",
            "active",
            "trialing",
            "past_due",
            "paused",
            "canceled",
            "unpaid",
          ],
        },
      })
        .select("+usage +limits +features +gateway.customerId")
        .lean();

      if (subscription) {
        isFreePlan = false;

        // Validate subscription data
        if (!subscription.currentPeriod?.start) {
          subscription.currentPeriod = {
            start: new Date(),
            end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          };
        }
      }
    }

    // Prepare response data
    const responseData = await prepareResponseData(
      workspace,
      subscription,
      user,
      userRole,
      isFreePlan
    );

    return NextResponse.json(
      {
        message: "Subscription details retrieved successfully",
        data: responseData,
      },
      {
        status: 200,
        headers: getCacheHeaders(),
      }
    );
  } catch (err) {
    console.error("Subscription API error:", err);
    return ErrorHandles.ServerError(err);
  }
}

// Helper functions

async function prepareResponseData(
  workspace,
  subscription,
  user,
  userRole,
  isFreePlan
) {
  // Calculate usage percentages
  const usagePercentage = subscription
    ? calculateUsagePercentages(subscription.usage, subscription.limits)
    : {
        chatbots: 0,
        messages: 0,
        members: 0,
        storage: 0,
        apiCalls: 0,
      };

  // Calculate days until renewal
  const currentDate = new Date();
  const daysUntilRenewal = subscription?.currentPeriod?.end
    ? Math.ceil(
        (new Date(subscription.currentPeriod.end) - currentDate) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Base workspace data
  const workspaceData = {
    id: workspace._id,
    name: workspace.name,
    slug: workspace.slug,
    plan: subscription?.plan || "free",
    status: subscription?.status || "active",
    billingCycle: subscription?.billingCycle || "lifetime",
    currentPeriod: subscription?.currentPeriod || {
      start: currentDate,
      end: null,
    },
    trialEnd: subscription?.trial?.end,
    isTrialActive:
      subscription?.status === "trialing" &&
      subscription.trial?.end &&
      new Date(subscription.trial.end) > currentDate,
  };

  // Subscription details (if exists)
  const subscriptionData = subscription
    ? {
        workspace: workspace._id,
        id: subscription._id,
        plan: subscription.plan,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        currentPeriod: subscription.currentPeriod,
        isActive:
          ["active", "trialing"].includes(subscription.status) &&
          (!subscription.currentPeriod?.end ||
            new Date(subscription.currentPeriod.end) > currentDate),
        daysUntilRenewal,
        usage: {
          ...subscription.usage,
          percentage: usagePercentage,
        },
        limits: subscription.limits,
        features: subscription.features,
        nextBillingDate: subscription.currentPeriod?.end,
        paymentMethod: subscription.paymentMethod,
        invoiceSettings: subscription.invoiceSettings,
        gatewayCustomerId: subscription.gateway?.customerId,
        isNearLimit: isNearLimit(usagePercentage),
      }
    : null;

  // User data with role
  const userData = {
    email: user.email,
    phone: user.phone,
    name: user.name,
    role: userRole,
  };

  // Plan comparison data for upgrades
  const availablePlans = Object.entries(PLANS).map(([planId, plan]) => ({
    id: planId,
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.prices.monthly,
    yearlyPrice: plan.prices.yearly,
    features: plan.features,
    limits: plan.limits,
    recommended: plan.recommended,
    highlight: plan.highlight,
    isCurrent: planId === (subscription?.plan || "free"),
  }));

  return {
    workspace: workspaceData,
    subscription: subscriptionData,
    user: userData,
    isFreePlan,
    availablePlans,
    canUpgrade: userRole === "owner" || userRole === "admin",
  };
}

function calculateUsagePercentages(usage = {}, limits = {}) {
  const calculate = (used, limit) => {
    if (!limit || limit === 0 || limit === "Infinity") return 0;
    const percentage = Math.min(Math.round((used / limit) * 100), 100);
    return isNaN(percentage) ? 0 : percentage;
  };

  return {
    chatbots: calculate(usage.chatbots, limits.chatbots),
    messages: calculate(usage.messages, limits.messages),
    members: calculate(usage.members, limits.members),
    storage: calculate(usage.storage, limits.storage),
    apiCalls: calculate(usage.apiCalls, limits.apiCalls),
  };
}

function isNearLimit(usagePercentages, threshold = 0.8) {
  return {
    chatbots: usagePercentages.chatbots >= threshold * 100,
    messages: usagePercentages.messages >= threshold * 100,
    members: usagePercentages.members >= threshold * 100,
    storage: usagePercentages.storage >= threshold * 100,
    apiCalls: usagePercentages.apiCalls >= threshold * 100,
  };
}

function getCacheHeaders() {
  return {
    "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
    "CDN-Cache-Control": "public, s-maxage=120",
    "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
  };
}
