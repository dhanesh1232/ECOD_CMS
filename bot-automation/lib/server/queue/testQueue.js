import { Queue } from "bullmq";
import { redis } from "../redis.js";

export const testQueue = new Queue("testQueue", {
  connection: redis,
});
