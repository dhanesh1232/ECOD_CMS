import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { razorpay } from "@/lib/payment_gt";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { workspaceId, paymentId } = params;

    if (!paymentId || !workspaceId) {
      return ErrorHandles.BadRequest("Missing paymentId or workspaceId");
    }
    const workspace = await Workspace.findOne({ slug: workspaceId });

    // Check our database first
    const subscription = await Subscription.findOne({
      "latestInvoice.id": paymentId,
      workspace: workspace._id,
    });

    if (!subscription) {
      return ErrorHandles.NotFound("Subscription record not found");
    }

    // If we already have a confirmed status, return it
    if (subscription.status === "active") {
      return SuccessHandle.SubscriptionSuccess({
        status: "active",
        subscription,
        message: "Subscription is active",
      });
    }

    // If not confirmed, check with Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return ErrorHandles.NotFound("Payment not found");
    }

    if (payment.status === "captured") {
      // Payment was successful, update our records
      const updatedSub = await Subscription.findOneAndUpdate(
        {
          "latestInvoice.id": paymentId,
          workspace: workspace._id,
        },
        {
          status: "active",
          "latestInvoice.status": "paid",
        },
        { new: true }
      );

      return SuccessHandle.SubscriptionSuccess({
        status: "active",
        subscription: updatedSub,
        message: "Payment confirmed",
      });
    } else if (payment.status === "failed") {
      return SuccessHandle.SubscriptionSuccess({
        status: "failed",
        subscription,
        message: "Payment failed",
      });
    } else {
      return SuccessHandle.SubscriptionSuccess({
        status: "pending",
        subscription,
        message: "Payment still processing",
      });
    }
  } catch (err) {
    console.error("Payment confirmation error:", err);
    return ErrorHandles.InternalServer(
      err.message || "Failed to confirm payment status"
    );
  }
}
