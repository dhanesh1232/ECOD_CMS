import { Worker } from "bullmq";
import { redis } from "../lib/server/redis.js";

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("🎯 Email job received:", job.data);
  },
  { connection: redis }
);

emailWorker.on("error", (err) => {
  console.error("❌ Worker error:", err);
});

console.log("✅ Worker is running...");
