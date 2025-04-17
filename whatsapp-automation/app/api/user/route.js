import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import connectDB from "@/config/db";
import { generateOTP } from "@/lib/authHelpers";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";

export async function GET() {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Fetch user by email
    const user = await User.findOne({ email: session.user.email })
      .select("-password -openaiApiKey")
      .lean();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 4. Return response
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("User API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(req) {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Get session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Update user by email
    const { name, phoneNumber, company, avatar } = await req.json();
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { name, phoneNumber, company, avatar } },
      { new: true, runValidators: true }
    ).select("-password -openaiApiKey");

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({
        error: "Update failed",
        details: error.message,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ email: session.user.email }).select(
      "+otp"
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Generate OTP
    const otp = generateOTP(6); // e.g., 6-digit code
    const hashedOtp = await bcrypt.hash(otp, 10);

    await sendVerificationEmail(user.email, otp, user.name);

    // 4. Store hashed OTP in DB with expiry
    user.otp = {
      code: hashedOtp, // only hashed version is stored
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    };

    await user.save();

    return new Response(
      JSON.stringify({ message: "OTP sent successfully", code: otp }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("OTP Send Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send OTP", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
