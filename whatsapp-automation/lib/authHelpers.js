import crypto from "crypto";

// Generate OTP
export const generateOTP = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// Send verification email
export const sendVerificationEmail = async (email, token, name) => {
  // In production, implement actual email sending logic
  console.log(
    `Verification email sent to ${email} with token: ${token} dear: ${name}`
  );
  return true;
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token) => {
  // In production, implement actual email sending logic
  console.log(`Password reset email sent to ${email} with token: ${token}`);
  return true;
};

// Generate random token
export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
