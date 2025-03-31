import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthProvider } from "../(root)/providers/auth-provider";
import { Loading } from "../Loading";
import BackToTop from "@/components/panel/BackToTop/ToTop";
import Header from "@/components/panel/Header/index";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider session={session}>
          <Suspense fallback={<Loading />}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              {/* <BackToTop /> */}
              <BackToTop />
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
      </body>
    </html>
  );
}
