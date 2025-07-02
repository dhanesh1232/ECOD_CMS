import nodemailer from "nodemailer";
import { encryptData } from "./utils/encryption";

// Configure transporter with additional settings to improve deliverability
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
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
  from: `"${senderName}" <${process.env.EMAIL_ID}>`,
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
  const enMail = email;
  const enToken = verificationCode;
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

// Add these new functions to your existing email template file

// 🔔 Subscription Expiry Warning
export async function SubscriptionExpiryWarningMail(user, endDate, plan) {
  const mailOptions = {
    ...commonMailOptions,
    to: user.email,
    subject: `⚠️ Your ${plan.toUpperCase()} Plan Expires Soon (${endDate.toDateString()})`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #fff3cd; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #856404;">Plan Expiration Reminder</h2>
        </div>
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px;">
          <p>Hi ${user.name},</p>
          <p>Your <strong>${plan.toUpperCase()}</strong> subscription will expire on 
          <strong>${endDate.toDateString()}</strong>. To avoid service interruption:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${baseUrl}/billing" 
               style="background-color: #ffc107; color: #000; padding: 12px 24px;
                      text-decoration: none; border-radius: 4px; font-weight: bold;
                      display: inline-block;">
              Renew Subscription
            </a>
          </div>

          <p>After expiration, you'll be downgraded to our Free plan with basic features.</p>
          <p style="font-size: 0.9em; color: #6c757d;">
            Need help? <a href="${baseUrl}/support" style="color: #4F46E5;">Contact our support team</a>
          </p>
        </div>
        ${commonFooter}
      </div>
    `,
    text: `Hi ${
      user.name
    },\n\nYour ${plan} plan expires on ${endDate.toDateString()}.\nRenew now: ${baseUrl}/billing\n\nAfter expiration, you'll be downgraded to the Free plan.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Subscription expiry email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending subscription expiry email:", error);
    throw error;
  }
}

// 🔄 Subscription Downgrade Notification
export async function SubscriptionDowngradedMail(user, previousPlan) {
  const mailOptions = {
    ...commonMailOptions,
    to: user.email,
    subject: "Your Plan Has Been Downgraded to Free",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f8d7da; padding: 25px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: #721c24;">Plan Downgrade Notification</h2>
        </div>
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px;">
          <p>Hi ${user.name},</p>
          <p>Your <strong>${previousPlan.toUpperCase()}</strong> subscription has expired and 
          we've downgraded your account to our <strong>Free Plan</strong>.</p>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0;">What's changed:</p>
            <ul style="margin: 10px 0 0 20px;">
              <li>Limited to 1 chatbot</li>
              <li>500 monthly messages</li>
              <li>Basic features only</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <a href="${baseUrl}/pricing" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px;
                      text-decoration: none; border-radius: 4px; font-weight: bold;
                      display: inline-block;">
              Upgrade Again
            </a>
          </div>

          <p>Your archived ${previousPlan} plan data remains available for 30 days.</p>
        </div>
        ${commonFooter}
      </div>
    `,
    text: `Hi ${user.name},\n\nYour ${previousPlan} plan has expired. You've been downgraded to our Free Plan.\nUpgrade again: ${baseUrl}/pricing\n\nYour ${previousPlan} data remains available for 30 days.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Subscription downgrade email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending downgrade notification:", error);
    throw error;
  }
}

// Add this common footer section at the top of your file
const commonFooter = `
  <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 0.9em; 
              color: #6c757d; border-top: 1px solid #e9ecef; margin-top: 20px;">
    <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
    <p style="margin: 5px 0;">
      <a href="${baseUrl}/privacy" style="color: #6c757d; text-decoration: none;">Privacy Policy</a> | 
      <a href="${baseUrl}/terms" style="color: #6c757d; text-decoration: none;">Terms of Service</a>
    </p>
    <p style="margin: 0;">This is an automated message - please do not reply directly</p>
  </div>
`;

export async function SubscriptionPaymentFailedMail(name, email) {
  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "⚠️ Payment Failed - Please Update Your Billing Info",
    html: `
      <div style="font-family: Arial, sans-serif; background: #fff; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px;">
        <div style="background: #dc3545; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Payment Failed</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello ${name || "there"},</p>
          <p>We attempted to process your subscription payment, but unfortunately it was unsuccessful.</p>
          <p>Please update your payment information as soon as possible to continue enjoying ECOD services without interruption.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${baseUrl}/billing" style="background-color: #dc3545; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">Update Billing Info</a>
          </p>
          <p>If you need help, our support team is here for you.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e9ecef; padding-top: 10px;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Hello ${
      name || "there"
    },\n\nYour subscription payment failed. Please update your billing info here: ${baseUrl}/billing\n\nThanks,\nThe ECOD Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Subscription payment failed email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending subscription payment failed email:", error);
    throw error;
  }
}

export async function SubscriptionReactivatedMail(name, email) {
  const mailOptions = {
    ...commonMailOptions,
    to: email,
    subject: "✅ Subscription Reactivated - Welcome Back!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #fff; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px;">
        <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Welcome Back!</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello ${name || "there"},</p>
          <p>Your ECOD subscription has been successfully reactivated.</p>
          <p>You now have full access to all features. Thank you for choosing us again!</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${baseUrl}/dashboard" style="background-color: #28a745; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">Go to Dashboard</a>
          </p>
          <p>Need help? Just reach out to our support team.</p>
          <p>Thanks,<br>The ECOD Team</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e9ecef; padding-top: 10px;">
          <p>© ${new Date().getFullYear()} ECOD. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Hello ${
      name || "there"
    },\n\nYour ECOD subscription has been reactivated. You can access your dashboard here: ${baseUrl}/dashboard\n\nThanks,\nThe ECOD Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Subscription reactivated email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending subscription reactivated email:", error);
    throw error;
  }
}
