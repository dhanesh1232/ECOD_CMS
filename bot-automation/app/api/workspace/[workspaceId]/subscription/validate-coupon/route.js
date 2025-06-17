import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { Subscription } from "@/models/payment/subscription";
import { Plan } from "@/models/user/schema";
import { Workspace } from "@/models/user/workspace";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { workspaceId: slug } = await params;

    const { searchParams } = new URL(req.url);
    const couponCode = searchParams.get("coupon");
    const planId = searchParams.get("plan");

    if (!couponCode || !planId) {
      return ErrorHandles.BadRequest("Missing coupon or plan");
    }

    console.log("Coupon and Plan ID:", couponCode, planId);

    const plan = await Plan.findById(planId);
    if (!plan) {
      return ErrorHandles.UserNotFound("Plan not found");
    }
    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      status: "active",
    });
    if (!coupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }

    const workspace = await Workspace.findOne({ slug });
    if (!workspace) {
      return ErrorHandles.UserNotFound("Workspace not found");
    }

    const subscription = await Subscription.findOne({
      workspace: workspace._id,
    });
    if (!subscription) {
      return ErrorHandles.UserNotFound("Subscription not found");
    }

    const isMatch =
      coupon.applicablePlans.includes(plan.name.toLowerCase()) ||
      coupon.applicablePlans.includes("all");

    console.log("Is Applicable:", isMatch);
    if (!isMatch) {
      return ErrorHandles.BadRequest("Coupon is not applicable to this plan");
    }
    const data = {
      code: coupon.code,
      value: coupon.discountValue,
      type: coupon.discountType,
      title: coupon.title,
    };
    return SuccessHandle.DefaultSuccess(
      { success: true, data },
      "Coupon Validated Successfully"
    );
  } catch (err) {
    console.error("Error validating coupon:", err);
    return ErrorHandles.InternalServer("Something went wrong");
  }
}
