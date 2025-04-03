import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ImageIcon, TrashIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Step2ImagesProps } from "@/types/types";

export default function Step2Images({
  form,
  handleImageUpload,
}: Step2ImagesProps) {
  const [isUploading, setIsUploading] = useState(false);

  const enhancedHandleImageUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      await handleImageUpload(files);
    } finally {
      setIsUploading(false);
    }
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
            <ImageIcon className="h-5 w-5" />
            Site Images (Max 5)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              form.watch("siteImages")?.length >= 5
                ? "cursor-not-allowed opacity-50 bg-muted"
                : "hover:border-purple-500 cursor-pointer"
            } ${isUploading ? "bg-gray-50" : ""}`}
            onDragOver={(e) => {
              if (form.watch("siteImages")?.length >= 5 || isUploading) return;
              e.preventDefault();
              e.currentTarget.classList.add("border-primary", "bg-primary/10");
            }}
            onDragLeave={(e) => {
              if (form.watch("siteImages")?.length >= 5 || isUploading) return;
              e.preventDefault();
              e.currentTarget.classList.remove(
                "border-primary",
                "bg-primary/10"
              );
            }}
            onDrop={async (e) => {
              if (form.watch("siteImages")?.length >= 5 || isUploading) return;
              e.preventDefault();
              e.currentTarget.classList.remove(
                "border-primary",
                "bg-primary/10"
              );
              const files = Array.from(e.dataTransfer.files);
              await enhancedHandleImageUpload(files);
            }}
            onClick={() => {
              if (form.watch("siteImages")?.length < 5 && !isUploading) {
                document.getElementById("site-images-upload")?.click();
              }
            }}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Uploading images...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <ImageIcon className="h-10 w-10 text-muted-foreground cursor-pointer" />
                <p className="text-sm text-muted-foreground">
                  {form.watch("siteImages")?.length >= 5 ? (
                    "Maximum 5 images reached"
                  ) : (
                    <>
                      Drag & drop images here or{" "}
                      <span className="text-purple-500 cursor-pointer">
                        click to browse
                      </span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, SVG (Max 5MB each, up to 5 images)
                </p>
              </div>
            )}
            <input
              id="site-images-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              disabled={form.watch("siteImages")?.length >= 5 || isUploading}
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                await enhancedHandleImageUpload(files);
              }}
            />
          </div>

          {/* Image previews */}
          {form.watch("siteImages")?.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {form.watch("siteImages").map((url, index) => (
                <div
                  key={url}
                  className="relative group border-1 border-purple-500 rounded-lg"
                >
                  <Image
                    src={url}
                    alt={`Site image ${index}`}
                    width={32}
                    height={32}
                    className="h-32 w-full object-cover rounded border"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="cursor-pointer absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const currentImages = form.getValues("siteImages") || [];
                      form.setValue(
                        "siteImages",
                        currentImages.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
