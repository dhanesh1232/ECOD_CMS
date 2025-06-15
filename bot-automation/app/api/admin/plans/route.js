import dbConnect from "@/config/dbconnect";
import { Plan } from "@/models/user/schema";
import { ErrorHandles } from "@/lib/server/errors";
import { PLANS } from "@/utils/config.plans";
import { SuccessHandle } from "@/lib/server/success";

export async function GET() {
  await dbConnect();

  try {
    const plans = PLANS;
    const updatedPlans = [];
    for (const key in plans) {
      const updated = await Plan.findOneAndUpdate(
        { id: plans[key].id },
        plans[key],
        {
          upsert: true,
          new: true,
        }
      );
      updatedPlans.push(updated);
    }
    return SuccessHandle.PlansSuccessFetch({
      plans: updatedPlans,
    });
  } catch (err) {
    console.error("Failed to sync plans:", err);
    return ErrorHandles.InternalServer();
  }
}
