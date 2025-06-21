import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    console.log("Hello Corn");
    return SuccessHandle.DefaultSuccess();
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
