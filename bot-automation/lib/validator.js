import crypto from "crypto";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,16}$/;
export const nameRegex = /^[a-zA-Z\s]{2,50}$/;
export const phoneRegex = /^\+91\d{10}$/;

export function validateEmail(email) {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (!passwordRegex.test(password)) {
    return "Password must be 8-16 characters, include 1 digit & 1 special character";
  }
  return null;
}

export function validateName(name) {
  if (!name) return "Name is required";
  if (!nameRegex.test(name)) return "Name must be 2-50 letters only";
  return null;
}

export function validatePhone(phone) {
  if (!phone) return "Phone number is required";
  // Remove all whitespaces first (if needed)
  const sanitized = phone.replace(/\s+/g, "");
  if (!phoneRegex.test(sanitized)) {
    return "Phone number must be in +91XXXXXXXXXX format without spaces";
  }
  return null;
}
export function ValidateTerms(terms) {
  if (!terms) return "Please accept terms to process";
  return null;
}

export function validateAll({ email, password, name, phone, terms }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    name: validateName(name),
    phone: validatePhone(phone),
    terms: ValidateTerms(terms),
  };
}
export function generateStrongVerificationCode(digi = 6) {
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits of randomness
  const code = buffer.readUIntBE(0, 3) % 1000000; // Modulo to keep within 6 digits
  return code.toString().padStart(digi, "0"); // Pad with leading 0s if needed
}

export const SLUG_REGEX = /^(?:[a-z0-9]+-)?[a-z0-9]{4}-[a-z0-9]{4}$/;
export const PUBLIC_PATHS = [
  "/auth/register",
  "/auth/login",
  "/auth/verify-account",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/error",
];
