import rateLimit from "express-rate-limit";

export default function createLimiter(config) {
  return rateLimit({
    windowMs: config.interval,
    max: config.maxRequests,
    keyGenerator: (req) => {
      return (
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress
      );
    },
    handler: (_, res) => {
      res.status(429).json({
        success: false,
        message: "Too many requests",
      });
    },
  });
}
