import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { User } from "@/models/user/user";
import UserTemp from "@/models/user/user-temp";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const session = await validateSession(req);
  const { email } = session.user;
  try {
    await UserTemp.findOneAndDelete({ email });
    const user = await User.findOne({ email }).select("-workspaces -password");
    if (!user) {
      return ErrorHandles.UserNotFound();
    }
    const resData = {
      requiresProfileCompletion: user.requiresProfileCompletion,
      user_name: user.name,
    };
    return NextResponse.json(
      {
        message: "Successfully fetch",
        user: resData,
      },
      { status: 200 }
    );
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const session = await validateSession(req);
    const body = await req.json();
    const { password, phone, terms } = body;

    // Validate phone uniqueness if provided
    if (phone) {
      const phoneExists = await User.exists({
        phone,
        _id: { $ne: session.user.id },
      });
      if (phoneExists) {
        return ErrorHandles.BadRequest("Phone number already in use");
      }
    }

    const user = await User.findById(session.user.id);
    if (password) user.password = password;
    if (phone) user.phone = phone;
    if (terms) user.termsAccepted = true;
    if (password && phone) {
      user.requiresProfileCompletion = false;
    }

    await user.save();

    return SuccessHandle.UserProfileUpdate();
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}
