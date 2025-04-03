"use client";

import { Bell, PlusCircleIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SiteSettingsModal } from "./modals/SiteSettingsModal";
import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
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
              tooltip=">Site Settings"
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
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="group cursor-pointer"
            >
              <SidebarMenuButton
                tooltip={item.title}
                className="hover:bg-gray-100  cursor-pointer hover:dark:bg-gray-800 rounded-full transition-colors duration-200" 
              >
                {item.icon && (
                  <item.icon className="group-hover:text-primary" />
                )}{" "}
                <span className="group-hover:text-primary">
                  {item.title}
                </span>{" "}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
