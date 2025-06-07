import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { PaymentHistory } from "@/models/payment/payment_history";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const { workspaceId: slug } = await params;
    await validateSession(request);
    const workspace = await Workspace.findOne({ slug });
    const sub = await Subscription.findOne({ workspace: workspace._id });
    const history = await PaymentHistory.find({
      workspace: workspace._id,
      subscription: sub._id,
    });
    return SuccessHandle.SubscriptionHistory(history);
  } catch (err) {
    return ErrorHandles.InternalServer(
      "Internal server error unable to fetch history"
    );
  }
}
