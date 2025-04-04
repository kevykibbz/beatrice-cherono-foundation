import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "../globals.css";
import { generateMetadata } from "@/lib/generateMetadata";
import { Suspense } from "react";
import Loading from "../(panel)/loading";
import { OfflineBanner } from "@/components/OfflineBanner/offline-banner";

export const metadata = await generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-purple-500">
        <SiteSettingsProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <OfflineBanner />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
