export async function removeBackground(imageBlob: Blob): Promise<Blob> {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", imageBlob);

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY || "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Background removal failed:", error);
    throw error;
  }
}
