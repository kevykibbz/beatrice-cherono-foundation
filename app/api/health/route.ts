import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";

export async function GET() {
  try {
    // Attempt to connect to database
    const connection = await connectToDB();

    // Verify connection and database are available
    if (
      !connection ||
      !connection.connection ||
      !connection.connection.db ||
      !connection.connection.db.admin
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database connection not fully established",
        },
        { status: 503 }
      );
    }

    // Check connection status
    const isConnected = connection.connection.readyState === 1;

    if (!isConnected) {
      return NextResponse.json(
        { status: "error", message: "Database connection not active" },
        { status: 503 }
      );
    }

    // Test the connection with a ping
    const pingResult = await connection.connection.db.admin().ping();

    return NextResponse.json(
      {
        status: "ok",
        message: "Database connection healthy",
        ping: pingResult,
        details: {
          dbName: connection.connection.name,
          dbHost: connection.connection.host,
          dbPort: connection.connection.port,
          readyState: connection.connection.readyState,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
