import rateLimit from "express-rate-limit";

export default function rateLimitConfig(options = {}) {
  return rateLimit({
    windowMs: options.interval || 15 * 60 * 1000, // default 15 minutes
    max: options.max || 100, // limit each IP to 100 requests per windowMs
    keyGenerator: (req) => req.headers["x-real-ip"] || req.ip,
    ...options,
  });
}
