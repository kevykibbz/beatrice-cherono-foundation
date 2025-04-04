"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormValues } from "@/schemas/SiteSettings";
import { fetchSiteSettings, updateSiteSettings } from "@/lib/api/siteSettings";

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormValues) => {
      try {
        // First fetch current settings to ensure we're updating existing ones
        const currentSettings = await fetchSiteSettings();
        if (!currentSettings) {
          throw new Error("No site settings found to update");
        }

        return await updateSiteSettings(data);
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Failed to update settings"
        );
      }
    },
    onMutate: async (newData) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["site-settings"] });

      // Snapshot the previous value
      const previousSettings = queryClient.getQueryData<FormValues>([
        "site-settings",
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["site-settings"],
        (old: FormValues | undefined) => {
          return old ? { ...old, ...newData } : newData;
        }
      );

      // Return a context object with the snapshotted value
      return { previousSettings };
    },
    onSuccess: () => {
      toast.success("Site settings updated successfully!");
    },
    onError: (error: Error, _variables, context) => {
      // Rollback to previous settings if error occurs
      if (context?.previousSettings) {
        queryClient.setQueryData(["site-settings"], context.previousSettings);
      }
      toast.error(`Failed to update settings: ${error.message}`);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}
