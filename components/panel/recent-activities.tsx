"use client";

import { CheckCircle2, Clock, MoreVertical, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Activity = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: "completed" | "pending";
};

export function RecentActivities() {
  const activities: Activity[] = [
    {
      id: "1",
      action: "Updated project settings",
      user: "John Doe",
      timestamp: "10 minutes ago",
      status: "completed",
    },
    {
      id: "2",
      action: "Created new team",
      user: "Jane Smith",
      timestamp: "25 minutes ago",
      status: "completed",
    },
    {
      id: "3",
      action: "Pending approval",
      user: "Mike Johnson",
      timestamp: "1 hour ago",
      status: "pending",
    },
    {
      id: "4",
      action: "Deleted old files",
      user: "Sarah Williams",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "5",
      action: "Requested access",
      user: "Alex Brown",
      timestamp: "3 hours ago",
      status: "pending",
    },
  ];

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow
              key={activity.id}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="font-medium group-hover:text-primary">
                {activity.action}
              </TableCell>
              <TableCell className="group-hover:text-primary">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  {activity.user}
                </div>
              </TableCell>
              <TableCell className="group-hover:text-primary">
                {activity.timestamp}
              </TableCell>
              <TableCell className="group-hover:text-primary">
                {activity.status === "completed" ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 group-hover:text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 group-hover:text-primary">
                    <Clock className="h-4 w-4" />
                    Pending
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent cursor-pointer rounded-full"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:bg-gray-100  cursor-pointer hover:dark:bg-gray-800 rounded-full transition-colors duration-200">View details</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100  cursor-pointer hover:dark:bg-gray-800 rounded-full transition-colors duration-200">Mark as complete</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100  cursor-pointer hover:dark:bg-gray-800 rounded-full transition-colors duration-200">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
