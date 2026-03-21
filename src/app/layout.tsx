import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import CustomAnalytics from '@/components/Analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brynex.in'),
  title: 'Brynex Labs — Premium Software Development',
  description:
    'Brynex Labs builds reliable websites, business systems, SaaS products and AI-powered software — from small improvements to large-scale platforms.',
  openGraph: {
    title: 'Brynex Labs — Premium Software Development',
    description:
      'Premium software development for businesses, startups and product teams. Websites, SaaS, AI solutions and more.',
    type: 'website',
    url: 'https://brynex.in',
    locale: 'en_US',
    siteName: 'Brynex Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brynex Labs — Premium Software Development',
    description:
      'Premium software development for businesses, startups and product teams. Websites, SaaS, AI solutions and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  } : undefined,
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      className={`${inter.className} bg-background text-foreground antialiased selection:bg-accent selection:text-white transition-colors duration-300`}
      suppressHydrationWarning
    >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content" role="main">
            {children}
          </main>

          <StickyCTA />
          <Footer />
        </ThemeProvider>
        <VercelAnalytics />
        <CustomAnalytics />
      </body>
    </html>
  );
}
