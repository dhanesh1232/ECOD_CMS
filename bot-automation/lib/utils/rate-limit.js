// utils/rate-limit.js
import { RateLimiterMemory } from "rate-limiter-flexible";

export default function rateLimit(options) {
  const rateLimiter = new RateLimiterMemory({
    points: options.points || 5,
    duration: options.interval || 60 * 60, // 1 hour by default
  });

  return {
    check: async (req, points, key) => {
      const ip = req.headers.get("x-forwarded-for") || req.ip;
      const rateLimiterKey = `${key}_${ip}`;

      try {
        await rateLimiter.consume(rateLimiterKey, points);
        return true;
      } catch (err) {
        throw new Error("Rate limit exceeded");
      }
    },
  };
}
