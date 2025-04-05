import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/schemas/SiteSettings";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Loader2,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { uploadFaviconWithBgRemoval, uploadImage } from "@/lib/cloudinary";
import { Step1BasicInfo, Step2Images } from "./steps";
import Step3SocialMedia from "./steps/step3";
import { platforms } from "./socialLinks";
import {
  fetchSiteSettings,
  createSiteSettings,
  updateSiteSettings,
} from "@/hooks/site-settings";

export default function SiteSettingsForm() {
  const [step, setStep] = useState<number>(1);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLogoUploading, setIsLogoUploading] = useState<boolean>(false);
  const hasInitialized = useRef<boolean>(false);
  const queryClient = useQueryClient();
  const form = useFormContext<FormValues>();

  // Fetch existing site settings
  const {
    data: existingSettings,
    isSuccess,
  } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      try {
        return await fetchSiteSettings();
      } catch (err) {
        toast.error("Failed to load site settings");
        throw err;
      }
    },
  });

  useEffect(() => {
    if (isSuccess && existingSettings && !hasInitialized.current) {
      // Only reset if we have data and haven't initialized yet
      const currentValues = form.getValues();

      // Check if form is empty or different from existing settings
      if (
        !currentValues.siteName ||
        JSON.stringify(currentValues) !==
          JSON.stringify({
            siteName: existingSettings.siteName,
            description: existingSettings.description,
            keywords: Array.isArray(existingSettings.keywords)
              ? existingSettings.keywords.join(",")
              : existingSettings.keywords,
            author: existingSettings.author,
            favicon: existingSettings.favicon,
            siteLogo: existingSettings.siteLogo,
            siteImages: existingSettings.siteImages,
            openGraph: existingSettings.openGraph,
          })
      ) {
        form.reset({
          siteName: existingSettings.siteName,
          description: existingSettings.description,
          keywords: Array.isArray(existingSettings.keywords)
            ? existingSettings.keywords.join(",")
            : existingSettings.keywords,
          author: existingSettings.author,
          favicon: existingSettings.favicon,
          siteLogo: existingSettings.siteLogo,
          siteImages: existingSettings.siteImages,
          openGraph: existingSettings.openGraph,
        });
        hasInitialized.current = true;
      }
    }
  }, [isSuccess, existingSettings, form]);

  // Mutation for submitting site settings
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // First check if settings exist to determine create vs update
      const currentSettings = await queryClient.getQueryData(["site-settings"]);
      return currentSettings
        ? updateSiteSettings(data)
        : createSiteSettings(data);
    },
    onMutate: async (newData) => {
      toast.loading(
        existingSettings
          ? "Updating site settings..."
          : "Creating site settings...",
        { id: "save-settings" }
      );

      // Optimistic update
      const previousSettings = queryClient.getQueryData(["site-settings"]);
      queryClient.setQueryData(
        ["site-settings"],
        (old: FormValues | undefined) => {
          return old ? { ...old, ...newData } : newData;
        }
      );
      return { previousSettings };
    },
    onSuccess: () => {
      toast.success(
        existingSettings
          ? "Site settings updated successfully!"
          : "Site settings created successfully!",
        { id: "save-settings" }
      );
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error, _variables, context) => {
      toast.error(
        existingSettings
          ? `Failed to update settings: ${error.message}`
          : `Failed to create settings: ${error.message}`,
        { id: "save-settings" }
      );

      // Rollback optimistic update
      if (context?.previousSettings) {
        queryClient.setQueryData(["site-settings"], context.previousSettings);
      }
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/x-icon",
      "image/vnd.microsoft.icon",
    ];

    if (!validTypes.includes(file.type)) {
      form.setError("favicon", {
        type: "manual",
        message: "Only PNG, JPG, SVG or ICO files are allowed",
      });
      return;
    }

    if (file.size > 102400) {
      form.setError("favicon", {
        type: "manual",
        message: "Favicon must be less than 100KB",
      });
      return;
    }

    try {
      setIsUploading(true);
      form.clearErrors("favicon");
      toast.loading("Uploading favicon...", { id: "favicon-upload" });
      form.setValue("favicon", "Uploading...");

      let url;
      if (file.type === "image/x-icon") {
        url = await uploadFaviconWithBgRemoval(file);
      } else {
        url = await uploadImage(file, "site-settings/favicons");
      }

      form.setValue("favicon", url);
      toast.success("Favicon uploaded successfully!", { id: "favicon-upload" });
    } catch (error) {
      console.log("Error uploading favicon:", error);
      form.setValue("favicon", "");
      form.setError("favicon", {
        type: "manual",
        message: "Failed to upload favicon",
      });
      toast.error("Failed to upload favicon", { id: "favicon-upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (files: File[]) => {
    const currentImages = form.getValues("siteImages") || [];

    if (currentImages.length + files.length > 5) {
      form.setError("siteImages", {
        type: "manual",
        message: "You can only upload up to 5 images total",
      });
      return;
    }

    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      form.setError("siteImages", {
        type: "manual",
        message: "Please upload valid image files (max 5MB each)",
      });
      return;
    }

    const remainingSlots = 5 - currentImages.length;
    const filesToUpload = validFiles.slice(0, remainingSlots);

    try {
      setIsUploading(true);
      toast.loading(`Uploading ${filesToUpload.length} image(s)...`, {
        id: "site-images-upload",
      });

      const newImageUrls = await Promise.all(
        filesToUpload.map((file) =>
          uploadImage(file, "site-settings/logos", true)
        )
      );

      form.setValue("siteImages", [...currentImages, ...newImageUrls]);
      form.clearErrors("siteImages");
      toast.success(`Uploaded ${filesToUpload.length} image(s) successfully!`, {
        id: "site-images-upload",
      });
    } catch (error) {
      console.log("Error uploading images:", error);
      form.setError("siteImages", {
        type: "manual",
        message: "Failed to upload some images",
      });
      toast.error("Failed to upload images", { id: "site-images-upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/jpg",
    ];

    if (!validTypes.includes(file.type)) {
      form.setError("siteLogo", {
        type: "manual",
        message: "Only PNG, JPG, or SVG files are allowed",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      form.setError("siteLogo", {
        type: "manual",
        message: "Logo must be less than 2MB",
      });
      return;
    }

    try {
      setIsLogoUploading(true);
      form.clearErrors("siteLogo");
      toast.loading("Uploading logo...", { id: "logo-upload" });
      form.setValue("siteLogo", "Uploading...");

      const url = await uploadImage(file, "site-settings/logos"); // Upload to logos folder

      form.setValue("siteLogo", url);
      toast.success("Logo uploaded successfully!", { id: "logo-upload" });
    } catch (error) {
      console.log("Error uploading logo:", error);
      form.setValue("siteLogo", "");
      form.setError("siteLogo", {
        type: "manual",
        message: "Failed to upload logo",
      });
      toast.error("Failed to upload logo", { id: "logo-upload" });
    } finally {
      setIsLogoUploading(false);
    }
  };

  const hasStepErrors = (step: number) => {
    const errors = form.formState.errors;
    const values = form.getValues();

    switch (step) {
      case 1: // Basic Info
        const hasEmptyFields =
          !values.siteName ||
          !values.description ||
          !values.keywords ||
          !values.author ||
          !values.favicon;

        const hasValidationErrors =
          !!errors.siteName ||
          !!errors.description ||
          !!errors.keywords ||
          !!errors.author ||
          !!errors.favicon;

        return hasEmptyFields || hasValidationErrors;

      case 2: // Images
        return !values.siteImages?.length || !!errors.siteImages;

      case 3: // Social Media
        if (!values.openGraph) return true;

        return Object.entries(values.openGraph).some(([platform, data]) => {
          if (!data || typeof data === "string") return false;

          type PlatformData = {
            url?: string;
            cardImage?: string;
            description?: string;
            images?: string[];
          };

          type PlatformErrors = {
            url?: { message?: string };
            cardImage?: { message?: string };
          };

          const platformData = data as PlatformData;
          const platformErrors = (
            errors.openGraph as Record<string, PlatformErrors>
          )?.[platform];

          return (
            !platformData.url ||
            (["facebook", "twitter"].includes(platform) &&
              !platformData.cardImage) ||
            !!platformErrors?.url ||
            !!platformErrors?.cardImage
          );
        });

      default:
        return false;
    }
  };

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {mutation.isPending && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium text-foreground">
            {existingSettings
              ? "Updating your settings..."
              : "Creating new settings..."}
          </p>
          <p className="text-sm text-muted-foreground">
            Please don&apos;t close this window
          </p>
        </div>
      )}

      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        className="space-y-8 max-h-[400px] overflow-y-auto"
      >
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Step1BasicInfo
            form={form}
            isUploading={isUploading}
            isLogoUploading={isLogoUploading}
            handleFileUpload={handleFileUpload}
            handleLogoUpload={handleLogoUpload}
          />
        )}

        {/* Step 2: Images */}
        {step === 2 && (
          <Step2Images form={form} handleImageUpload={handleImageUpload} />
        )}
        {/* Step 3: Social Media */}
        {step === 3 && <Step3SocialMedia form={form} platforms={platforms} />}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-2 py-2 cursor-pointer"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button
              className="rounded-full px-2 py-2 cursor-pointer mr-2"
              type="button" // Ensure this is button, not submit
              disabled={hasStepErrors(step) || isUploading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setStep(step + 1);
              }}
            >
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={mutation.isPending || isUploading}
              className="rounded-full px-2 py-2 cursor-pointer mr-2"
            >
              <CheckIcon className="h-4 w-4 mr-2" />
              {mutation.isPending
                ? "Saving..."
                : existingSettings
                ? "Update Settings"
                : "Create Settings"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
