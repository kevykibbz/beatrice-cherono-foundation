"use client";

import { Category, GalleryImage } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface DeleteImageResponse {
  success: boolean;
  message: string;
  deletedId?: string;
}

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { categoryId: string; imageId: string }) => {
      const response = await axios.delete<DeleteImageResponse>(
        `/api/categories/${data.categoryId}/images/${data.imageId}`
      );
      return response.data;
    },
    onSuccess: (deletedData, variables) => {
      // Update categories list by removing the deleted image
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) => {
        if (!oldCategories) return undefined;

        return oldCategories.map((category) => {
          if (category.id === variables.categoryId) {
            return {
              ...category,
              images: category.images.filter(
                (img) => img.id !== variables.imageId
              ),
            };
          }
          return category;
        });
      });

      // Update the specific category's images query
      queryClient.setQueryData(
        ["categoryImages", variables.categoryId],
        (oldData: { images: GalleryImage[]; pagination: any } | undefined) => {
          if (!oldData) return { images: [], pagination: { totalCount: 0 } };

          return {
            images: oldData.images.filter(
              (img) => img.id !== variables.imageId
            ),
            pagination: {
              ...oldData.pagination,
              totalCount: oldData.pagination.totalCount - 1,
            },
          };
        }
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });
};

export const useAddImagesToCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      categoryId: string;
      caption?: string;
      url: string;
    }) => {
      const response = await axios.post(
        `/api/categories/${data.categoryId}/images`,
        data
      );
      return response.data;
    },
    onSuccess: (newImage, variables) => {
      // Update the categories list optimistically
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) => {
        if (!oldCategories) return;
        return oldCategories.map((category) =>
          category.id === variables.categoryId
            ? { ...category, images: [newImage, ...category.images] }
            : category
        );
      });

      // Update all paginated versions of this category's images
      queryClient.setQueriesData(
        { queryKey: ["categoryImages", variables.categoryId] },
        (oldData: { images: GalleryImage[]; pagination: any } | undefined) => {
          if (!oldData)
            return { images: [newImage], pagination: { totalCount: 1 } };

          return {
            images: [newImage, ...oldData.images],
            pagination: {
              ...oldData.pagination,
              totalCount: oldData.pagination.totalCount + 1,
            },
          };
        }
      );
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.error || "Failed to add image");
      } else {
        toast.error("Failed to add image");
      }
    },
  });
};

export const useGalleryImages = (categoryId: string, page = 1, perPage = 6) => {
  return useQuery({
    queryKey: ["categoryImages", categoryId, page, perPage],
    queryFn: async () => {
      const response = await axios.get(
        `/api/categories/${categoryId}/images?page=${page}&perPage=${perPage}`
      );
      return response.data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
