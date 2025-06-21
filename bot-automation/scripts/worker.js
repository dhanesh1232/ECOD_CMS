import { Worker } from "bullmq";
import { redis } from "../lib/server/redis.js";
import { handleEmailJob } from "./tasks/tasks.js";
import { handleSubscriptionJob } from "./tasks/tasks.js";

const emailWorker = new Worker("emailQueue", handleEmailJob, {
  connection: redis,
  autorun: false, // We'll start manually
});

const subscriptionWorker = new Worker(
  "subscriptionQueue",
  handleSubscriptionJob,
  {
    connection: redis,
    autorun: false,
  }
);

// Error handling
emailWorker.on("error", (err) => {
  console.error("Email worker error:", err);
});

subscriptionWorker.on("error", (err) => {
  console.error("Subscription worker error:", err);
});

// Start workers
emailWorker.run();
subscriptionWorker.run();

console.log("✅ Workers are running...");

// Handle shutdown
process.on("SIGTERM", async () => {
  await emailWorker.close();
  await subscriptionWorker.close();
  process.exit(0);
});
