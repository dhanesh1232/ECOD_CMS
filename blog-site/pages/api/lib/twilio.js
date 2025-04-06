import twilio from "twilio";

// Remove NEXT_PUBLIC_ prefix from sensitive variables
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const fromWhatsapp = process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER; // e.g. "+14155238886"
const contentSid = process.env.NEXT_PUBLIC_TWILIO_TEMPLATE_ID;

// Validate environment variables
const validateEnv = () => {
  const requiredVars = [
    "NEXT_PUBLIC_TWILIO_ACCOUNT_SID",
    "NEXT_PUBLIC_TWILIO_AUTH_TOKEN",
    "NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER",
    "NEXT_PUBLIC_TWILIO_TEMPLATE_ID",
  ];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Twilio environment variables: ${missingVars.join(", ")}`
    );
  }
};

const client = twilio(accountSid, authToken);

export const sendWhatsAppVerification = async (phoneNumber, code) => {
  try {
    validateEnv();

    // Validate phone number (remove all non-digit characters)
    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10) {
      throw new Error("Invalid phone number format");
    }

    // Send WhatsApp message
    const message = await client.messages.create({
      contentSid,
      from: `whatsapp:${fromWhatsapp}`,
      to: `whatsapp:+${cleanedPhone}`,
      contentVariables: JSON.stringify({
        1: code.toString(),
      }),
    });

    console.log("WhatsApp verification sent:", {
      sid: message.sid,
      to: `...${cleanedPhone.slice(-4)}`, // Log only last 4 digits
      status: message.status,
      timestamp: new Date().toISOString(),
    });

    return { success: true, sid: message.sid };
  } catch (error) {
    console.error("WhatsApp verification failed:", {
      error: error.message,
      code: error.code,
      phoneNumber: phoneNumber ? `...${phoneNumber.slice(-4)}` : "undefined",
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
      error: {
        message: "Failed to send WhatsApp verification",
        details: error.message,
        code: error.code,
      },
    };
  }
};
