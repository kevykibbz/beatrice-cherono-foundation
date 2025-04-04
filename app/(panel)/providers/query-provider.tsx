"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5, // 5 minutes (site settings don't change often)
      gcTime: 60 * 1000 * 10, // 10 minutes cache time
      retry: 1, // Only retry once for settings
      refetchOnWindowFocus: false,
    },
  },
});

export function QueryProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
