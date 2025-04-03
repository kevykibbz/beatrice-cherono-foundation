import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Testimonials Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>User Feedback</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold">100</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            +12% this month <TrendingUpIcon className="size-4" />
          </div>
          <p>Positive testimonials collected</p>
        </CardFooter>
      </Card>

      {/* Projects Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Projects</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold">20</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            -20% this quarter <TrendingDownIcon className="size-4" />
          </div>
          <p>Current initiatives underway</p>
        </CardFooter>
      </Card>

      {/* Team Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Team Members</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold">5</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            100% retention <TrendingUpIcon className="size-4" />
          </div>
          <p>Active contributors</p>
        </CardFooter>
      </Card>

      {/* Events Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Scheduled Events</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold">2</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            On track <TrendingUpIcon className="size-4" />
          </div>
          <p>Upcoming activities</p>
        </CardFooter>
      </Card>
    </div>
  )
}