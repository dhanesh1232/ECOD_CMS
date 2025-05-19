import crypto from "crypto";

export function generateRandomSlug(prefix = "") {
  // Avoid ambiguous chars (0/o, 1/i/l)
  const charset = "23456789abcdefghjkmnpqrstuvwxyz";
  const randomValues = crypto.randomBytes(8);

  let slug = "";
  for (let i = 0; i < 8; i++) {
    slug += charset[randomValues[i] % charset.length];
    if (i === 3) slug += "-";
  }

  return slug;
  /*return prefix
    ? `${prefix.toLowerCase().replace(/[^a-z0-9]/g, "")}-${slug}`
    : slug;*/
}
