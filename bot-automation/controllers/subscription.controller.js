import { Subscription } from "@/models/payment/subscription";
import { Plan } from "@/models/user/schema";

export const __Subscription__Handles__ = {
  async __createSubscriptionInitial__(
    workspaceId,
    planId,
    cycle = "lifetime",
    ownerId
  ) {
    const plan = await Plan.findOne({ id: planId });
    const cycleLimits = plan.limits?.[cycle] || plan.limits?.yearly;
    if (!cycleLimits) {
      throw new Error(
        `Limits not found for cycle '${cycle}' in plan '${planId}'`
      );
    }
    const subscriptionData = {
      workspace: workspaceId,
      user: ownerId,
      plan: planId,
      status: "active",
      billingCycle: cycle,
      currentPeriod: {
        start: new Date(),
        end: planId === "free" && null,
      },
      limits: cycleLimits,
      features: Subscription.prototype.transformPlanFeatures(plan.features),
      lifeCycle: {
        createdAt: new Date(),
        nextBilling: {
          date: planId === "free" && null,
          estimatedAmount: planId !== "free" && plan.prices[cycle],
        },
      },
      metadata: {
        createdBy: {
          workspace: workspaceId,
          user: ownerId,
        },
      },
    };
    console.log(subscriptionData);
    const sub = await Subscription.create(subscriptionData);
    console.log(sub);
    return sub;
  },
};
