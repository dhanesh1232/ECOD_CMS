import nodemailer from "nodemailer";

// Configure transporter with additional settings to improve deliverability
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
  // Additional settings to improve deliverability
  pool: true, // use pooled connection
  rateLimit: true, // enable to make sure we don't get rate limited
  maxConnections: 1, // limit to 1 connection at a time
  maxMessages: 10, // send no more than 10 messages per connection
});

const brand = "ECOD";
const senderName = "ECOD Support"; // Proper sender name
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Common email headers and settings
const commonMailOptions = {
  from: `"${senderName}" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
  headers: {
    "X-Priority": "1", // High priority
    "X-Mailer": "ECOD Mailer",
    "X-Message-ID": `<${Date.now()}@ecod.com>`,
    "List-Unsubscribe": `<${baseUrl}/unsubscribe>`, // Add unsubscribe link if needed
  },
  date: new Date(),
};

export function VerificationMail(verificationCode, email) {
  const verificationUrl = `${baseUrl}/auth/verify-account?email=${encodeURIComponent(
    email
  )}&code=${verificationCode}`;

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Verify your ECOD account",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
          <h2 style="margin: 0; color: #2c3e50;">ECOD Account Verification</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello,</p>
          <p>Thank you for creating an account with ECOD. To complete your registration, please verify your email address.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #28a745; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Verify Email Address
            </a>
          </p>
          <p>Or use this verification code:</p>
          <div style="background: #e9ecef; padding: 10px; border-radius: 4px; text-align: center; 
                      font-family: monospace; font-size: 18px; margin: 20px 0;">
            ${verificationCode}
          </div>
          <p>If you didn't create an ECOD account, you can safely ignore this email.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; 
                    color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Please verify your ECOD account by clicking this link: ${verificationUrl}\n\nOr use this verification code: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.messageId);
    }
  });
}

export async function PasswordResetLinkGenerator(
  verificationCode,
  name,
  email
) {
  const resetLink = `${baseUrl}/auth/reset-password?email=${encodeURIComponent(
    email
  )}&token=${verificationCode}`;

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: `Reset your ECOD password`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
          <h2 style="margin: 0; color: #2c3e50;">Password Reset Request</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name},</p>
          <p>We received a request to reset your password for your ECOD account.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #dc3545; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 30 minutes. If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; 
                    color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
          <p><a href="${baseUrl}/privacy" style="color: #6c757d;">Privacy Policy</a> | <a href="${baseUrl}/support" style="color: #6c757d;">Contact Support</a></p>
        </div>
      </div>
    `,
    text: `Hi ${name},\n\nWe received a request to reset your password for your ECOD account. Please click the following link to reset your password:\n\n${resetLink}\n\nThis link will expire in 30 minutes. If you didn't request this, please ignore this email.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}
