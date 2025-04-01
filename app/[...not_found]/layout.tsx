import "../globals.css"

export const metadata = {
  title: 'Page Not Found | Beatrice Cherono Foundation',
  description: 'Oops! The page you\'re looking for doesn\'t exist. You may have followed a broken link or the page has moved. Return to our homepage to continue supporting education and community development initiatives.',
  alternates: {
    canonical: 'https://beatricecheronofoundation.org'
  },
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: 'Page Not Found | Beatrice Cherono Foundation',
    description: 'We couldn\'t find the page you requested, but we can help you find your way to our impactful programs and initiatives.',
    url: 'https://beatricecheronofoundation.org',
    images: [
      {
        url: '/images/site-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beatrice Cherono Foundation Logo',
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-purple-500">{children}</body>
    </html>
  )
}
