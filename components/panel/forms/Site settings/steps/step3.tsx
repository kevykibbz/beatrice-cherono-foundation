import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2, ImageIcon, CheckIcon } from "lucide-react";
import { FormValues } from "@/schemas/SiteSettings";
import { ChangeEvent, useState, useRef } from "react";
import { Step3SocialMediaProps } from "@/types/types";
import { uploadFaviconWithBgRemoval, uploadImage } from "@/lib/cloudinary";
import { Textarea } from "@/components/ui/textarea";

export default function Step3SocialMedia({
  form,
  platforms,
}: Step3SocialMediaProps) {
  const [uploadingPlatform, setUploadingPlatform] = useState<string | null>(
    null
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const formRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    platformValue: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPlatform(platformValue);
      let url: string = "";

      if (
        file.type === "image/icon" ||
        file.type === "image/vnd.microsoft.icon"
      ) {
        url = await uploadFaviconWithBgRemoval(file);
      } else {
        url = await uploadImage(file);
      }

      const cleanUrl = url.split("?")[0];
      form.setValue(
        `openGraph.${platformValue}.cardImage` as keyof FormValues,
        cleanUrl
      );
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingPlatform(null);
    }
  };




  const togglePlatform = (platformValue: string) => {
    setSelectedPlatforms((prev) => {
      const newSelected = prev.includes(platformValue)
        ? prev.filter((p) => p !== platformValue)
        : [...prev, platformValue];

        if (!prev.includes(platformValue)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setValue(`openGraph.${platformValue}` as any , {
            url: undefined,
            cardImage: undefined,
            description: undefined,
            images: undefined
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setValue(`openGraph.${platformValue}` as any, undefined);
        }

      return newSelected;
    });
  };

  // Handle clicks only on non-interactive elements
  const handleCardClick = (e: React.MouseEvent, platformValue: string) => {
    // Check if the click was on an interactive element
    const interactiveElements = ["INPUT", "BUTTON", "A", "TEXTAREA", "SELECT"];
    if (
      e.target instanceof Element &&
      interactiveElements.includes(e.target.tagName)
    ) {
      return;
    }
    togglePlatform(platformValue);
  };

  const hasPlatformErrors = (platformValue: string) => {
    const openGraphErrors = form.formState.errors.openGraph as
      | Record<
          string,
          {
            url?: { message?: string };
            cardImage?: { message?: string };
            description?: { message?: string };
            images?: { message?: string } | Array<{ message?: string }>;
          }
        >
      | undefined;

    // Get errors for the specific platform
    const platformErrors = openGraphErrors?.[platformValue];

    // Check if either url or cardImage has errors
    return !!platformErrors?.url || !!platformErrors?.cardImage;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Social Media Profiles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 cursor-pointer">
          {platforms.map((platform, index) => (
            <div
              key={platform.value}
              ref={(el) => {
                formRefs.current[index] = el;
              }}
              className={`relative ${
                selectedPlatforms.includes(platform.value)
                  ? "ring-2 ring-purple-500 rounded-lg"
                  : ""
              } ${
                hasPlatformErrors(platform.value)
                  ? "border-2 border-red-500 rounded-lg"
                  : ""
              }`}
            >
              {selectedPlatforms.includes(platform.value) && (
                <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1">
                  <CheckIcon className="h-3 w-3 text-white" />
                </div>
              )}
              <div
                className={`border border-gray-200 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                  selectedPlatforms.includes(platform.value)
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
                onClick={(e) => handleCardClick(e, platform.value)}
              >
                <div className="flex items-center gap-3 mb-4 cursor-pointer">
                  <platform.Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {platform.label}
                  </h3>
                </div>

                {selectedPlatforms.includes(platform.value) && (
                  <div
                    className="space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FormField
                      control={form.control}
                      name={
                        `openGraph.${platform.value}.url` as keyof FormValues
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            {platform.label} URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={platform.placeholder}
                              value={field.value as string}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={
                        `openGraph.${platform.value}.description` as keyof FormValues
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            {platform.label} Description
                          </FormLabel>
                          <FormControl>
                            <div
                              className="flex gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Textarea
                                placeholder="Enter description here"
                                value={field.value as string}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={
                        `openGraph.${platform.value}.cardImage` as keyof FormValues
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            {platform.label} Card Image
                          </FormLabel>
                          <FormControl>
                            <div
                              className="flex gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Input
                                placeholder="https://example.com/image.jpg"
                                value={field.value as string}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <input
                                type="file"
                                id={`${platform.value}-image-upload`}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, platform.value)
                                }
                              />
                              <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  document
                                    .getElementById(
                                      `${platform.value}-image-upload`
                                    )
                                    ?.click();
                                }}
                                disabled={uploadingPlatform === platform.value}
                              >
                                {uploadingPlatform === platform.value ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ImageIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          {field.value && (
                            <div className="mt-3">
                              <div className="relative h-40 w-full max-w-xs mx-auto">
                                {" "}
                                <Image
                                  src={field.value as string}
                                  alt={`${platform.label} card preview`}
                                  fill
                                  className="object-contain border border-gray-200 dark:border-gray-700 rounded-lg"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          )}
                          <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
