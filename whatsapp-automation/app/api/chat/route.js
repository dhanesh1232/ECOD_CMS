import connectDB from "@/config/db";
import { NextResponse } from "next/server";
import { createOpenAIClient, generateChatResponse } from "@/lib/openai";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function POST(request) {
  await connectDB();

  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { messages, platform } = await request.json();
    const openai = createOpenAIClient(user.openaiApiKey);

    const response = await generateChatResponse(openai, messages);

    // Save chat to database
    const chat = await Chat.create({
      userId: user._id,
      messages: [...messages, { role: "assistant", content: response }],
      platform,
    });

    return NextResponse.json({
      response,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
