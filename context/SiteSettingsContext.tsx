"use client"

import { fetchSiteSettings } from "@/hooks/site-settings";
import { getDefaultSiteSettings } from "@/lib/defaults/site-settings";
import { SiteSettings, ContactDetails } from "@/types/types";
import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState, 
  useEffect, 
  useCallback,
  useMemo
} from "react";

type SiteContextType = {
  settings: SiteSettings;
  contactDetails: ContactDetails | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
};

const SiteSettingsContext = createContext<SiteContextType>({
  settings: getDefaultSiteSettings(),
  contactDetails: null,
  isLoading: true,
  error: null,
  refresh: async () => {}
});

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Omit<SiteContextType, 'refresh'>>({
    settings: getDefaultSiteSettings(),
    contactDetails: null,
    isLoading: true,
    error: null
  });

  const defaultSettings = useMemo(() => getDefaultSiteSettings(), []);

  const loadData = useCallback(async () => {
    try {
      const [fetchedSettings, contactResponse] = await Promise.all([
        fetchSiteSettings(),
        fetch('/api/contact-details').then(res => res.json())
      ]);

      setState({
        settings: { ...defaultSettings, ...fetchedSettings },
        contactDetails: contactResponse,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error("Failed to load site data:", error);
      setState({
        settings: defaultSettings,
        contactDetails: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  }, [defaultSettings]);

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(() => ({
    ...state,
    refresh
  }), [state, refresh]);

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};