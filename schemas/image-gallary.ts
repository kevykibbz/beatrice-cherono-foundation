import { z } from "zod";

export const imageGallarySchema = z.object({
  categoryId: z.string().min(1, "Category  is required"),
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters")
    .max(50, "Caption cannot exceed 50 characters")
    .optional(),
  url: z.string().url("Must be a valid URL"),
});

export type GallaryImagesFormValues = z.infer<typeof imageGallarySchema>;
