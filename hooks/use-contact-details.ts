import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SiteContactDetailsFormValues } from "@/schemas/SiteContactDetailsForm";

export function useContactDetails() {
  const queryClient = useQueryClient();

  const { data: contactDetails, isLoading } = useQuery({
    queryKey: ["contact-details"],
    queryFn: async () => {
      const response = await fetch("/api/contact-details");
      if (!response.ok) throw new Error("Failed to fetch contact details");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createMutation = useMutation({
    mutationFn: async (data: SiteContactDetailsFormValues) => {
      const response = await fetch("/api/contact-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.error || "Failed to create contact details");
        throw new Error(
          responseData.error || "Failed to create contact details"
        );
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Contact details created successfully!");
      queryClient.invalidateQueries({ queryKey: ["contact-details"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create contact details: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: SiteContactDetailsFormValues) => {
      const response = await fetch("/api/contact-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.error || "Failed to update contact details");
        throw new Error(
          responseData.error || "Failed to update contact details"
        );
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Contact details updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["contact-details"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update contact details: ${error.message}`);
    },
  });

  return {
    contactDetails,
    isLoading,
    createMutation,
    updateMutation,
  };
}
