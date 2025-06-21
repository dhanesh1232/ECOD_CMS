import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { SubscriptionHistory } from "@/models/payment/subscriptionHistory";
import { Workspace } from "@/models/user/workspace";

export async function PUT(req, { params }) {
  try {
    const { workspaceId: slug } = await params; // ✅ Fine if you know params is an object with workspaceId
    const body = await req.json();
    const { id } = body;

    const workspace = await Workspace.findOne({ slug });
    if (!workspace) {
      return ErrorHandles.NotFound("Workspace not found");
    }

    await SubscriptionHistory.findOneAndUpdate(
      {
        workspace: workspace._id,
        gatewaySubscriptionId: id,
        status: "pending",
      },
      {
        notes: "Failed",
        status: "unpaid",
        action: "payment_failed",
      }
    );

    return SuccessHandle.DefaultSuccess({ success: true }, "payment failed");
  } catch (err) {
    return ErrorHandles.InternalServer(err.message);
  }
}
