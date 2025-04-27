import { getServerSession } from "next-auth";
import dbConnect from "@/config/dbconnect";
import User from "@/model/par-user";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const email = session?.user?.email;
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password, phone } = body;

    // Find current user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if phone number exists for another user
    if (phone) {
      const existingUser = await User.findOne({
        phone: phone,
        _id: { $ne: user._id }, // Exclude current user
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Phone number already exists for another user" },
          { status: 400 }
        );
      }
    }

    // Update password if provided
    if (password) {
      user.password = password;
    }

    // Update phone number if provided
    if (phone) {
      user.phone = phone;
    }

    // Update profile completion status
    if (user.password && user.phone) {
      user.requiresProfileCompletion = false;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Profile update error:", err.message);
    return NextResponse.json(
      { message: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}
