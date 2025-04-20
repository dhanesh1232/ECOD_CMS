import { Twilio } from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const incomingMsg = req.body.Body.toLowerCase().trim();
  const sender = req.body.From;

  try {
    let response;

    // Simple chatbot logic
    if (incomingMsg.includes("hello") || incomingMsg.includes("hi")) {
      response = "Hi there! How can I help you today?";
    } else if (incomingMsg.includes("help")) {
      response =
        "I can help with: \n1. Account info\n2. Support\nReply with your choice.";
    } else {
      response = "Sorry, I didn't understand that. Type 'help' for options.";
    }

    // Send response back via SMS
    await client.messages.create({
      body: response,
      from: process.env.NEXT_PUBLIC_TWILIO_FROM_NUMBER,
      to: sender,
    });

    return res.status(200).send("<Response></Response>");
  } catch (error) {
    console.error("Error handling Twilio webhook:", error);
    return res
      .status(500)
      .send(
        "<Response><Message>Error processing your request</Message></Response>"
      );
  }
}
