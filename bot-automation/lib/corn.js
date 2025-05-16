// lib/cron.js
import { ApiKey } from "@/models/user/ApiKey";

export async function rotateExpiredApiKeys() {
  try {
    const count = await ApiKey.rotateExpiredKeys();
    console.log(`Rotated ${count} expired API keys`);
    return count;
  } catch (error) {
    console.error("Error rotating expired API keys:", error);
    throw error;
  }
}
