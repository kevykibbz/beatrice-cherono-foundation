import { z } from "zod";



export const siteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  keywords: z.string(),
  author: z.string(),
  favicon: z.string().url("Must be a valid URL").optional(),
  siteLogo: z.string().url("Must be a valid URL").optional(),
  siteImages: z.array(z.string().url()).min(1, "At least one image is required"),
  openGraph: z.object({
    facebook: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage: z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
    twitter: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage:z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
    instagram: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage: z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
    linkedin: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage: z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
    tiktok: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage: z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
    youtube: z.object({
      url: z.string().url("Must be a valid URL").optional(),
      cardImage: z.string().url("Must be a valid URL").optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),
    }).optional(),
  }).optional(), 
  contactDetails: z.object({
    id: z.string(),
    contactEmail: z.string().email(),
    phoneNumber: z.string(),
    address: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    mapEmbedUrl: z.string().url().nullable().optional(),
    businessHours: z.string().nullable().optional(),
  }).optional()
});

export type FormValues = z.infer<typeof siteSettingsSchema>;