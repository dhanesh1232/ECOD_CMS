// lib/server/queue/queues.js
import { Queue } from "bullmq";
import { redis } from "../redis.js";

export const testQueue = new Queue("testQueue", {
  connection: redis,
});
export const emailQueue = new Queue("emailQueue", { connection: redis });
export const SubscriptionQueue = new Queue("subscriptionQueue", {
  connection: redis,
});
