import Hero from '@/components/sections/Hero';
import Positioning from '@/components/sections/Positioning';
import Services from '@/components/sections/Services';
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith';
import WhyBrynex from '@/components/sections/WhyBrynex';
import Comparison from '@/components/sections/Comparison';
import HowWeWork from '@/components/sections/HowWeWork';
import Engagement from '@/components/sections/Engagement';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Company for AI Agents, Automation & SaaS SEO | Brynex Labs',
  description: 'Build software that pays for itself. Brynex Labs builds AI agents, intelligent automation, custom software & revenue-driving SaaS SEO — senior engineers trusted by startups and enterprises across the USA & India.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Software Company for AI Agents, Automation & SaaS SEO | Brynex Labs',
    description: 'Build software that pays for itself — AI agents, intelligent automation, custom software & SaaS SEO from senior engineers. Serving the USA, India & worldwide.',
    url: '/',
  },
};

const homeFaqs = [
  { q: "How fast can you start working on my project?", a: "We typically onboard and kick off new client projects within 48 to 72 hours of signing the agreement, depending on complexity and resource availability." },
  { q: "Do you integrate AI securely into existing SaaS products?", a: "Absolutely. We specialize in building custom AI agents and integrating strict LLM features securely into existing cloud platforms to automate your specific workflows without exposing private data." },
  { q: "How do you handle project scope changes?", a: "We work with an agile mindset. If new features are needed, we pivot dynamically, transparently scoping out the differences and adjusting timelines before proceeding." },
  { q: "Will I own the intellectual property and code?", a: "100%. Upon project completion and final payment, all intellectual property, design assets, and source code are fully transferred and licensed to you." },
  { q: "Do you provide post-launch support and maintenance?", a: "Yes, we offer flexible post-launch retainers to ensure your application stays updated, secure, and continues to scale smoothly as your user base grows." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://brynex.in/#organization",
      "name": "Brynex Labs",
      "alternateName": "Brynex",
      "url": "https://brynex.in",
      "logo": "https://brynex.in/favicon.ico",
      "email": "hello@brynex.in",
      "description": "Software company building production-grade AI agents, intelligent automation, custom software, SaaS platforms, and revenue-focused SaaS SEO for startups and enterprises worldwide.",
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Canada" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "AI agent development",
        "agentic AI",
        "LLM application development",
        "RAG pipelines",
        "custom software development",
        "SaaS product engineering",
        "cloud infrastructure",
        "SaaS SEO"
      ],
      "sameAs": [
        "https://x.com/brynexlabs",
        "https://www.linkedin.com/company/brynexlabs"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software & AI Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Agent Development & Intelligent Automation",
              "url": "https://brynex.in/services/ai-agents-automation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Software & SaaS Development",
              "url": "https://brynex.in/services/ai-native-software-engineering"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS SEO Services for B2B Companies",
              "url": "https://brynex.in/services/saas-seo"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://brynex.in/#website",
      "url": "https://brynex.in",
      "name": "Brynex Labs",
      "publisher": {
        "@id": "https://brynex.in/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://brynex.in/#faq",
      "mainEntity": homeFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
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
      <Comparison />
      <HowWeWork />
      <Engagement />
      <FAQ />
      <FinalCTA />
    </>
  );
}
