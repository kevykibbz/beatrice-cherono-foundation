import { Toaster } from "react-hot-toast";
import BackToTop from "@/components/BackToTop/ToTop";
import { Suspense } from "react";
import Loading from "./loading";
import "../globals.css";
import "./styles.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/panel/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/panel/site-header";
import { QueryProviders } from "./providers/query-provider";
import { generateMetadata } from "@/lib/generateMetadata";
import { AuthProvider } from "./providers/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { SiteFooter } from "@/components/panel/site-footer";

export const metadata = await generateMetadata();

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="font-poppins scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        <SiteSettingsProvider>
          <Suspense fallback={<Loading />}>
            <QueryProviders>
              <AuthProvider session={session}>
                <SidebarProvider>
                  <AppSidebar variant="inset" />
                  <SidebarInset className="flex flex-col min-h-screen">
                    <SiteHeader />
                    <main className="flex-1 pb-16"> {/* Added padding-bottom for footer */}
                      <div className="@container/main flex flex-1 flex-col gap-2">
                        {children}
                      </div>
                    </main>
                    <SiteFooter/> 
                  </SidebarInset>
                </SidebarProvider>
                <BackToTop />
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
              </AuthProvider>
            </QueryProviders>
          </Suspense>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}