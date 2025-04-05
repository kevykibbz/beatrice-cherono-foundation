"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, PlusCircleIcon, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { SiteSettingsModal } from "./modals/SiteSettingsModal";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { width } = useWindowSize();
  const router = useRouter();

  const handleSiteSettingsClick = () => {
    if (width < 768) {
      router.push("/dashboard/site-settings");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Site Settings"
              onClick={handleSiteSettingsClick}
              className="cursor-pointer min-w-8 bg-primary py-2 px-2 rounded-full text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Site Settings</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="cursor-pointer h-9 w-9 shrink-0 rounded-full group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <Bell />
              <span className="sr-only">Inbox</span>
            </Button>
            <SiteSettingsModal
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            // Determine if the current item is active
            const isActive =
              pathname === item.url ||
              (item.url !== "/dashboard" && pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer w-full justify-start ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 hover:dark:bg-gray-800"
                    } rounded-full transition-colors duration-200`}
                  >
                    {item.icon && (
                      <item.icon
                        className={
                          isActive ? "text-primary" : "group-hover:text-primary"
                        }
                      />
                    )}
                    <span
                      className={
                        isActive ? "text-primary" : "group-hover:text-primary"
                      }
                    >
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
