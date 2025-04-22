// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Cache connection globally
let cached = (global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
});

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 30000, // Increased to 30 seconds
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000, // Increased to 30 seconds
      family: 4, // Force IPv4 to avoid IPv6 issues
      maxPoolSize: 10,
      minPoolSize: 1,
      heartbeatFrequencyMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection failed:", err);
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
