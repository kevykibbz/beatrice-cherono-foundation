"use client";

import { removeBackground } from "./remove-bg";

/**
 * Specialized favicon uploader with background removal for supported types
 * (ICO files are uploaded directly without background removal)
 */
export async function uploadFaviconWithBgRemoval(file: File): Promise<string> {
  const bgRemovalSupportedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const isIcoFile =
    file.type === "image/x-icon" ||
    file.type === "image/vnd.microsoft.icon" ||
    file.name.endsWith(".ico");

  try {
    let fileToUpload: File | Blob = file;

    // Process image based on type
    if (!isIcoFile && bgRemovalSupportedTypes.includes(file.type)) {
      fileToUpload = await removeBackground(file);
    } else if (!isIcoFile) {
      throw new Error("Unsupported file type for background removal");
    }

    // Upload to Cloudinary using fetch API
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    formData.append("folder", "site-settings/favicons");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error(
      isIcoFile ? "ICO upload failed" : "Background removal and upload failed"
    );
  }
}

/**
 * Uploads an image with optional background removal
 * @param file - The file to upload
 * @param folder - Cloudinary folder path
 * @param removeBg - Whether to attempt background removal (default: false)
 * @param bgRemovalTypes - File types eligible for background removal
 */
export async function uploadImage(
  file: File | Blob,
  folder: string = "site-settings",
  removeBg: boolean = false,
  bgRemovalTypes: string[] = ["image/jpeg", "image/jpg", "image/png"]
): Promise<string> {
  try {
    let fileToUpload: File | Blob = file;

    // Process image if background removal is requested and file type is supported
    if (
      removeBg &&
      file instanceof File &&
      bgRemovalTypes.includes(file.type)
    ) {
      fileToUpload = await removeBackground(file);
    } else if (removeBg && file instanceof File) {
      console.warn(
        `Background removal not supported for file type: ${file.type}`
      );
    }

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error(
      removeBg
        ? "Background removal and upload failed"
        : "Failed to upload image"
    );
  }
}

/**
 * Delete image from Cloudinary (requires server-side implementation)
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    // This would need to be implemented via an API route
    // since it requires the API secret
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}
