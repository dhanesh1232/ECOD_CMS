// lib/client-info.js
export function getClientInfo(req) {
  return {
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"],
    referer: req.headers["referer"],
    acceptLanguage: req.headers["accept-language"],
    timestamp: new Date().toISOString(),
  };
}
