// api/profile/user-info
import { NextResponse } from "next/server";
import { User } from "@/models/user/user";
import { Subscription } from "@/models/payment/subscription";
import UserTemp from "@/models/user/user-temp";
import { validateSession } from "@/lib/auth";
import dbConnect from "@/config/dbconnect";
import { redis } from "@/lib/redis";
import { Workspace } from "@/models/user/workspace";
// Constants
const CACHE_TTL = 30; // 30 seconds cache

// Helper Functions
const getCacheKey = (email) => `user:${email}`;
// Main GET Handler
export async function GET(req) {
  try {
    await dbConnect();
    const session = await validateSession(req);
    const { email } = session.user;

    // Check cache first
    const cacheKey = getCacheKey(email);
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Clean up temp user if exists
    await UserTemp.findOneAndDelete({ email });

    // Get user with subscription
    const user = await User.findOne({ email })
      .select("+image")
      .populate({
        path: "currentWorkspace",
        select: "name slug domain logo settings",
        model: Workspace,
      })
      .populate({
        path: "workspaces.workspace",
      });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const workspace = await Workspace.findOne({
      "members.user": user._id,
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found" },
        { status: 404 }
      );
    }
    await user.updateLastActiveInWorkspace(workspace._id);
    await user.save();

    // Handle subscription
    let subscription = await Subscription.findOne({ workspace: workspace._id });
    const responseData = {
      requiresProfileCompletion: user.requiresProfileCompletion,
      user: user.toObject({ virtuals: true }),
      existPlan: subscription,
    };

    // Cache the response
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(responseData));

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT Handler
export async function PUT(req) {
  try {
    await dbConnect();
    const session = await validateSession(req);
    const { email } = session.user;
    const body = await req.json();
    const { password, phone, terms } = body;

    // Validate phone uniqueness if provided
    if (phone) {
      const phoneExists = await User.exists({
        phone,
        _id: { $ne: session.user.id },
      });
      if (phoneExists) {
        return NextResponse.json(
          { message: "Phone number already in use" },
          { status: 400 }
        );
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

    // Update user
    const updatedUser = await User.findOne({ email })
      .select("-password")
      .populate({
        path: "subscription",
        select:
          "plan status endDate isActive messagesRemaining renewalInterval",
      });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Invalidate cache
    await redis.del(getCacheKey(email));

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        ...updatedUser.toObject(),
        subscription:
          updatedUser.subscription?.toObject({ virtuals: true }) || null,
      },
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
