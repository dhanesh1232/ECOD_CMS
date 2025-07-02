import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { PaymentMethod } from "@/models/payment/paymentMethod";
import { Workspace } from "@/models/user/workspace";

export async function GET(req, { params }) {
  await dbConnect;
  try {
    const { workspaceId: slug } = await params;
    const workspace = await Workspace.findOne({ slug }).populate(
      "subscription"
    );
    const method = await PaymentMethod.findOne({
      workspace: workspace._id,
      subscription: workspace.subscription._id,
    });
    return SuccessHandle.DefaultSuccess({ method });
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}

export async function POST(req, { params }) {
  await dbConnect;
  try {
    const { workspaceId: slug } = await params;
    return SuccessHandle.DefaultSuccess();
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
