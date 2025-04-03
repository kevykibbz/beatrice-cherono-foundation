"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Unauthorized() {
  const router = useRouter();
  const { settings, isLoading } = useSiteSettings();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Upper Split - Image with Gradient Overlay */}
        <div className="relative h-48 w-full">
          <Image
            src="/images/unauthorized-access.jpg"
            alt="Access Denied"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
            <LockKeyhole className="h-10 w-10 text-white mb-2" />
            <h1 className="text-2xl font-bold">Access Restricted</h1>
            <p className="text-sm opacity-90">
              Authorization required to continue
            </p>
          </div>
        </div>

        {/* Lower Split - Content Area */}
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to view this page. Please contact your
            administrator for access.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full cursor-pointer"
            >
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full cursor-pointer"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>

      {/* Footer with Loading Skeleton */}
      <div className="fixed md:sticky bottom-0 left-0 right-0 w-full mt-3">
        <div className="flex justify-center items-center h-10 px-4">
          {isLoading ? (
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-gray-500 text-xs md:text-sm text-center capitalize">
              &copy; {new Date().getFullYear()}{" "}
              {settings?.siteName || "Beatrice Cherono Melly Foundation"}, All
              Rights Reserved.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
