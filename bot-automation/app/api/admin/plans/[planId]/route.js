import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Plan } from "@/models/user/schema";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { planId } = await params;
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");
    if (!planId && !id) {
      return ErrorHandles.UserNotFound("Invalid plan and credentials");
    }
    const plan = await Plan.findOne({ _id: planId, id: id });
    if (!plan) {
      return ErrorHandles.UserNotFound(`Plan with id ${planId} not found`);
    }
    return SuccessHandle.PlanIdFetch({ plan }, "Plan Id fetched successfully");
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { planId } = await params;
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");
    if (!planId && !id) {
      return ErrorHandles.UserNotFound("Invalid plan and credentials");
    }
    return SuccessHandle.DefaultSuccess();
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
