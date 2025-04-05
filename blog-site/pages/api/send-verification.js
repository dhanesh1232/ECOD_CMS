// pages/api/send-verification.js
import { sendVerificationEmail } from "./lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { email, code } = req.body;

    console.log("Received data:", req.body);
    // Basic validation
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    const success = await sendVerificationEmail(email, code);

    if (success) {
      return res.status(200).json({
        success: true,
        message: "Verification email sent",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
