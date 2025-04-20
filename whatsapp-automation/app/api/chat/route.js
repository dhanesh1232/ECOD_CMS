// app/api/chat/route.js
import twilio from "twilio";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import User from "@/models/User";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

class ConversationManager {
  constructor() {
    this.sessions = new Map();
  }

  async getSession(phoneNumber) {
    if (!this.sessions.has(phoneNumber)) {
      await connectDB();
      const user = await User.findOne({ phoneNumber });

      if (!user) throw new Error("User not found");

      const chat = await Chat.findOne({
        userId: user._id,
        platform: "whatsapp",
      }).sort({ createdAt: -1 });

      this.sessions.set(phoneNumber, {
        userId: user._id,
        step: chat?.metadata?.nextStep || "welcome",
        data: chat?.metadata || {},
      });
    }
    return this.sessions.get(phoneNumber);
  }

  async updateSession(phoneNumber, updates) {
    const session = await this.getSession(phoneNumber);
    this.sessions.set(phoneNumber, { ...session, ...updates });
  }

  clearSession(phoneNumber) {
    this.sessions.delete(phoneNumber);
  }
}

const conversationManager = new ConversationManager();

export async function POST(request) {
  try {
    await connectDB();

    // 1. Read raw body once
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);
    const body = Object.fromEntries(params.entries());

    const sender = body.From;
    const twilioSignature = request.headers.get("x-twilio-signature");
    const url = new URL(request.url);

    if (twilioSignature) {
      const isValid = twilio.validateRequest(
        authToken,
        twilioSignature,
        url.toString(),
        body
      );
      if (!isValid) {
        console.error("Invalid Twilio signature received");
        return new NextResponse("Invalid signature", { status: 403 });
      }
    }

    // 3. Business logic
    const incomingMsg = body.Body?.toLowerCase()?.trim() || "";
    const platform = body.SmsMessageSid ? "sms" : "whatsapp";

    let user = await User.findOne({ phoneNumber: sender });
    if (!user) {
      user = await User.create({
        phoneNumber: sender,
        name: "New User",
        lastLogin: new Date(),
      });
    }

    const session = await conversationManager.getSession(sender);

    let response;
    let nextStep = session.step;
    const metadata = { ...session.data };

    switch (session.step) {
      case "welcome":
        response = `👋 Hi ${user.name}! Welcome to our service. How can I help you today?\n1. Account Information\n2. Support\n3. FAQ`;
        nextStep = "main_menu";
        break;

      case "main_menu":
        if (incomingMsg === "1") {
          response = "Please enter your account number:";
          nextStep = "account_lookup";
        } else if (incomingMsg === "2") {
          response = "Please describe your support issue:";
          nextStep = "support_request";
        } else if (incomingMsg === "3") {
          response =
            "Here are FAQs:\n1. Pricing\n2. Features\n3. Contact\nReply with your choice";
          nextStep = "faq_menu";
        } else {
          response =
            "Sorry, I didn't understand. Please reply with 1, 2, or 3.";
        }
        break;

      case "account_lookup":
        if (/^\d{8,12}$/.test(incomingMsg)) {
          metadata.accountNumber = incomingMsg;
          response = `Account lookup initiated for ${incomingMsg}. Our team will contact you shortly.`;
          nextStep = "main_menu";
        } else {
          response = "Invalid account number. Please enter 8-12 digits.";
        }
        break;

      case "support_request":
        metadata.supportRequest = incomingMsg;
        response =
          "Thank you. Your support request has been logged. Our team will contact you soon.";
        nextStep = "main_menu";
        break;

      case "faq_menu":
        // Handle FAQ choices if needed
        response = "FAQ coming soon!";
        nextStep = "main_menu";
        break;

      default:
        response = "Sorry, I didn't understand that. Type 'help' for options.";
    }

    // Save messages
    await Chat.findOneAndUpdate(
      { userId: user._id, platform },
      {
        $push: {
          messages: [
            {
              role: "user",
              content: incomingMsg,
              timestamp: new Date(),
            },
            {
              role: "assistant",
              content: response,
              timestamp: new Date(),
            },
          ],
        },
        $set: {
          metadata: {
            ...metadata,
            nextStep,
            lastUpdated: new Date(),
          },
        },
      },
      { upsert: true, new: true }
    );

    await client.messages.create({
      body: response,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: sender,
    });

    await conversationManager.updateSession(sender, {
      step: nextStep,
      data: metadata,
    });

    user.lastActive = new Date();
    await user.save();

    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new NextResponse(
      "<Response><Message>Error processing your request</Message></Response>",
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
