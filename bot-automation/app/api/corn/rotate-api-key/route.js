// app/api/cron/rotate-api-keys/route.js
import { NextResponse } from "next/server";
import { rotateExpiredApiKeys } from "@/lib/corn";

export async function GET() {
  // Add authentication if needed (e.g., secret key in headers)
  try {
    const count = await rotateExpiredApiKeys();
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Error in API key rotation:", error);
    return NextResponse.json(
      { error: "Failed to rotate API keys" },
      { status: 500 }
    );
  }
}
