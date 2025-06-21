import { redis } from "../lib/server/redis.js";
import { Worker } from "bullmq";

const testWorker = new Worker(
  "testQueue",
  async (job) => {
    console.log("🎯 Job Received:", job.name);
    console.log("🧾 Data:", job.data);
    console.log("🚀 Message:", job.data.message || "Hey ECOD!");
  },
  {
    connection: redis,
  }
);

console.log("✅ Test Worker running...");
