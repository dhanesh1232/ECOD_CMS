import { testQueue } from "../queue/queues.js";

export async function scheduleHeyECODJob() {
  await testQueue.add(
    "repeat-log",
    { message: "Hey ECOD from a scheduled BullMQ job!" },
    {
      repeat: { cron: "* * * * *" }, // every minute
      removeOnComplete: true,
    }
  );
}
