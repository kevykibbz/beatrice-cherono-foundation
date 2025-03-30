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

interface DBHealthDetails {
  dbName?: string;
  readyState?: number;
  dbHost?: string;
  dbPort?: number;
}

interface DBHealthResponse {
  isHealthy: boolean;
  details?: DBHealthDetails;
  error?: string;
}

async function connectToDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Verify the existing connection is still alive
    if (cached.conn.connection.readyState === 1) {
      try {
        if (cached.conn.connection.db) {
          await cached.conn.connection.db.admin().ping();
          return cached.conn;
        }
      } catch {
        // If ping fails, clear cache and reconnect
        cached.conn = null;
      }
    }
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn.connection.db) {
      await cached.conn.connection.db.admin().ping();
    }
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export async function checkDBHealth(): Promise<DBHealthResponse> {
  try {
    const conn = await connectToDB();
    if (!conn.connection.db) {
      return { isHealthy: false, error: "Database not initialized" };
    }
    await conn.connection.db.admin().ping();
    return {
      isHealthy: true,
      details: {
        dbName: conn.connection.name,
        readyState: conn.connection.readyState,
        dbHost: conn.connection.host,
        dbPort: conn.connection.port,
      },
    };
  } catch (error) {
    return {
      isHealthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default connectToDB;