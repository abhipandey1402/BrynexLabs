import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import CustomAnalytics from '@/components/Analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brynex.in'),
  title: {
    default: 'Software Company for AI Agents, Automation & SaaS SEO | Brynex Labs',
    template: '%s',
  },
  description:
    'Build software that pays for itself. Brynex Labs is the software company behind AI agents, intelligent automation, custom software development & revenue-driving SaaS SEO — trusted by startups and enterprises across the USA & India.',
  applicationName: 'Brynex Labs',
  keywords: [
    'AI agent development company',
    'AI development company',
    'custom software development company',
    'SaaS development company',
    'AI automation agency',
    'SaaS SEO agency',
    'software development company India',
    'hire AI developers',
  ],
  openGraph: {
    title: 'Software Company for AI Agents, Automation & SaaS SEO | Brynex Labs',
    description:
      'Build software that pays for itself — AI agents, intelligent automation, custom software & SaaS SEO from senior engineers. Serving the USA, India & worldwide.',
    type: 'website',
    url: 'https://brynex.in',
    locale: 'en_US',
    siteName: 'Brynex Labs',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brynexlabs',
    title: 'Software Company for AI Agents, Automation & SaaS SEO | Brynex Labs',
    description:
      'Build software that pays for itself — AI agents, intelligent automation, custom software & SaaS SEO from senior engineers. Serving the USA, India & worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
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
          {children}
        </ThemeProvider>
        <VercelAnalytics />
        <CustomAnalytics />
      </body>
    </html>
  );
}
