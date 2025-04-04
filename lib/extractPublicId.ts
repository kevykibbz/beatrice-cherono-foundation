export function extractPublicId(url: string): string {
  try {
    // Remove protocol and domain
    const withoutProtocol = url.replace(/^https?:\/\/[^\/]+\//, "");

    // Split by slashes and remove 'upload' and version segments
    const parts = withoutProtocol.split("/");
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      throw new Error("Invalid Cloudinary URL format");
    }

    // Get all parts after 'upload' except the version (v\d+)
    const relevantParts = parts
      .slice(uploadIndex + 1)
      .filter((part) => !part.startsWith("v"));

    // Join and remove file extension
    const publicId = relevantParts.join("/").replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    throw new Error("Failed to extract public ID from image URL");
  }
}
