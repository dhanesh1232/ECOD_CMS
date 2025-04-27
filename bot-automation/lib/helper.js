import { encryptData } from "@/utils/encryption";
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
  rateDelta: 5000, // 5 seconds between messages
  rateLimit: 3, // 3 messages per second
  secure: true,
});

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
  const enMail = encryptData(email);
  const enToken = encryptData(verificationCode);
  const verificationUrl = `${baseUrl}/auth/verify-account?email=${encodeURIComponent(
    enMail
  )}&code=${enToken}`;

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Please verify your ECOD account!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; background-color: #f1f5f9;">
        <div style="background: #4F46E5; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Verify Your ECOD Account</h2>
        </div>
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px;">
          <p>Hello ${email.split("@")[0]},</p>
          <p>We're thrilled to have you with us at ECOD. To complete your registration, please verify your email address:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email Address</a>
          </p>
          <p>If you didn’t create an account with us, no worries! You can safely ignore this email.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f1f5f9; padding: 10px; text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Hello, please verify your ECOD account by clicking this link: ${verificationUrl}\n\nIf you didn't request this, simply ignore the email.`,
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
  const enMail = encryptData(email);
  const enToken = encryptData(verificationCode);
  const resetLink = `${baseUrl}/auth/reset-password?email=${encodeURIComponent(
    enMail
  )}&token=${enToken}`;

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Reset Your ECOD Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Password Reset Request</h2>
        </div>
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px;">
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. If this was you, click the link below to create a new password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </p>
          <p>This link will expire in 30 minutes. If you didn’t request a reset, simply ignore this email or contact support.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f1f5f9; padding: 10px; text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
          <p><a href="${baseUrl}/privacy" style="color: #6c757d;">Privacy Policy</a> | <a href="${baseUrl}/support" style="color: #6c757d;">Contact Support</a></p>
        </div>
      </div>
    `,
    text: `Hello ${name},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n${resetLink}\n\nThis link will expire in 30 minutes. If you didn’t request this, please ignore this email.`,
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
//Password changed successfully
export async function PasswordResetSuccessfulMail(name, email) {
  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Password Reset Successful",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
          <h2 style="margin: 0; color: #2c3e50;">Your ECOD Password Has Been Reset</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello ${name || "there"},</p>
          <p>Your ECOD account password has been successfully reset. You can now log in to your account with the new password.</p>
          <p>If you didn’t request this change, please contact our support team immediately.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/auth/login" 
               style="background-color: #28a745; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Log In to Your Account
            </a>
          </p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; 
                    color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Hi ${
      name || "there"
    },\n\nYour ECOD password has been successfully reset. You can now log in to your account using the new password.\n\nIf you didn't request this change, please contact our support team immediately.\n\nLog In here: ${baseUrl}/login`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset successful email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending password reset successful email:", error);
    throw error;
  }
}

//Account verification after registration
export async function AccountVerificationCompletedMail(name, email) {
  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Account Verification Completed - Please Log In",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e9ecef;">
          <h2 style="margin: 0; color: #2c3e50;">Account Verification Complete</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hi ${name || "there"},</p>
          <p>Your account has been successfully verified. You can now log in to your ECOD account and explore all the features.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/auth/login" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Log In Now
            </a>
          </p>
          <p>If you encounter any issues, feel free to contact our support team.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; 
                    color: #6c757d; border-top: 1px solid #e9ecef;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Hi ${
      name || "there"
    },\n\nYour account has been successfully verified. You can log in here: ${baseUrl}/login\n\nFor any issues, please contact support.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Account verification completed email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending account verification completed email:", error);
    throw error;
  }
}

export async function NewSignupGoogleMail(name, email) {
  const profileLink = baseUrl;

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "Welcome to ECOD! Let's Get Started",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5;">Welcome to ECOD! 🎉</h2>
          <p>Hi ${name || "there"},</p>
          <p>Thanks for signing up with your Google account! Now, let's get your profile set up to unlock all the amazing features ECOD has to offer.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${profileLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">Complete Your Profile</a>
          </p>
          <p>We’re excited to have you on board!<br>The ECOD Team</p>
        </div>
      </div>
    `,
    text: `Hi ${
      name || "there"
    },\n\nWelcome to ECOD! Complete your profile here: ${profileLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("New signup email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending new signup email:", error);
    throw error;
  }
}
function generateLoginAlertEmail({ name }) {
  return {
    subject: `🔐 Login Alert - New Sign In Detected`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f1f5f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #dc3545;">New Login Detected</h2>
          <p>Hi ${name || "there"},</p>
          <p>We’ve noticed a recent login to your ECOD account. If this was you, you don’t need to take any action. If this wasn’t you, please secure your account immediately by changing your password:</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="${baseUrl}/auth/reset-password" style="background-color: #dc3545; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">Change Your Password</a>
          </p>
          <p>If you need further assistance, please don’t hesitate to contact our support team.</p>
          <p>Stay safe,</p>
          <p>The ECOD Team</p>
        </div>
      </div>
    `,
    text: `Hi ${
      name || "there"
    },\n\nWe detected a login to your ECOD account. If this wasn’t you, please change your password immediately here: ${baseUrl}/auth/reset-password.\n\nStay safe, The ECOD Team`,
  };
}

// 📩 Single Exported Function
export async function sendLoginAlertEmail(name, email) {
  const content = generateLoginAlertEmail({ name });

  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Login alert email sent:`, info.messageId);
    return info;
  } catch (error) {
    console.error(`Error sending login alert:`, error);
    throw error;
  }
}
