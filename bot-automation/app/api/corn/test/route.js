// app/api/corn/test/route.js

export async function GET() {
  try {
    console.log("📤 Job added to queue");
    return new Response("Job added", { status: 200 });
  } catch (err) {
    console.error("❌ Failed to add job:", err);
    return new Response("Error", { status: 500 });
  }
}
