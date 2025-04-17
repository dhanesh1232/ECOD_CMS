import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import connectDB from "@/config/db";

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  const { action } = params;

  try {
    const user = await User.findById(session.user.id);
    const body = await req.json();

    switch (action) {
      case "start-trial":
        await user.startTrial();
        break;
      case "upgrade":
        await user.subscribe(body.plan, body.billingCycle);
        break;
      case "cancel":
        user.subscription.status = "canceled";
        await user.save();
        break;
      default:
        return new Response("Invalid action", { status: 400 });
    }

    const updatedUser = await User.findById(session.user.id).select(
      "-password -openaiApiKey"
    );

    return Response.json(updatedUser);
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
}
