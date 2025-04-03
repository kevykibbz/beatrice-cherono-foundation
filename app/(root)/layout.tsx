import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Loading } from "./Loading";
import Footer from "@/components/root/Footer/Footer";
import Navbar from "@/components/root/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Consent from "@/components/root/CookieConsent/Consent";
import Script from "next/script";
import BackToTop from "@/components/BackToTop/ToTop";
import { AuthProvider } from "./providers/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { QueryProviders } from "./providers/query-provider";
import { generateMetadata } from "@/lib/generateMetadata";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "../globals.css";
import "./styles.css";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteSettingsProvider>
          <QueryProviders>
            <AuthProvider session={session}>
              <Suspense fallback={<Loading />}>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                  <BackToTop />
                  <Consent />
                  <Footer />
                </div>
                <Toaster
                  position="top-center"
                  toastOptions={{
                    className: 'rounded-full', 
                    duration: 4000,
                    success: {
                      duration: 3000,
                      className: 'rounded-full' 
                    },
                    error: {
                      duration: 5000,
                      className: 'rounded-full'
                    },
                  }}
                />
              </Suspense>
            </AuthProvider>
          </QueryProviders>
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
