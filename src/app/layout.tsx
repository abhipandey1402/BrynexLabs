import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brynex Labs — Premium Software Development',
  description:
    'Brynex Labs builds reliable websites, business systems, SaaS products and AI-powered software — from small improvements to large-scale platforms.',
  openGraph: {
    title: 'Brynex Labs — Premium Software Development',
    description:
      'Premium software development for businesses, startups and product teams. Websites, SaaS, AI solutions and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Brynex Labs',
  },
  robots: {
    index: true,
    follow: true,
  },
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

          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
