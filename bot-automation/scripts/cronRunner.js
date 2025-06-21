// Scripts/cronRunner.js
const { emailQueue, SubscriptionQueue } = required(
  "../lib/server/queue/queues.js"
);

(async () => {
  // Schedule an email to be sent now
  await emailQueue.add("welcome-email", {
    to: "user@example.com",
    subject: "Welcome to ECOD!",
    html: "<h1>Hello from ECOD!</h1>",
  });

  // Schedule subscription check every 5 mins
  await SubscriptionQueue.add(
    "check-subscription",
    { userId: "123", action: "check" },
    { repeat: { cron: "*/5 * * * *" }, removeOnComplete: true }
  );

  console.log("🗓️ Jobs have been scheduled!");
  console.log("🗓️ Scheduled repeating job for ECOD!");
})();
