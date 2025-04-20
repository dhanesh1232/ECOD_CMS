import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { Twilio } from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);
const contentSid = process.env.CONTEST_SID;

export async function POST(req) {
  try {
    await connectDB();

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user from the database
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    // Ensure the user exists and has a phone number
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.phoneNumber) {
      return NextResponse.json(
        { message: "Phone number not found" },
        { status: 400 }
      );
    }

    // Get the message from the request body
    const body = await req.json();
    const { message } = body;

    // Ensure that the message is not empty
    if (!message || message.trim() === "") {
      return NextResponse.json(
        { message: "Message cannot be empty" },
        { status: 400 }
      );
    }

    console.log("Sending message:", message, user.phoneNumber);

    // Ensure phone number is in E.164 format with + sign
    const formattedNumber = `whatsapp:${user.phoneNumber}`;

    // Send the message via Twilio
    const response = await client.messages.create({
      contentSid,
      from: `whatsapp:${process.env.NEXT_PUBLIC_TWILIO_FROM_NUMBER}`,
      to: formattedNumber,
      contentVariables: JSON.stringify({
        1: message.toString(),
      }),
    });

    // Log the response from Twilio for debugging
    console.log("Twilio response:", response);

    // Respond with success
    return NextResponse.json({ success: true, message: response });
  } catch (error) {
    console.error("Error in route:", error);

    // Handle generic errors
    if (error && error instanceof Error) {
      return NextResponse.json(
        { error: "Server error", details: error.message },
        { status: 500 }
      );
    }

    // Default error handling for unknown errors
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
