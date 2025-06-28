import { BillingDetails } from "@/models/payment/billingDetails";
import { SubscriptionHistory } from "@/models/payment/subscriptionHistory";

export async function getInvoiceById(id) {
  try {
    console.log("Getting invoice for ID:", id);

    const history = await SubscriptionHistory.findById(id)
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "workspace",
        populate: {
          path: "billingDetails",
        },
      })
      .populate({
        path: "subscription",
      })
      .populate({
        path: "plan",
        select: "name",
      });

    const details = await BillingDetails.findOne({
      workspace: history.workspace,
    });
    if (!history) {
      console.error("Invoice not found for ID:", id);
      throw new Error("Invoice not found");
    }

    // Check deeply nested fields before using
    if (!history.workspace?.billingDetails && !details) {
      console.error("Missing billingDetails for workspace:", history.workspace);
      throw new Error("Workspace billing details missing");
    }

    if (
      !history.subscription?.currentPeriod?.start ||
      !history.subscription?.currentPeriod?.end
    ) {
      console.error(
        "Missing subscription currentPeriod:",
        history.subscription
      );
      throw new Error("Subscription period missing");
    }

    const now = new Date();
    return {
      id: `INV-ECOD-${id}`,
      user: {
        name: history.user?.name || "Unknown",
        email: details.email,
        company: details.companyName,
        phone: details.phone,
        gst: details?.gstin || "NA",
      },
      plan: history.subscription.plan,
      cycle: history.subscription.billingCycle,
      amount: history.amount,
      status: history.status,
      invoiceDate: now,
      billingPeriod: `${new Date(
        history.subscription.currentPeriod.start
      ).toLocaleDateString()} to ${new Date(
        history.subscription.currentPeriod.end
      ).toLocaleDateString()}`,
      paymentMethod: history.paymentMethod?.type || "Razorpay - UPI",
    };
  } catch (err) {
    console.error("getInvoiceById error:", err);
    throw err;
  }
}
