import { z } from "zod";

export const siteContactDetailsFormSchema = z.object({
  contactEmail: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(6, "Phone number must be at least 6 characters"),
  address: z.string().min(5, "Address is too short").optional(),
  city: z.string().min(2, "City name is too short").optional(),
  country: z.string().min(2, "Country name is too short").optional(),
  postalCode: z.string().min(3, "Postal code is too short").optional(),
  mapEmbedUrl: z.string().url("Please enter a valid URL").optional(),
  businessHours: z.string().optional(),
});

export type SiteContactDetailsFormValues = z.infer<typeof siteContactDetailsFormSchema>;
