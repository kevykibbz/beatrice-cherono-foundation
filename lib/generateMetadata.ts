import { Metadata } from "next";
import { fetchSiteSettings } from "./api/siteSettings";

// Default Keywords
const keyWords: string[] = [
  "Beatrice Cherono Melly Foundation",
  "NGO Kenya",
  "Education for All",
  "Environmental Conservation",
  "Healthcare Initiatives",
  "Women Empowerment",
  "Community Development",
  "Poverty Relief",
  "Scholarship Fund",
  "Tree Planting",
  "Skill Enhancement",
  "Gender Equality",
  "Kenya NGOs",
  "Public Benefit Organization",
];

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await fetchSiteSettings();
    const baseURL =
      process.env.NODE_ENV === "production"
        ? new URL("https://www.beatricecheronomellyfoundation.org")
        : new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");

    // Extract open graph data for each platform
    const openGraph = siteSettings.openGraph || {};
    return {
      metadataBase: baseURL,
      title: siteSettings.siteName || "Beatrice Cherono Melly Foundation",
      icons: {
        icon: siteSettings.favicon || "/favicon/favicon.ico",
        shortcut: siteSettings.favicon || "/favicon/favicon.ico",
        apple: siteSettings.favicon || "/favicon/apple-touch-icon.png",
      },
      alternates: {
        canonical: baseURL.toString(),
      },
      description:
        siteSettings.description ||
        "The Beatrice Cherono Melly Foundation is dedicated to improving lives through education, environmental conservation, healthcare, women empowerment, and community development. Join us in creating a better future for underprivileged communities in Kenya.",
      keywords: siteSettings.keywords?.split(",") || keyWords,
      authors: [
        { name: siteSettings.author || "Beatrice Cherono Melly Foundation" },
      ],
      openGraph: {
        title: siteSettings.siteName || "Beatrice Cherono Melly Foundation",
        description:
          siteSettings.description ||
          "Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
        url: baseURL.toString(),
        siteName: siteSettings.siteName || "Beatrice Cherono Melly Foundation",
        images:
          siteSettings.siteImages?.length > 0
            ? siteSettings.siteImages.map((img) => ({
                url: img,
                width: 1200,
                height: 630,
                alt: "Beatrice Cherono Melly Foundation",
              }))
            : [
                {
                  url: "/images/site-image.jpg",
                  width: 1200,
                  height: 630,
                  alt: "Beatrice Cherono Melly Foundation",
                },
              ],
        locale: "en_US",
        type: "website",
      },
      // Add social media links as additional metadata
      other: {
        ...(openGraph.facebook && { "fb:profile_id": openGraph.facebook.url }),
        ...(openGraph.twitter && { "twitter:site": openGraph.twitter.url }),
        ...(openGraph.instagram && {
          "instagram:creator": openGraph.instagram.url,
        }),
        ...(openGraph.linkedin && {
          "linkedin:profile": openGraph.linkedin.url,
        }),
        ...(openGraph.tiktok && { "tiktok:creator": openGraph.tiktok.url }),
        ...(openGraph.youtube && { "youtube:channel": openGraph.youtube.url }),
      },
      twitter: {
        card: "summary_large_image",
        title: siteSettings.siteName || "Beatrice Cherono Melly Foundation",
        description:
          siteSettings.description ||
          "Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
        images: siteSettings.siteImages?.[0]
          ? [siteSettings.siteImages[0]]
          : ["/images/site-image.jpg"],
        ...(openGraph.twitter && { site: openGraph.twitter.url }),
      },
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {
      title: "Beatrice Cherono Melly Foundation",
      description:
        "The Beatrice Cherono Melly Foundation is dedicated to improving lives through education, environmental conservation, healthcare, women empowerment, and community development.",
      icons: {
        icon: "/favicon/favicon.ico",
      },
      alternates: {
        canonical: "https://beatricecheronofoundation.org",
      },
      keywords: [
        "Beatrice Cherono Melly Foundation",
        "NGO Kenya",
        "Education for All",
        "Environmental Conservation",
        "Healthcare Initiatives",
        "Women Empowerment",
        "Community Development",
        "Poverty Relief",
        "Scholarship Fund",
        "Tree Planting",
        "Skill Enhancement",
        "Gender Equality",
        "Kenya NGOs",
        "Public Benefit Organization",
      ],
      authors: [{ name: "Beatrice Cherono Melly Foundation" }],
      openGraph: {
        title: "Beatrice Cherono Melly Foundation",
        description:
          "Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
        url: "https://www.beatricecheronomellyfoundation.org",
        siteName: "Beatrice Cherono Melly Foundation",
        images: [
          {
            url: "/images/site-image.jpg",
            width: 1200,
            height: 630,
            alt: "Beatrice Cherono Melly Foundation",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Beatrice Cherono Melly Foundation",
        description:
          "Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
        images: ["/images/site-image.jpg"],
      },
    };
  }
}
