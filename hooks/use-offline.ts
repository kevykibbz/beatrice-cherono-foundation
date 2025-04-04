"use client";

import { useEffect, useState } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    checkNetworkStatus();

    // Browser events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Active checking interval
    const interval = setInterval(checkNetworkStatus, 30000);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkNetworkStatus = async () => {
    try {
      // Test connection to a reliable endpoint
      await fetch('https://httpbin.org/status/200', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      });
      setIsOffline(false);
    } catch {
      setIsOffline(true);
    }
  };

  return isOffline;
}