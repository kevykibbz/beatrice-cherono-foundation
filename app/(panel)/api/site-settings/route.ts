import { NextResponse } from "next/server";
import { FormValues, siteSettingsSchema } from "@/schemas/SiteSettings";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SocialPlatformData } from "@/types/types";

export async function POST(request: Request) {
  try {
    // Validate user authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
      include: { permissions: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if user has full permissions (manage permission)
    const hasManagePermission = user.permissions.some(
      (perm) => perm.action === "manage"
    );

    if (!hasManagePermission) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Validate request body
    const body: FormValues = await request.json();
    const validatedData = siteSettingsSchema.parse(body);

    // Create or update social platforms
    const createOrUpdateSocialPlatform = async (platformData: SocialPlatformData) => {
      if (!platformData) return null;
      
      const data = {
        url: platformData.url || null,
        cardImage: platformData.cardImage || null,
        description: platformData.description || null,
        images: platformData.images || [],
      };

      // Check if we should update existing or create new
      const existing = await prisma.socialPlatform.findFirst({
        where: { url: platformData.url }
      });

      if (existing) {
        return await prisma.socialPlatform.update({
          where: { id: existing.id },
          data
        });
      }
      return await prisma.socialPlatform.create({ data });
    };

    // Process all social platforms in parallel
    const [
      facebook,
      twitter,
      instagram,
      linkedin,
      tiktok,
      youtube
    ] = await Promise.all([
      createOrUpdateSocialPlatform(validatedData.openGraph?.facebook ?? { url: "", description: "", cardImage: "", images: [] }),
      createOrUpdateSocialPlatform(validatedData.openGraph?.twitter ?? { url: "", description: "", cardImage: "", images: [] }),
      createOrUpdateSocialPlatform(validatedData.openGraph?.instagram ?? { url: "", description: "", cardImage: "", images: [] }),
      createOrUpdateSocialPlatform(validatedData.openGraph?.linkedin ?? { url: "", description: "", cardImage: "", images: [] }),
      createOrUpdateSocialPlatform(validatedData.openGraph?.tiktok ?? { url: "", description: "", cardImage: "", images: [] }),
      createOrUpdateSocialPlatform(validatedData.openGraph?.youtube ?? { url: "", description: "", cardImage: "", images: [] }),
    ]);

    // Create or update OpenGraph
    const openGraphData = {
      facebook: facebook ? { connect: { id: facebook.id } } : undefined,
      twitter: twitter ? { connect: { id: twitter.id } } : undefined,
      instagram: instagram ? { connect: { id: instagram.id } } : undefined,
      linkedin: linkedin ? { connect: { id: linkedin.id } } : undefined,
      tiktok: tiktok ? { connect: { id: tiktok.id } } : undefined,
      youtube: youtube ? { connect: { id: youtube.id } } : undefined,
    };

    // Check if we should update existing settings or create new
    const existingSettings = await prisma.siteSettings.findFirst();

    const settings = existingSettings
      ? await prisma.siteSettings.update({
          where: { id: existingSettings.id },
          data: {
            siteName: validatedData.siteName,
            description: validatedData.description,
            keywords: validatedData.keywords.split(",").map(k => k.trim()),
            author: validatedData.author,
            favicon: validatedData.favicon,
            siteLogo: validatedData.siteLogo,
            siteImages: validatedData.siteImages,
            openGraph: {
              update: openGraphData
            }
          },
          include: {
            openGraph: {
              include: {
                facebook: true,
                twitter: true,
                instagram: true,
                linkedin: true,
                tiktok: true,
                youtube: true,
              }
            }
          }
        })
      : await prisma.siteSettings.create({
          data: {
            siteName: validatedData.siteName,
            description: validatedData.description,
            keywords: validatedData.keywords.split(",").map(k => k.trim()),
            author: validatedData.author,
            favicon: validatedData.favicon,
            siteLogo: validatedData.siteLogo,
            siteImages: validatedData.siteImages,
            openGraph: {
              create: openGraphData
            }
          },
          include: {
            openGraph: {
              include: {
                facebook: true,
                twitter: true,
                instagram: true,
                linkedin: true,
                tiktok: true,
                youtube: true,
              }
            }
          }
        });

    return NextResponse.json(settings);
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
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        openGraph: {
          include: {
            facebook: true,
            twitter: true,
            instagram: true,
            linkedin: true,
            tiktok: true,
            youtube: true,
          }
        }
      }
    });

    if (!settings) {
      return NextResponse.json(
        { error: "No site settings found" },
        { status: 404 }
      );
    }

    const responseData: FormValues = {
      siteName: settings.siteName,
      description: settings.description,
      keywords: settings.keywords.join(","),
      author: settings.author,
      favicon: settings.favicon || "",
      siteLogo: settings.siteLogo || "",
      siteImages: settings.siteImages,
      openGraph: settings.openGraph
        ? {
            facebook: settings.openGraph.facebook
              ? {
                  url: settings.openGraph.facebook.url || undefined,
                  description: settings.openGraph.facebook.description || undefined,
                  cardImage: settings.openGraph.facebook.cardImage || undefined,
                  images: settings.openGraph.facebook.images || undefined,
                }
              : undefined,
            twitter: settings.openGraph.twitter
              ? {
                  url: settings.openGraph.twitter.url || undefined,
                  description: settings.openGraph.twitter.description || undefined,
                  cardImage: settings.openGraph.twitter.cardImage || undefined,
                  images: settings.openGraph.twitter.images || undefined,
                }
              : undefined,
            instagram: settings.openGraph.instagram
              ? {
                  url: settings.openGraph.instagram.url || undefined,
                  description: settings.openGraph.instagram.description || undefined,
                  cardImage: settings.openGraph.instagram.cardImage || undefined,
                  images: settings.openGraph.instagram.images || undefined,
                }
              : undefined,
            linkedin: settings.openGraph.linkedin
              ? {
                  url: settings.openGraph.linkedin.url || undefined,
                  description: settings.openGraph.linkedin.description || undefined,
                  cardImage: settings.openGraph.linkedin.cardImage || undefined,
                  images: settings.openGraph.linkedin.images || undefined,
                }
              : undefined,
            tiktok: settings.openGraph.tiktok
              ? {
                  url: settings.openGraph.tiktok.url || undefined,
                  description: settings.openGraph.tiktok.description || undefined,
                  cardImage: settings.openGraph.tiktok.cardImage || undefined,
                  images: settings.openGraph.tiktok.images || undefined,
                }
              : undefined,
            youtube: settings.openGraph.youtube
              ? {
                  url: settings.openGraph.youtube.url || undefined,
                  description: settings.openGraph.youtube.description || undefined,
                  cardImage: settings.openGraph.youtube.cardImage || undefined,
                  images: settings.openGraph.youtube.images || undefined,
                }
              : undefined,
          }
        : undefined
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}