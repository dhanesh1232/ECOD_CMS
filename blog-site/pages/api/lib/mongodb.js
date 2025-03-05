import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️  MONGODB_URI is not defined in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  console.log("���  Connecting to MongoDB...");

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {})
      .then((mongoose) => mongoose);
  }
  console.log("���  Connected to MongoDB!");

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
