import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "../globals.css";
import { generateMetadata } from "@/lib/generateMetadata";
import { Suspense } from "react";
import Loading from "../(panel)/loading";

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
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
