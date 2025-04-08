"use client";

import { useOffline } from "@/hooks/use-offline";
import { useEffect, useState } from "react";
import { Loader2, WifiOff } from "lucide-react";
import { Button } from "../ui/button";

export function OfflineBanner() {
  const isOffline = useOffline();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(isOffline), 2000);
    return () => clearTimeout(timer);
  }, [isOffline]);

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 text-center animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <WifiOff className="h-10 w-10 text-yellow-500" />
          <h3 className="text-lg font-medium">You're offline</h3>
          <p className="text-muted-foreground">
            Some features may not be available. Please check your connection.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 cursor-pointer rounded-full"
            variant="outline"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Retry Connection
          </Button>
        </div>
      </div>
    </div>
  );
}
