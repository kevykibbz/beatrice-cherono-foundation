import { CarouselImage } from "@prisma/client";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`;

export const getCarouselImages = async (): Promise<CarouselImage[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch carousel images");
  }
  return response.json();
};

export const createCarouselImage = async (
  data: Omit<CarouselImage, "id" | "createdAt" | "updatedAt">
): Promise<CarouselImage> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create carousel image");
  }
  return response.json();
};

export const updateCarouselImage = async (
  data: Pick<CarouselImage, "id" | "title" | "description" | "imageUrl"> & { userId: string }
): Promise<CarouselImage> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update carousel image");
  }
  return response.json();
};

export const deleteCarouselImage = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete carousel image");
  }
};