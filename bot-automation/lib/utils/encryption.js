import crypto, { createHash } from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = () => {
  return createHash("sha256")
    .update(process.env.NEXT_PUBLIC_ENCRYPT_SECRET)
    .digest();
};
const IV_LENGTH = 16;

export function encryptData(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY(), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decryptData(text) {
  if (!text) return null;
  const [ivHex, encryptedData] = text.split(":");
  if (!ivHex || !encryptedData) return null;

  try {
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY(), iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
