import { FormValues } from "@/schemas/SiteSettings";

export const fetchSiteSettings = async (): Promise<FormValues> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/site-settings`);
  if (!response.ok) throw new Error("Failed to fetch settings");
  return response.json();
};

export const createSiteSettings = async (data: FormValues): Promise<void> => {
  const response = await fetch("/api/site-settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok)
    throw new Error(responseData.error || "Failed to save settings");
};

export async function updateSiteSettings(data: FormValues): Promise<FormValues> {
  const response = await fetch('/api/site-settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update site settings');
  }

  return response.json();
}