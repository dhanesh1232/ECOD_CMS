import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";

export async function GET() {
  await dbConnect();
  try {
    const subs = await Subscription.find().lean();
    if (!subs) {
      return ErrorHandles.UserNotFound("Subscription not found");
    }

    return SuccessHandle.SubscriptionsDataSuccess(
      { subscriptions: subs },
      "Successfully fetched data"
    );
  } catch (err) {
    return ErrorHandles.InternalServer(err.message || "Internal Server Error");
  }
}
