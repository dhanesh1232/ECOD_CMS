// lib/server/redis.js
import Redis from "ioredis";

let redis;

if (!global.redis) {
  global.redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    reconnectOnError: () => true,
  });

  redis = global.redis;

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err));
}

export { redis };
