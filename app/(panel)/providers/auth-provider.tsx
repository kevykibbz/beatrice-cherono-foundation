"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
