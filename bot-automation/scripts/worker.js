import { Worker } from "bullmq";
import { redis } from "../lib/server/redis.js";
import { handleEmailJob } from "./tasks/tasks.js";
import { handleSubscriptionJob } from "./tasks/tasks.js";

// Process email jobs
new Worker("emailQueue", handleEmailJob, { connection: redis });

// Process subscription jobs
new Worker("subscriptionQueue", handleSubscriptionJob, { connection: redis });

console.log("✅ Workers are running...");
