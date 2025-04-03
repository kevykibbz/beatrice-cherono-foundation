"use client"

import { fetchSiteSettings } from "@/lib/api/siteSettings";
import { getDefaultSiteSettings } from "@/lib/defaults/site-settings";
import { SiteSettings } from "@/types/types";
import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState, 
  useEffect, 
  useCallback,
  useMemo
} from "react";

const SiteSettingsContext = createContext<{
  settings: SiteSettings;
  isLoading: boolean;
  error: Error | null;
}>({
  settings: getDefaultSiteSettings(),
  isLoading: true,
  error: null
});

// Optimized provider component
export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<{
      settings: SiteSettings;
      isLoading: boolean;
      error: Error | null;
    }>({
      settings: getDefaultSiteSettings(),
      isLoading: true,
      error: null
    });

    // Memoize default settings to prevent recreation
    const defaultSettings = useMemo(() => getDefaultSiteSettings(), []);

    // Cache the settings loading function
    const loadSiteSettings = useCallback(async () => {
      try {
        const fetchedSettings = await fetchSiteSettings();
        setState({
          settings: { ...defaultSettings, ...fetchedSettings },
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error("Failed to load site settings:", error);
        setState({
          settings: defaultSettings,
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error))
        });
      }
    }, [defaultSettings]);

    useEffect(() => {
      loadSiteSettings();
    }, [loadSiteSettings]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => state, [state]);

    return (
      <SiteSettingsContext.Provider value={contextValue}>
        {children}
      </SiteSettingsContext.Provider>
    );
};

// Enhanced custom hook with better type safety
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};