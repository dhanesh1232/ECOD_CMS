// lib/utils/withIdempotency.js

export async function withIdempotency(idempotencyKey, model, createFn) {
  if (!idempotencyKey) {
    throw new Error("Missing idempotencyKey");
  }

  const exists = await model.findOne({ idempotencyKey });
  if (exists) {
    return { alreadyProcessed: true, data: exists };
  }

  const data = await createFn();

  // Optionally: log that this key was used
  return { alreadyProcessed: false, data };
}
