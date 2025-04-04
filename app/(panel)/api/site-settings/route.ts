import { NextResponse } from "next/server";
import { FormValues, siteSettingsSchema } from "@/schemas/SiteSettings";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";

// Cache key and TTL
const CACHE_KEY = "site:settings";
const CACHE_TTL = 300; // 5 minutes in seconds

// Common error responses
const UNAUTHORIZED = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
const FORBIDDEN = NextResponse.json({ error: "Forbidden" }, { status: 403 });

export async function POST(request: Request) {
  try {
    // Authentication and authorization checks
    const session = await getServerSession(authOptions);
    if (!session?.user) return UNAUTHORIZED;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
      select: {
        id: true,
        role: true,
        permissions: { where: { action: "manage" } },
      },
    });

    if (!user || user.role !== "admin" || user.permissions.length === 0) {
      return FORBIDDEN;
    }

    // Validate request body
    const body: FormValues = await request.json();
    const validatedData = siteSettingsSchema.parse(body);

    // Transaction for all database operations
    const result = await prisma.$transaction(
      async (tx) => {
        const existingSettings = await tx.siteSettings.findFirst({
          include: { openGraph: true },
        });

        const settingsData = {
          /* ... */
        };

        // Parallelize platform operations
        const platformPromises = Object.entries(
          validatedData.openGraph ?? {}
        ).map(([platformName, platformData]) => ({
          platform: platformName,
          title: validatedData.siteName,
          url: platformData.url,
          cardImage: platformData.cardImage,
          description: platformData.description,
          images: platformData.images || [],
        }));

        if (existingSettings) {
          // Batch delete existing platforms
          await tx.socialPlatform.deleteMany({
            where: { siteSettingsId: existingSettings.id },
          });

          // Batch create new platforms
          const socialPlatforms = await Promise.all(
            platformPromises.map((data) =>
              tx.socialPlatform.create({
                data: {
                  ...data,
                  siteSettings: { connect: { id: existingSettings.id } },
                },
              })
            )
          );

          const settings = await tx.siteSettings.update({
            where: { id: existingSettings.id },
            data: settingsData,
          });

          // Simplified activity log
          await tx.activity.create({
            data: {
              userId: user.id,
              action: "SITE_SETTINGS_UPDATE",
              details: `Updated site settings`,
              metadata: { settingsId: settings.id },
            },
          });

          return { ...settings, openGraph: socialPlatforms };
        } else {
          const settings = await tx.siteSettings.create({
            data: {
              siteName: validatedData.siteName,
              description: validatedData.description,
              author: validatedData.author,
              ...settingsData,
              openGraph: { create: platformPromises },
            },
            include: { openGraph: true },
          });

          await tx.activity.create({
            data: {
              userId: user.id,
              action: "SITE_SETTINGS_CREATE",
              details: `Created new site settings`,
              metadata: { settingsId: settings.id },
            },
          });

          return settings;
        }
      },
      {
        maxWait: 10000,
        timeout: 10000,
      }
    );

    await redis.del(CACHE_KEY);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving site settings:", error);
    return NextResponse.json(
      { error: "Failed to save site settings" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check Redis cache first
    const cachedSettings = await redis.get(CACHE_KEY);
    if (cachedSettings) {
      return NextResponse.json(JSON.parse(cachedSettings));
    }

    // Fetch with optimized query
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        openGraph: {
          select: {
            id: true,
            platform: true,
            url: true,
            description: true,
            cardImage: true,
            images: true,
            title: true,
          },
        },
      },
    });

    if (!settings) {
      return NextResponse.json(
        { error: "No site settings found" },
        { status: 404 }
      );
    }

    // Transform the openGraph array into the expected object format
    const openGraph = settings.openGraph.reduce((acc, platform) => {
      acc[platform.platform] = {
        url: platform.url || undefined,
        description: platform.description || undefined,
        cardImage: platform.cardImage || undefined,
        images: platform.images || undefined,
        title: platform.title || undefined,
      };
      return acc;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Record<string, any>);

    // Transform data
    const responseData: FormValues = {
      siteName: settings.siteName,
      description: settings.description,
      keywords: settings.keywords.join(","),
      author: settings.author,
      favicon: settings.favicon || "",
      siteLogo: settings.siteLogo || "",
      siteImages: settings.siteImages,
      openGraph: Object.keys(openGraph).length > 0 ? openGraph : undefined,
    };

    // Cache the response in Redis
    await redis.set(CACHE_KEY, JSON.stringify(responseData), "EX", CACHE_TTL);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}
