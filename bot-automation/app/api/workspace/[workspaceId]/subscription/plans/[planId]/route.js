import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Plan } from "@/models/user/schema";

export async function GET(req, { params }) {
  try {
    const { workspaceId: slug, planId: id } = await params;

    const plan = await Plan.findById(id);
    return SuccessHandle.DefaultSuccess({ plan });
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
