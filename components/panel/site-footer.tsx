"use client";

import { Separator } from "@/components/ui/separator"
import { useSiteSettings } from "@/context/SiteSettingsContext"
import Link from "next/link"

export function SiteFooter() {
  const { settings, isLoading } = useSiteSettings()

  return (
    <footer className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-t transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Copyright Section */}
        <div className="flex items-center">
          {isLoading ? (
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <span className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} {settings?.siteName || "Beatrice Cherono Melly Foundation"}
            </span>
          )}
        </div>

        {/* Separator and Designer Credit */}
        <div className="flex items-center">
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          {isLoading ? (
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <span className="text-sm text-gray-600">
              Designed by{" "}
              <Link
                href="https://tevinly.com"
                className="text-purple-500 hover:text-purple-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tevinly
              </Link>
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}