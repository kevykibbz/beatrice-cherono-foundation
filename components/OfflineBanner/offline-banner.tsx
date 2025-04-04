// components/offline-banner.tsx
"use client";

import { useOffline } from "@/hooks/use-offline";
import { useEffect, useState } from "react";

export function OfflineBanner() {
  const isOffline = useOffline();
  const [showBanner, setShowBanner] = useState(false);

  // Delay showing banner to prevent flickering on temporary disconnections
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOffline) {
      timer = setTimeout(() => setShowBanner(true), 2000); // Show after 2 seconds offline
    } else {
      setShowBanner(false);
    }

    return () => clearTimeout(timer);
  }, [isOffline]);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-yellow-500 text-white p-4 rounded-full shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm sm:text-base">
            You&apos;re offline. Some features may not work.
          </span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 bg-yellow-600 rounded-full cursor-pointer hover:bg-yellow-700 transition-colors text-sm whitespace-nowrap"
          aria-label="Retry connection"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
