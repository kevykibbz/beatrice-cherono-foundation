"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


export function SiteHeader() {
  const pathname = usePathname()
  const [title, setTitle] = useState("Dashboard")

  useEffect(() => {
    const routeSegment = pathname.split('/dashboard/')[1] || ""
    
    // Map route segments to display titles
    const titleMap: Record<string, string> = {
      "": "Dashboard",
      "about": "About",
      "causes": "Causes",
      "services": "Services",
      "teams": "Teams",
      "testimonials": "Testimonials",
      "login": "Login Page Configurations",
      "projects": "Projects",
      "events": "Events",
      "gallery": "Gallery",
      "site-settings": "Settings"
    }

    // Fallback to capitalized route name if not found in map
    const newTitle = titleMap[routeSegment] || 
                    (routeSegment 
                      ? routeSegment.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')
                      : "Dashboard")

    setTitle(newTitle)
  }, [pathname])

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}