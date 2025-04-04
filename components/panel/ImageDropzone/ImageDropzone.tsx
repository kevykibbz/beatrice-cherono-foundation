"use client";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { deleteImage, extractPublicId, uploadImage } from "@/lib/cloudinary";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ImageDropzone({
  value,
  onChange,
  folder,
  onUploadStatusChange,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  onUploadStatusChange: (isUploading: boolean) => void;
}) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const setUploadStatus = useCallback(
    (uploading: boolean) => {
      setIsUploading(uploading);
      onUploadStatusChange?.(uploading);
    },
    [onUploadStatusChange]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file size (example: 10MB max)
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_SIZE) {
        toast.error("File too large (max 5MB)");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type");
        return;
      }

      const toastId = toast.loading("Uploading image...");

      try {
        setUploadStatus(true);
        const url = await uploadImage(file, folder);
        onChange(url);
        toast.success("Image uploaded successfully!", {
          id: toastId,
        });
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to upload image",
          {
            id: toastId,
          }
        );
      } finally {
        setUploadStatus(false);
      }
    },
    [onChange, folder, setUploadStatus]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleRemove = async (url: string) => {
    const toastId = toast.loading("Removing image...");
    setUploadStatus(true);
    try {
      const publicId = extractPublicId(url);
      await deleteImage(publicId);
      onChange("");
      toast.success("Image deleted successfully", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete image",
        { id: toastId }
      );
    } finally {
      setUploadStatus(false);
    }
  };
  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-purple-500 bg-primary/10"
            : "border-border hover:border-primary/50"
        } ${isUploading ? "opacity-50" : ""}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Please wait...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here, or click to select"}
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPEG, JPG, PNG, WEBP (max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {value && (
        <div className="mt-4 space-y-2">
          <div className="relative group">
            {/* Image Preview */}
            <div className="relative h-40 w-full rounded-md overflow-hidden border">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Semi-transparent overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                {/* Delete button - only shows on hover */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the dropzone
                    handleRemove(value);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 cursor-pointer rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
