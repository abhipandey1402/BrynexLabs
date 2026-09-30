import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CustomAnalytics from '@/components/Analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brynex.in'),
  title: {
    default: 'Brynex Labs | AI & SaaS Product Studio — Makers of Clinizy Care',
    template: '%s',
  },
  description:
    'Brynex Labs is an AI & SaaS product studio from India. We build and run Clinizy Care, and ship AI agents, SaaS platforms & SEO for founders worldwide.',
  applicationName: 'Brynex Labs',
  openGraph: {
    title: 'Brynex Labs | AI & SaaS Product Studio — Makers of Clinizy Care',
    description:
      'We build our own products, then we build yours. The team behind Clinizy Care ships AI agents, SaaS platforms and SEO for founders worldwide.',
    type: 'website',
    url: 'https://brynex.in',
    locale: 'en_US',
    siteName: 'Brynex Labs',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brynexlabs',
    title: 'Brynex Labs | AI & SaaS Product Studio — Makers of Clinizy Care',
    description:
      'We build our own products, then we build yours. The team behind Clinizy Care ships AI agents, SaaS platforms and SEO for founders worldwide.',
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
        {/* Flag JS availability before paint so scroll-reveal only hides content
            when it can guarantee a reveal. No-JS agents/crawlers keep it visible. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <VercelAnalytics />
        <SpeedInsights />
        <CustomAnalytics />
      </body>
    </html>
  );
}
