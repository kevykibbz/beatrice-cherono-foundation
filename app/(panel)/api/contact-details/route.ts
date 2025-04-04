import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const CACHE_KEY = "contact:details";
const CACHE_TTL = 300; // 5 minutes


const FORBIDDEN = NextResponse.json(
  { error: "Forbidden - Admin access required" },
  { status: 403 }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function requireAdmin(session: any) {
  if (!session?.user) return false;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === "admin";
}

export async function GET() {
  try {
    // Check cache first
    const cached = await redis.get(CACHE_KEY);
    if (cached) return NextResponse.json(JSON.parse(cached));

    // Fetch from database
    const contactDetails = await prisma.contactDetails.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (!contactDetails) {
      return NextResponse.json(
        { error: "No contact details found" },
        { status: 404 }
      );
    }

    // Cache the result
    await redis.set(CACHE_KEY, JSON.stringify(contactDetails), "EX", CACHE_TTL);

    return NextResponse.json(contactDetails);
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact details" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication and admin role
    const isAdmin = await requireAdmin(session);
    if (!isAdmin) return FORBIDDEN;

    const body = await req.json();

    // Validate required fields
    if (!body.contactEmail || !body.phoneNumber) {
      return NextResponse.json(
        { error: "Contact email and phone number are required" },
        { status: 400 }
      );
    }

    // Create contact details
    const result = await prisma.$transaction(async (tx) => {
      const contactDetails = await tx.contactDetails.create({
        data: body,
      });

      // Log activity
      await tx.activity.create({
        data: {
          userId: session?.user.id ?? "",
          action: "CONTACT_DETAILS_CREATE",
          details: "Created contact details",
          metadata: {
            createdFields: Object.keys(body).filter((key) => body[key]),
            contactDetailsId: contactDetails.id,
          },
        },
      });

      return contactDetails;
    });

    // Invalidate cache
    await redis.del(CACHE_KEY);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating contact details:", error);
    return NextResponse.json(
      { error: "Failed to create contact details" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication and admin role
    const isAdmin = await requireAdmin(session);
    if (!isAdmin) return FORBIDDEN;

    const body = await req.json();
    const existing = await prisma.contactDetails.findFirst();

    if (!existing) {
      return NextResponse.json(
        { error: "No contact details found to update" },
        { status: 404 }
      );
    }

    // Validate at least one field is being updated
    const changes = Object.keys(body).filter((key) => {
      return (
        key in existing &&
        body[key as keyof typeof body] !==
          existing[key as keyof typeof existing]
      );
    });
    if (changes.length === 0) {
      return NextResponse.json(
        { error: "No changes detected" },
        { status: 400 }
      );
    }

    // Update contact details
    const result = await prisma.$transaction(async (tx) => {
      const contactDetails = await tx.contactDetails.update({
        where: { id: existing.id },
        data: body,
      });

      // Log activity
      await tx.activity.create({
        data: {
          userId: session?.user.id ?? "",
          action: "CONTACT_DETAILS_UPDATE",
          details: "Updated contact details",
          metadata: {
            changedFields: changes,
            contactDetailsId: contactDetails.id,
            oldValues: changes.reduce((acc, key) => {
              acc[key] = existing[key as keyof typeof existing];
              return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, {} as Record<string, any>),
            newValues: changes.reduce((acc, key) => {
              acc[key] = body[key];
              return acc;
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, {} as Record<string, any>),
          },
        },
      });

      return contactDetails;
    });

    // Invalidate cache
    await redis.del(CACHE_KEY);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contact details:", error);
    return NextResponse.json(
      { error: "Failed to update contact details" },
      { status: 500 }
    );
  }
}
