import twilio from "twilio";
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const fromWhatsapp = process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER;
const contentSid = "HXaa89edf1b02d7ec1aeaecc5378faaed6";
const client = twilio(accountSid, authToken);
export default async function handler(req, res) {
  try {
    const { message, phone } = req.body;
    console.log(message, phone);
    const cleanedPhone = phone.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10) {
      throw new Error("Invalid phone number format");
    }
    const response = await client.messages.create({
      contentSid,
      from: `whatsapp:${fromWhatsapp}`,
      to: `whatsapp:+91${cleanedPhone}`,
      contentVariables: JSON.stringify({
        1: message,
      }),
    });
    res.json({
      message: `Data send Successfully to ${phone}:${message}`,
      confirm: response,
    });
  } catch (error) {
    console.log(error);
  }
}
