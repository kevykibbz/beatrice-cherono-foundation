import { SiteSettings } from "@/types/types";

export const DEFAULT_KEYWORDS = [
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
].join(",");

export function getDefaultSiteSettings(): SiteSettings {
  return {
    siteName: "Beatrice Cherono Melly Foundation",
    description: "The Beatrice Cherono Melly Foundation is dedicated to improving lives through education, environmental conservation, healthcare, women empowerment, and community development.",
    keywords: DEFAULT_KEYWORDS,
    author: "Beatrice Cherono Melly Foundation",
    favicon: "/favicon/favicon.ico",
    siteImages: ["/images/site-image.jpg"],
    openGraph: {
      facebook: { url: "" },
      twitter: { url: "" },
      instagram: { url: "" },
      linkedin: { url: "" },
      tiktok: { url: "" },
      youtube: { url: "" }
    }
  };
}