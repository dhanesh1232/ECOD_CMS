import nodemailer from "nodemailer";

// Email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendLoginNotification(email, loginMethod) {
  try {
    const time = new Date().toLocaleString();

    const mailOptions = {
      from: `"ECODIfy" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔐 New Login Detected on Your ECODIfy Account",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #eaeaea;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e90ff;">ECODIfy</h1>
          </div>
          <h2 style="color: #333;">👋 Hello,</h2>
          <p style="color: #444;">We noticed a new login to your <strong>ECODIfy</strong> account.</p>

          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Login Method:</td>
              <td style="padding: 10px; color: #333;">${loginMethod}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Time:</td>
              <td style="padding: 10px; color: #333;">${time}</td>
            </tr>
          </table>

          <p style="color: #444;">If this was you, you can safely ignore this message.</p>
          <p style="color: #d9534f;"><strong>If it wasn’t you</strong>, please <a href="${
            process.env.RESET_LINK || "#"
          }" style="color: #1e90ff;">reset your password</a> or contact support immediately.</p>

          <div style="margin-top: 30px; text-align: center;">
            <a href="${
              process.env.RESET_LINK || "#"
            }" style="padding: 10px 20px; background-color: #1e90ff; color: white; border-radius: 6px; text-decoration: none; display: inline-block;">Secure My Account</a>
          </div>

          <p style="margin-top: 40px; font-size: 12px; color: #aaa; text-align: center;">This is an automated email from ECODIfy. Do not reply directly to this message.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Login notification sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}

export async function sendPasswordChangeConfirmation(email) {
  try {
    const time = new Date().toLocaleString();

    const mailOptions = {
      from: `"ECODIfy Security" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔒 Your ECODIfy Password Was Changed",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e90ff;">ECODIfy</h1>
          </div>

          <h2 style="color: #333;">✅ Password Successfully Changed</h2>
          <p style="color: #555;">We wanted to let you know that your ECODIfy account password was changed.</p>

          <table style="margin: 20px 0; width: 100%;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Time:</td>
              <td style="padding: 10px; color: #333;">${time}</td>
            </tr>
          </table>

          <p style="color: #d9534f;"><strong>If this wasn't you</strong>, we recommend resetting your password immediately.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${
              process.env.FRONTEND_URL || "#"
            }" style="padding: 12px 24px; background-color: #d9534f; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Reset Password Now
            </a>
          </div>

          <p style="margin-top: 40px; font-size: 12px; color: #aaa; text-align: center;">If you have any questions, please contact our support team.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password change email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Password change email failed:", error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email, otp, name = "") {
  try {
    const mailOptions = {
      from: `"ECODIfy Support" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔐 Password Reset Request",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f2f4f6; padding: 30px; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #1e90ff; margin: 0;">ECODIfy</h1>
            <p style="color: #666; font-size: 16px;">Secure Password Recovery</p>
          </div>

          <p style="font-size: 16px; color: #444;">Hi ${name || "there"},</p>
          <p style="font-size: 15px; color: #555;">We received a request to reset your password. Please use the OTP below to proceed:</p>

          <div style="background: #ffffff; border-radius: 8px; padding: 16px; margin: 20px auto; text-align: center; border: 2px dashed #1e90ff; width: fit-content;">
            <p style="font-size: 24px; letter-spacing: 4px; font-weight: bold; color: #1e90ff;">${otp}</p>
          </div>

          <p style="font-size: 14px; color: #777;">⚠️ This code will expire in 10 minutes.</p>
          <p style="font-size: 14px; color: #777;">If you didn’t request this, you can safely ignore this email.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${
              process.env.FRONTEND_URL || "#"
            }" style="padding: 12px 24px; background-color: #1e90ff; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Reset Password
            </a>
          </div>

          <p style="margin-top: 40px; font-size: 12px; color: #aaa; text-align: center;">If you need help, contact our support at support@ecodify.com</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(email, name = "") {
  try {
    const mailOptions = {
      from: `"ECODIfy Team" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🎉 Welcome to ECODIfy!",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f4f8fb; padding: 30px; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #1e90ff;">Welcome to ECODIfy 👋</h1>
            <p style="font-size: 16px; color: #666;">Hi ${
              name || "there"
            }, your account has been created!</p>
          </div>

          <p style="font-size: 15px; color: #444;">
            Thank you for joining ECODIfy. You're now part of a growing community passionate about technology, efficiency, and smarter solutions.
          </p>

          <div style="margin: 30px 0; text-align: center;">
            <a href="${
              process.env.FRONTEND_URL || "#"
            }" style="background-color: #1e90ff; padding: 12px 24px; border-radius: 6px; color: white; text-decoration: none; font-weight: 500;">
              Login to Your Dashboard
            </a>
          </div>

          <p style="font-size: 14px; color: #777;">Need help or have questions? Just reply to this email or reach out at support@ecodify.com</p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

          <p style="font-size: 12px; color: #aaa; text-align: center;">We're excited to have you on board 🚀</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}
export async function sendVerificationEmail(email, otp, name = "") {
  try {
    const mailOptions = {
      from: `"ECODIfy Verification" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔐 Your ECODIfy OTP Verification Code",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f8f9fc; padding: 30px; border-radius: 10px; border: 1px solid #e0e0e0;">
          <h2 style="color: #2f855a; text-align: center;">Verify Your Email Address</h2>
          <p style="font-size: 16px; color: #333;">Hi ${name || "there"},</p>

          <p style="font-size: 15px; color: #444;">Thanks for signing up or resetting your password with ECODIfy.</p>
          <p style="font-size: 15px; color: #444;">Please use the following One-Time Password (OTP) to complete your process:</p>

          <div style="margin: 30px 0; text-align: center;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e40af;">${otp}</span>
          </div>

          <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>

          <div style="margin-top: 40px; text-align: center; font-size: 13px; color: #999;">
            ECODIfy | Empowering Digital Automation 🚀<br/>
            Need help? <a href="mailto:support@ecodify.com" style="color: #3b82f6;">Contact Support</a>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Verification email error:", error);
    throw error;
  }
}

export async function sendVerificationSuccessEmail(email, name = "") {
  try {
    const mailOptions = {
      from: `"ECODIfy" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🎉 Email Verified Successfully",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f9fafb; padding: 30px; border-radius: 10px; border: 1px solid #e5e7eb;">
          <h2 style="color: #10b981; text-align: center;">Welcome to ECODIfy</h2>
          <p style="font-size: 16px; color: #111827;">Hi ${name || "there"},</p>

          <p style="font-size: 15px; color: #374151;">✅ Your email has been successfully verified!</p>
          <p style="font-size: 15px; color: #374151;">You can now access all features of your ECODIfy account.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.APP_URL || "#"
            }" style="background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none;">Go to Dashboard</a>
          </div>

          <p style="font-size: 13px; color: #6b7280;">If you didn’t initiate this action, please <a href="mailto:support@ecodify.com" style="color: #3b82f6;">contact support</a> immediately.</p>

          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #9ca3af;">
            ECODIfy | Smart Automations for Smarter Brands 🚀<br/>
            Made with ❤️ from ECODIfy Team
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification success email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Verification success email error:", error);
    throw error;
  }
}

export async function sendPasswordSetSuccessEmail(email, name = "") {
  try {
    const mailOptions = {
      from: `"ECODIfy Security" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔐 Your Password Was Set Successfully",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #f9fafb; padding: 30px; border-radius: 10px; border: 1px solid #e5e7eb;">
          <h2 style="color: #2563eb; text-align: center;">Password Set Successfully</h2>
          <p style="font-size: 16px; color: #111827;">Hi ${name || "there"},</p>

          <p style="font-size: 15px; color: #374151;">✅ Your password has been successfully created. You can now log in and start using your ECODIfy account securely.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.APP_URL || "#"
            }" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none;">Login Now</a>
          </div>

          <p style="font-size: 13px; color: #6b7280;">If this wasn't you, please <a href="mailto:support@ecodify.com" style="color: #3b82f6;">contact support</a> immediately to secure your account.</p>

          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #9ca3af;">
            ECODIfy | Smart Security For Your Growth 🔐<br/>
            Made with ❤️ by Team ECODIfy
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Password set confirmation email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Password confirmation email error:", error);
    throw error;
  }
}
