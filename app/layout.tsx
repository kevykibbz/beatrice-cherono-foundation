import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Loading } from "./Loading";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";


const inter=Inter({
  subsets:["latin"],
  variable:"--font-inter"
})



export const metadata: Metadata = {
  title: "Batrice Cherono Melly Foundation",
  icons:{
    icon:"/favicon/favicon.ico"
  },
  description: "The Beatrice Cherono Melly Foundation is dedicated to improving lives through education, environmental conservation, healthcare, women empowerment, and community development. Join us in creating a better future for underprivileged communities in Kenya.",
  keywords: [
    "Beatrice Cherono Melly Foundation",
    "NGO Kenya",
    "Education for All",
    "Environmental Conservation",
    "Healthcare Initiatives",
    "Women Empowerment",
    "Community Development",
    "Poverty Relief",
    "Scholarship Fund",
    "Tree Planting",
    "Skill Enhancement",
    "Gender Equality",
    "Kenya NGOs",
    "Public Benefit Organization",
  ],
  authors: [{ name: "Beatrice Cherono Melly Foundation" }],
  openGraph: {
    title: "Beatrice Cherono Melly Foundation",
    description:
      "Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
    url: "https://www.beatricecheronomellyfoundation.org",
    siteName: "Beatrice Cherono Melly Foundation",
    images: [
      {
        url: "/images/site-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beatrice Cherono Melly Foundation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beatrice Cherono Melly Foundation",
    description:"Empowering communities through education, healthcare, environmental conservation, and women empowerment. Join us in making a difference in Kenya.",
    images: ["/images/site-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<Loading/>}>
          <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow">
              {children}
            </main>
            <Footer/>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
