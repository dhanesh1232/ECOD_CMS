import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Plan } from "@/models/user/schema";

export async function GET(req, { params }) {
  dbConnect();
  try {
    const plans = await Plan.find();
    if (!plans) return ErrorHandles.UserNotFound("Plans not found");
    return SuccessHandle.PlansSuccessFetch({ plans });
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
