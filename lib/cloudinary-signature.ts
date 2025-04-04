import crypto from "crypto";

export function generateCloudinarySignature(
  params: Record<string, string>,
  apiSecret: string
) {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  // Create SHA-1 signature
  return crypto
    .createHash("sha1")
    .update(sortedParams + apiSecret)
    .digest("hex");
}
