// config/businessEmails.js

export const businessEmails = {
  support: {
    name: "ECODrIx Support",
    email: process.env.ECOD_SUPPORT_MAIL,
    usage: "Handles user queries, chatbot help, and onboarding issues.",
  },
  billing: {
    name: "ECODrIx Billing",
    email: process.env.ECOD_BILLING_MAIL,
    usage: "Handles invoices, payment confirmations, and subscription issues.",
  },
  noreply: {
    name: "ECODrIx System",
    email: process.env.ECOD_NOREPLY_MAIL,
    usage:
      "Used for system-generated emails like password reset, OTP, or verification links.",
  },
  newsletter: {
    name: "ECODrIx Updates",
    email: process.env.ECOD_NEWSLETTER_MAIL,
    usage: "Used to send product updates, announcements, or newsletters.",
  },
};
