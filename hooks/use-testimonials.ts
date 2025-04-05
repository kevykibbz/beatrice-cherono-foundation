import { ITestimonial } from "@/types/types";
import { Testimonial, User } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface PaginatedTestimonials {
  testimonials: (Testimonial & { user: User })[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useTestimonials() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return useQuery<ITestimonial[]>({
    queryKey: ["testimonials", isAdmin],
    queryFn: async () => {
      const res = await fetch("/api/testimonials?approved=true");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });
}

export function useAdminTestimonials(
  page: number = 1,
  limit: number = 10,
  approvedOnly: boolean = true
) {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "ADMIN";

  return useQuery<PaginatedTestimonials>({
    queryKey: ["testimonials", isAdmin, page, limit],
    queryFn: async () => {
      const url = `/api/admin/testimonials?page=${page}&limit=${limit}${
        approvedOnly && !isAdmin ? "&approved=true" : ""
      }`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
    staleTime: 5000,
  });
}

export function useAddTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      name: string;
      role: string;
      testimonial: string;
    }) => {
      const res = await fetch("/api/testimonials/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to add testimonial");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useApproveTestimonial() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (id: string) => {
      if (session?.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const response = await fetch(`/api/admin/testimonials/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve testimonial");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (id: string) => {
      if (session?.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const response = await fetch(`/api/admin/testimonials/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}
