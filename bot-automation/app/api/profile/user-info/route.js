import { getServerSession } from "next-auth";
import dbConnect from "@/config/dbconnect";
import { User } from "@/models/user/par-user";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Subscription } from "@/models/payment/subscription";

export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const mongooseInstance = await dbConnect();

    const user = await User.findOne({ email }).select("+password +image");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingSubscription = await Subscription.findOne({
      user: user._id,
    });

    if (!existingSubscription) {
      const dbSession = await mongooseInstance.connection.startSession();
      try {
        await dbSession.startTransaction();

        const [freeSubscription] = await Subscription.create(
          [
            {
              user: user._id,
              plan: "free",
              status: "active",
              renewalInterval: "lifetime",
              startDate: new Date(),
              endDate: null,
              features: {
                channels: ["web"],
                chatbots: 1,
                monthlyMessages: 500,
              },
              usage: {
                messagesUsed: 0,
                chatbotsCreated: 0,
                lastReset: new Date(),
              },
            },
          ],
          { session: dbSession }
        );

        await User.findByIdAndUpdate(
          user._id,
          { $set: { subscription: freeSubscription._id } },
          { session: dbSession }
        );

        await dbSession.commitTransaction();
      } catch (error) {
        await dbSession.abortTransaction();
        throw error;
      } finally {
        dbSession.endSession();
      }
    }

    if (existingSubscription) {
      if (user.plan !== existingSubscription.plan) {
        user.plan = existingSubscription.plan;
        await user.save();
      }
    }

    const populatedUser = await User.findById(user._id)
      .populate({
        path: "subscription",
        match: { status: { $in: ["active", "grace_period"] } },
      })
      .select("+password +image");

    return NextResponse.json(
      {
        requiresProfileCompletion: user.requiresProfileCompletion,
        user: user,
        existPlan: existingSubscription,
      },
      populatedUser.toObject({ virtuals: true })
    );
  } catch (err) {
    console.error("Session fetch error:", err);
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

    const user = await User.findOne({ email })
      .select("+password")
      .populate("subscription");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (phone) {
      const existingUser = await User.findOne({
        phone: phone,
        _id: { $ne: user._id },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Phone number already in use" },
          { status: 400 }
        );
      }
    }

    if (password) user.password = password;
    if (phone) user.phone = phone;

    if (password && phone) {
      user.requiresProfileCompletion = false;
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "subscription",
        select:
          "plan status endDate isActive messagesRemaining renewalInterval",
      });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          ...updatedUser.toObject(),
          subscription:
            updatedUser.subscription?.toObject({ virtuals: true }) || null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json(
      { message: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}
