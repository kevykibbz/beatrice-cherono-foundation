import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import BackToTop from "@/components/BackToTop/ToTop";
import { Suspense } from "react";
import Loading from "./loading";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.beatricecheronomellyfoundation.org"),
  title: "Beatrice Cherono Melly Foundation Admin Panel",
  icons: {
    icon: "/favicon/favicon.ico",
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100 font-poppins dark:bg-background_dark">
        <Suspense fallback={<Loading />}>
          {children}
          <BackToTop />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </Suspense>
      </body>
    </html>
  );
}
