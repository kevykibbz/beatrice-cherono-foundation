import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define the type for our mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Type for our extended global
interface CustomGlobal {
  mongoose: MongooseCache;
}

// Initialize the cache with proper type assertion
const globalWithMongoose = global as unknown as CustomGlobal;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
  cached = globalWithMongoose.mongoose;
}

async function connectToDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDB;
