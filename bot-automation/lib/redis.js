// lib/redis.ts
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_API_URL,
  token: process.env.UPSTASH_REDIS_API_TOKEN,
});
