import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose || {};

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI)
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_NAME || "design-io",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
