"use client";

import { ITestimonial } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  Loader2,
  RefreshCw,
  UserIcon,
  XCircle,
} from "lucide-react";
import { Types } from "mongoose";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useAdminTestimonials,
  useApproveTestimonial,
  useDeleteTestimonial,
} from "@/hooks/use-testimonials";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

type PopulatedUser = Exclude<ITestimonial["user"], Types.ObjectId>;

const isUserPopulated = (user: ITestimonial["user"]): user is PopulatedUser => {
  return (
    typeof user === "object" && user !== null && ("_id" in user || "id" in user)
  );
};

export default function TestimonialsPage() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch, isFetching, isError } =
    useAdminTestimonials(page, 10);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [testimonialToView, setTestimonialToView] =
    useState<ITestimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<{
    id: string;
    userName: string;
  } | null>(null);
  const [testimonialToApprove, setTestimonialToApprove] = useState<{
    id: string;
    userName: string;
    testimonialPreview: string;
  } | null>(null);

  const approveMutation = useApproveTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const handleApprove = async () => {
    if (testimonialToApprove?.id) {
      try {
        await approveMutation.mutateAsync(testimonialToApprove.id);
        toast.success(
          `${testimonialToApprove.userName}'s testimonial approved!`
        );
        setTestimonialToApprove(null);
      } catch (error) {
        console.error("Approval failed:", error);
        let errorMessage = "Failed to approve testimonial";
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`;
        }
        toast.error(errorMessage);
      }
    }
  };

  const handleDelete = async () => {
    if (testimonialToDelete?.id) {
      try {
        await deleteMutation.mutateAsync(testimonialToDelete?.id);
        toast.success(
          `${testimonialToDelete.userName}'s testimonial deleated!`
        );
        setTestimonialToDelete(null);
      } catch (error) {
        console.error("Deletion failed:", error);
        let errorMessage = "Failed to delete testimonial";
        if (error instanceof Error) {
          errorMessage += `: ${error.message}`;
        }
        toast.error(errorMessage);
      }
    }
  };

  // Function to get user name
  const getUserName = (user: ITestimonial["user"]): string => {
    if (isUserPopulated(user)) {
      return user.name || "Unknown User";
    }
    return "Unknown User";
  };

  const getUserImage = (user: ITestimonial["user"]): string => {
    if (isUserPopulated(user)) {
      return user.image || "/images/profile.png";
    }
    return "/images/profile.png";
  };

  // Effect to hide loading after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isError) {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 gap-2">
          <XCircle className="h-10 w-10 text-red-500" />
          <p className="text-base font-medium text-red-700 sm:text-lg">
            Failed to load testimonials. Please try again.
          </p>
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {isFetching ? (
              <div className="flex justify-center items-center gap-2">
                <RefreshCw className="animate-spin h-4 w-4" />
                Retrying...
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Retry
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {showLoading && isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-base font-medium text-foreground sm:text-lg">
              Loading testimonials...
            </p>
          </div>
        </div>
      )}
      {/* Left Section - Hero with Gradient */}
      <div className="relative hidden lg:block lg:w-1/3">
        <div className="sticky top-0 h-screen">
          {" "}
          {/* Sticky instead of fixed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/60">
            <div className="absolute inset-0 bg-[url('/images/testimonial-bg.jpg')] bg-cover bg-center mix-blend-overlay" />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-center p-12 text-white">
            <h2 className="mb-6 text-4xl font-bold">Customer Voices</h2>
            <p className="mb-8 text-lg opacity-90">
              Manage and approve testimonials from your valued customers.
            </p>
            <ul className="space-y-4">
              {[
                "Review new testimonials",
                "Approve authentic feedback",
                "Maintain quality content",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center p-3 text-sm rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-md"
                >
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-purple-400/50 mr-4 shadow-md shadow-purple-400/30">
                    <CheckIcon className="h-5 w-5 text-purple-100" />
                  </span>

                  <span className="text-white font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section - Testimonials Table */}
      <div className="w-full p-8 lg:w-2/3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Testimonial Approvals
          </h1>
          <p className="text-gray-600">
            {data?.testimonials.length || 0} testimonials to review
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
          {isLoading ? (
            <div className="flex items-center gap-2 justify-center text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center my-8">Loading testimonials...</div>
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2 justify-center text-center text-red-500">
              <XCircle className="h-8 w-8" />
              <div className="text-center my-8">
                Error loading testimonials.
              </div>
            </div>
          ) : data?.testimonials.length === 0 ? (
            <div className="flex flex-col items-center p-12 text-center">
              <UserIcon className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No testimonials found
              </h3>
              <p className="mt-1 text-gray-500">
                There are no testimonials awaiting approval.
              </p>
            </div>
          ) : (
            <div className="w-full">
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Testimonial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {isLoading
                      ? Array.from({ length: 3 }).map((_, index) => (
                          <tr key={`skeleton-${index}`}>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <Skeleton className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-4 space-y-1">
                                  <Skeleton className="h-4 w-32" />
                                  <Skeleton className="h-3 w-24" />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-17" />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Skeleton className="h-5 w-20 rounded-full" />
                            </td>
                          </tr>
                        ))
                      : data?.testimonials?.map((testimonial) => (
                          <tr
                            key={testimonial.id}
                            className="group relative hover:bg-gray-50 text-sm cursor-pointer"
                          >
                            {/* Row Content */}
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <Image
                                    className="h-10 w-10 rounded-full"
                                    width={10}
                                    height={10}
                                    src={
                                      testimonial?.user.image ||
                                      "/images/profile.png"
                                    }
                                    alt={testimonial?.user.name}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {testimonial?.user.name}
                                  </div>
                                  {testimonial.user.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 line-clamp-2">
                                {testimonial.testimonial}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {testimonial.createdAt
                                ? new Date(
                                    testimonial.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  testimonial.approved
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {testimonial.approved ? "Approved" : "Pending"}
                              </span>
                            </td>

                            {/* Hover Actions Overlay */}
                            <td colSpan={4} className="p-0">
                              <div className="absolute inset-0 flex items-center justify-end space-x-2 pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-b from-white/50 to-gray-100/40 backdrop-blur-sm">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // @ts-expect-error: third-party type mismatch
                                    setTestimonialToView(testimonial);
                                  }}
                                  className="flex items-center cursor-pointer gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                  <span>Peek</span>
                                </Button>

                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTestimonialToApprove({
                                      id: testimonial.id,
                                      userName: testimonial?.user.name,
                                      testimonialPreview:
                                        testimonial.testimonial.substring(
                                          0,
                                          100
                                        ) +
                                        (testimonial.testimonial.length > 100
                                          ? "&hellip;"
                                          : ""),
                                    });
                                  }}
                                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    testimonial.approved
                                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                      : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                                  }`}
                                  disabled={
                                    testimonial.approved ||
                                    approveMutation.isPending
                                  }
                                >
                                  {approveMutation.isPending ? (
                                    <span className="flex items-center justify-center gap-1">
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                      Approving...
                                    </span>
                                  ) : testimonial.approved ? (
                                    "Approved"
                                  ) : (
                                    "Approve"
                                  )}
                                </Button>

                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTestimonialToDelete({
                                      id: testimonial.id,
                                      userName: testimonial?.user.name,
                                    });
                                  }}
                                  className="px-3 py-1 bg-red-600 text-white rounded-full cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
                                  disabled={deleteMutation.isPending}
                                >
                                  {deleteMutation.isPending ? (
                                    <span className="flex items-center justify-center gap-1">
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                      Deleting...
                                    </span>
                                  ) : (
                                    "Delete"
                                  )}
                                </Button>
                              </div>
                            </td>

                            {/* View Testimonial Modal */}
                            {testimonialToView && (
                              <td colSpan={4} className="p-0">
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        Full Testimonial
                                      </h3>
                                      <button
                                        onClick={() =>
                                          setTestimonialToView(null)
                                        }
                                        className="rounded-full cursor-pointer p-1 text-gray-400 hover:text-gray-500"
                                      >
                                        <XMarkIcon className="h-6 w-6" />
                                      </button>
                                    </div>

                                    <div className="mb-6">
                                      <div className="flex items-center space-x-3 mb-3">
                                        <Image
                                          className="h-10 w-10 rounded-full"
                                          width={40}
                                          height={40}
                                          src={getUserImage(
                                            testimonialToView.user
                                          )}
                                          alt={getUserName(
                                            testimonialToView.user
                                          )}
                                        />
                                        <div>
                                          <p className="font-medium text-gray-900">
                                            {getUserName(
                                              testimonialToView.user
                                            )}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {testimonialToView.role}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="prose prose-sm max-h-[300px] overflow-y-auto">
                                        <p className="whitespace-pre-line text-gray-700">
                                          {testimonialToView.testimonial}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex justify-end space-x-2">
                                      <Button
                                        onClick={() =>
                                          setTestimonialToView(null)
                                        }
                                        className="rounded-full cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                      >
                                        Close
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            )}

                            {/* Delete Confirmation Modal */}
                            {testimonialToDelete && (
                              <td colSpan={4} className="p-0">
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        Confirm Deletion
                                      </h3>
                                      <button
                                        onClick={() =>
                                          setTestimonialToDelete(null)
                                        }
                                        className="rounded-md p-1 text-gray-400 hover:text-gray-500"
                                      >
                                        <XMarkIcon className="h-6 w-6" />
                                      </button>
                                    </div>

                                    <div className="mb-6">
                                      <p className="text-gray-700">
                                        Are you sure you want to delete the
                                        testimonial from{" "}
                                        <span className="font-semibold">
                                          {testimonialToDelete?.userName}
                                        </span>
                                        ? This action cannot be undone.
                                      </p>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                      <button
                                        onClick={() =>
                                          setTestimonialToDelete(null)
                                        }
                                        className="rounded-full cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={handleDelete}
                                        className="border rounded-full cursor-pointer border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                        disabled={deleteMutation.isPending}
                                      >
                                        {deleteMutation.isPending ? (
                                          <span className="flex items-center justify-center gap-1">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Deleting...
                                          </span>
                                        ) : (
                                          "Delete"
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            )}

                            {/* Approve Confirmation Modal */}
                            {testimonialToApprove && (
                              <td colSpan={4} className="p-0">
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        Confirm Approval
                                      </h3>
                                      <button
                                        onClick={() =>
                                          setTestimonialToApprove(null)
                                        }
                                        className="rounded-md p-1 text-gray-400 hover:text-gray-500"
                                      >
                                        <XMarkIcon className="h-6 w-6" />
                                      </button>
                                    </div>

                                    <div className="mb-6 space-y-4">
                                      <p className="text-gray-700">
                                        Approve testimonial from{" "}
                                        <span className="font-semibold">
                                          {testimonialToApprove.userName}
                                        </span>
                                        ?
                                      </p>

                                      <div className="rounded-md bg-gray-50 p-4">
                                        <p className="text-sm text-gray-600 italic line-clamp-4">
                                          &quot;
                                          {
                                            testimonialToApprove?.testimonialPreview
                                          }
                                          &quot;
                                        </p>
                                      </div>

                                      <p className="text-sm text-gray-500">
                                        This will make the testimonial publicly
                                        visible.
                                      </p>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                      <button
                                        onClick={() =>
                                          setTestimonialToApprove(null)
                                        }
                                        className="rounded-full cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={handleApprove}
                                        className="rounded-full cursor-pointer border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                        disabled={approveMutation.isPending}
                                      >
                                        {approveMutation.isPending ? (
                                          <span className="flex items-center justify-center gap-1">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Approving...
                                          </span>
                                        ) : (
                                          "Approve"
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
              {data && data.totalPages > 1 && (
                <div className="sticky bottom-0 bg-white border-t border-gray-200">
                  <div className="flex items-center justify-between px-6 py-4 ">
                    <div className="text-sm text-gray-500">
                      Showing page {page} of {data.totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <Button
                          onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={page === 1 || isLoading}
                          className="rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>

                        {/* Page Indicator */}
                        <div className="px-4 py-2 text-sm font-medium text-gray-700">
                          Page {page} of {data?.totalPages}
                        </div>

                        {/* Next Button */}
                        <Button
                          onClick={() =>
                            setPage((prev) =>
                              Math.min(prev + 1, data.totalPages)
                            )
                          }
                          disabled={page === data.totalPages || isLoading}
                          className="rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
