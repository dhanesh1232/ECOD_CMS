import { scheduleHeyECODJob } from "../lib/server/scheduler/initiateJob.js";

(async () => {
  await scheduleHeyECODJob();
  console.log("🗓️ Scheduled repeating job for ECOD!");
})();
