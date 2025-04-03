import { SectionCards } from "@/components/panel/section-cards";
import { RecentActivities } from "@/components/panel/recent-activities";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Activities
          </h2>
          <p className="text-sm text-muted-foreground">
            Track the latest actions and updates in your system
          </p>
        </div>
        <RecentActivities />
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  );
}
