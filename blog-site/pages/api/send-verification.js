// pages/api/send-verification.js
import { sendVerificationEmail } from "./lib/mailer";
import { sendWhatsAppVerification } from "./lib/twilio";
import rateLimit from "./lib/rate-limit";
import { validateEmail, validatePhoneNumber } from "./lib/validator";
import { getClientInfo } from "./lib/client-info";

// Constants
const VERIFICATION_CODE_LENGTH = 6;
const MAX_VERIFICATION_ATTEMPTS = 3;
const VERIFICATION_CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes
const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

// Rate limiter configuration (development-friendly)
const limiter = rateLimit({
  interval: isDevelopment ? 30 * 1000 : 5 * 60 * 1000, // 30s dev / 5min prod
  uniqueTokenPerInterval: 500,
  tieredLimits: {
    email: isDevelopment ? 20 : 3, // Higher limits in development
    whatsapp: isDevelopment ? 10 : 2,
    default: isDevelopment ? 30 : 5,
  },
});

// In-memory store for verification attempts
const verificationAttempts = new Map();

// Cleanup old attempts periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, attempt] of verificationAttempts) {
    if (now - attempt.lastAttempt > VERIFICATION_CODE_EXPIRY * 2) {
      verificationAttempts.delete(key);
    }
  }
}, VERIFICATION_CODE_EXPIRY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.ALLOWED_ORIGINS || "*"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Client-Info");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS request for CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Skip rate limiting in development for local testing
  if (!isDevelopment) {
    try {
      const clientInfo = getClientInfo(req);
      const rateLimitKey = `${clientInfo.ip}-${req.headers["user-agent"]}`;

      await limiter.check(
        res,
        rateLimitKey,
        req.body.email ? "email" : "whatsapp"
      );
    } catch (error) {
      console.error("Rate limit exceeded:", {
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        userAgent: req.headers["user-agent"],
        timestamp: new Date().toISOString(),
      });

      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: error.retryAfter || (isDevelopment ? 10 : 300),
      });
    }
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  }

  try {
    const { email, phone, code, name, verificationId, service } = req.body;
    const clientInfo = getClientInfo(req);

    // Enhanced request validation
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Either email or phone number is required",
      });
    }

    // Validate verification code format
    if (
      !code ||
      code.length !== VERIFICATION_CODE_LENGTH ||
      !/^\d+$/.test(code)
    ) {
      return res.status(400).json({
        success: false,
        message: `Valid ${VERIFICATION_CODE_LENGTH}-digit code is required`,
      });
    }

    // Check verification attempts (skip strict checking in development)
    const attemptKey = email ? `email:${email}` : `phone:${phone}`;
    const attempts = verificationAttempts.get(attemptKey) || {
      count: 0,
      lastAttempt: 0,
    };
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;

    if (!isDevelopment && attempts.count >= MAX_VERIFICATION_ATTEMPTS) {
      if (timeSinceLastAttempt < VERIFICATION_CODE_EXPIRY) {
        return res.status(429).json({
          success: false,
          message: "Too many verification attempts. Please try again later.",
          retryAfter: Math.ceil(
            (VERIFICATION_CODE_EXPIRY - timeSinceLastAttempt) / 1000
          ),
          limit: MAX_VERIFICATION_ATTEMPTS,
        });
      } else {
        // Reset attempts if expired
        verificationAttempts.delete(attemptKey);
      }
    }

    // Enhanced logging with sanitized data
    console.log("Verification request received:", {
      timestamp: new Date().toISOString(),
      clientInfo,
      verificationId,
      email: email
        ? `${email.substring(0, 3)}...@${email.split("@")[1]?.substring(0, 1)}...`
        : null,
      phone: phone ? `...${phone.slice(-4)}` : null,
      codeLength: code?.length,
      name: name ? `${name.substring(0, 1)}...` : null,
      environment: process.env.NEXT_PUBLIC_NODE_ENV || "development",
    });

    // Validate contact info based on type
    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      // Check for disposable/temporary emails (even in development)
      const emailDomain = email.split("@")[1]?.toLowerCase();
      if (process.env.BLOCKED_EMAIL_DOMAINS?.split(",").includes(emailDomain)) {
        return res.status(400).json({
          success: false,
          message: "Temporary email addresses are not allowed",
        });
      }

      // Send email verification
      const emailSuccess = await sendVerificationEmail(
        email,
        code,
        name,
        service,
        verificationId
      );
      if (!emailSuccess) {
        throw new Error("Email sending failed");
      }

      // Track successful attempt
      verificationAttempts.set(attemptKey, {
        count: attempts.count + 1,
        lastAttempt: Date.now(),
      });

      return res.status(200).json({
        success: true,
        message: "Verification email sent",
        method: "email",
        verificationId,
        expiresAt: Date.now() + VERIFICATION_CODE_EXPIRY,
      });
    }

    if (phone) {
      if (!validatePhoneNumber(phone)) {
        return res.status(400).json({
          success: false,
          message: "Invalid phone number format",
        });
      }

      // Send WhatsApp verification - updated parameters
      const { success, error } = await sendWhatsAppVerification(
        phone, // phone number first
        code, // then code
        name, // then optional name
        verificationId // then optional verificationId
      );

      if (!success) {
        throw new Error(error?.message || "WhatsApp message sending failed");
      }

      // Track successful attempt
      verificationAttempts.set(attemptKey, {
        count: attempts.count + 1,
        lastAttempt: Date.now(),
      });

      return res.status(200).json({
        success: true,
        message: "WhatsApp verification sent",
        method: "whatsapp",
        verificationId,
        expiresAt: Date.now() + VERIFICATION_CODE_EXPIRY,
      });
    }
  } catch (error) {
    // Enhanced error logging
    console.error("Verification API error:", {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code,
        details: error.details,
      },
      request: {
        method: req.method,
        url: req.url,
        headers: {
          "user-agent": req.headers["user-agent"],
          "x-forwarded-for": req.headers["x-forwarded-for"],
        },
        body: {
          email: req.body.email ? `${req.body.email.substring(0, 3)}...` : null,
          phone: req.body.phone ? `...${req.body.phone.slice(-4)}` : null,
        },
      },
      environment: process.env.NEXT_PUBLIC_NODE_ENV || "development",
    });

    // Determine appropriate status code
    const statusCode =
      error.statusCode || (error.message.includes("failed") ? 502 : 500);

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal verification server error",
      ...(isDevelopment && {
        stack: error.stack,
        details: error.details,
      }),
      ...(error.retryAfter && { retryAfter: error.retryAfter }),
    });
  }
}
