"use client";

import * as React from "react";
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookIcon,
  HeartHandshakeIcon,
  FolderIcon,
  MessageSquareIcon,
  SettingsIcon,
  LifeBuoyIcon,
  CalendarIcon,
  ImageIcon,
  FileBarChartIcon,
  ShieldIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { useAuth } from "@/hooks/use-session";
import { NavSecondary } from "../nav-secondary";
import { NavMain } from "../nav-main";
import { NavUser } from "../nav-user";
import { NavDocuments } from "../nav-documents";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthenticated, isLoading: isUserLoading } = useAuth();
  const { settings, isLoading } = useSiteSettings();

  // Navigation items with appropriate icons
  const BASE_PATH = "/dashboard";

const navItems = {
  main: [
    { title: "Dashboard", url: `${BASE_PATH}`, icon: LayoutDashboardIcon },
    { title: "About", url: `${BASE_PATH}/about`, icon: BookIcon },
    { title: "Causes", url: `${BASE_PATH}/causes`, icon: HeartHandshakeIcon },
    { title: "Services", url: `${BASE_PATH}/services`, icon: FolderIcon },
    { title: "Teams", url: `${BASE_PATH}/teams`, icon: UsersIcon },
    { title: "Testimonials", url: `${BASE_PATH}/testimonials`, icon: MessageSquareIcon },
    { title: "Login Page", url: `${BASE_PATH}/login`, icon:ShieldIcon },
  ],
  extras: [
    { title: "Projects", url: `${BASE_PATH}/projects`, icon: FileBarChartIcon },
    { title: "Events", url: `${BASE_PATH}/events`, icon: CalendarIcon },
    { title: "Gallery", url: `${BASE_PATH}/gallary`, icon: ImageIcon },
  ],
  secondary: [
    { title: "Settings", url: `${BASE_PATH}/site-settings`, icon: SettingsIcon },
    { title: "Support", url: "https://tevinly.com", icon: LifeBuoyIcon,external: true },
  ],
};

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 group"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                {isLoading ? (
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                ) : settings?.siteLogo ? (
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src={settings.siteLogo}
                      alt="Site Logo"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">BC</span>
                  </div>
                )}

                {/* Site name with loading skeleton */}
                {isLoading ? (
                  <Skeleton className="h-5 w-32 rounded-md" />
                ) : (
                  <span className="text-base font-semibold group-hover:text-primary capitalize">
                    {settings?.siteName || "Beatrice Cherono Melly Foundation"}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems.main} />
        <NavDocuments items={navItems.extras.map(({ title, ...rest }) => ({ name: title, ...rest }))} />
        <NavSecondary items={navItems.secondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "Admin User",
            email: user?.email || "admin@example.com",
            avatar: user?.image || "/default-avatar.jpg",
          }}
          isAuthenticated={isAuthenticated}
          isLoading={isUserLoading}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
