import { z } from "zod";
export const categorySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const imageSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters")
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
