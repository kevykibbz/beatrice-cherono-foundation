import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Loading } from "../(root)/Loading";
import { Toaster } from "react-hot-toast";
import Consent from "@/components/root/CookieConsent/Consent";
import BackToTop from "@/components/BackToTop/ToTop";
import Script from "next/script";
import { AuthProvider } from "../(root)/providers/auth-provider";
import { QueryProviders } from "./providers/query-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { generateMetadata } from "@/lib/generateMetadata";
import "../globals.css";
import { OfflineBanner } from "@/components/OfflineBanner/offline-banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = await generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <SiteSettingsProvider>
          <QueryProviders>
            <AuthProvider session={session}>
              <Suspense fallback={<Loading />}>
                <div className="min-h-screen flex flex-col">
                  <main className="flex-grow">{children}</main>
                  <BackToTop />
                  <Consent />
                </div>
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
            </AuthProvider>
          </QueryProviders>
          <OfflineBanner />
        </SiteSettingsProvider>
        {/* Tidio Live Chat Script */}
        <Script
          src="//code.tidio.co/2wjfpiet8z2408ksic4atu8nnvcvw8rr.js"
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.GOOGLE_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
