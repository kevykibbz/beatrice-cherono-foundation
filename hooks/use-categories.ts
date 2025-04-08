"use client";

import { Category } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: {
      title: string;
      location: string;
      description: string;
    }) => {
      const response = await axios.post("/api/categories", newCategory);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "categories",
      });
    },
  });
};

export const useCategories = (page = 1, limit = 6) => {
  return useQuery<{
    data: Category[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }>({
    queryKey: ["categories", page, limit],
    queryFn: async () => {
      const response = await axios.get(
        `/api/categories?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDeleteCategory = ({
  setIsDeleting,
  setDeleteModalOpen,
}: {
  setIsDeleting: (v: boolean) => void;
  setDeleteModalOpen: (v: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      await axios.delete(`/api/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "categories",
      });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
    onSettled: () => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    },
  });
};
