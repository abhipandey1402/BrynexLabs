import Hero from '@/components/sections/Hero';
import Positioning from '@/components/sections/Positioning';
import Services from '@/components/sections/Services';
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith';
import WhyBrynex from '@/components/sections/WhyBrynex';
import HowWeWork from '@/components/sections/HowWeWork';
import Engagement from '@/components/sections/Engagement';
import FinalCTA from '@/components/sections/FinalCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brynex Labs — Premium Software Development',
  description: 'Brynex Labs builds reliable websites, business systems, SaaS products and AI-powered software.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Brynex Labs — Premium Software Development',
    description: 'Brynex Labs builds reliable websites, business systems, SaaS products and AI-powered software.',
    url: '/',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://brynex.in/#organization",
      "name": "Brynex Labs",
      "url": "https://brynex.in",
      "logo": "https://brynex.in/favicon.ico",
      "sameAs": [
        "https://x.com/brynexlabs",
        "https://www.linkedin.com/company/brynexlabs"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://brynex.in/#website",
      "url": "https://brynex.in",
      "name": "Brynex Labs",
      "publisher": {
        "@id": "https://brynex.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://brynex.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Positioning />
      <Services />
      <WhoWeWorkWith />
      <WhyBrynex />
      <HowWeWork />
      <Engagement />
      <FinalCTA />
    </>
  );
}
