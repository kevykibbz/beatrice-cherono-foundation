import { NextResponse } from "next/server";

export const UNAUTHORIZED = NextResponse.json({ error: "Unauthorized" },{ status: 401 });
export const FORBIDDEN = NextResponse.json({ error: "Forbidden" }, { status: 403 });
