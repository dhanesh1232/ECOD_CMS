export function generateRandomSlug(userCount = 800) {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const digits = "23456789";

  const randomChars = [
    consonants.charAt(Math.floor(Math.random() * consonants.length)),
    digits.charAt(Math.floor(Math.random() * digits.length)),
    consonants.charAt(Math.floor(Math.random() * consonants.length)),
  ].join("");

  const formattedCount = String(userCount).padStart(2, "0");
  return `eco${randomChars}-${formattedCount}d`;
}
