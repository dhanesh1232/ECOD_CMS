// server.js - Custom server for Railway
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

// Start both Next.js server and workers
app.prepare().then(() => {
  // HTTP Server
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);

    // Start worker if not in production (or adjust as needed)
    if (!dev) {
      require("./worker/testWorker.js");
      require("./scripts/cronRunner.js");
    }
  });
});
