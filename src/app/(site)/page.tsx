import Hero from '@/components/sections/Hero';
import ProductsBand from '@/components/sections/ProductsBand';
import ShippedForOurselves from '@/components/sections/ShippedForOurselves';
import Positioning from '@/components/sections/Positioning';
import Services from '@/components/sections/Services';
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith';
import WhyBrynex from '@/components/sections/WhyBrynex';
import Comparison from '@/components/sections/Comparison';
import HowWeWork from '@/components/sections/HowWeWork';
import Engagement from '@/components/sections/Engagement';
import FAQ, { type FAQItem } from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import { Metadata } from 'next';
import { getWebSiteJsonLd } from '@/lib/seo';

const HOME_TITLE = 'Brynex Labs | AI & SaaS Product Studio — Makers of Clinizy Care';
const HOME_DESCRIPTION =
  'Brynex Labs is an AI & SaaS product studio from India. We build and run Clinizy Care, and ship AI agents, SaaS platforms & SEO for founders worldwide.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const homeFaqs: FAQItem[] = [
  { q: "How fast can you start working on my project?", a: "We typically onboard and kick off new client projects within 48 to 72 hours of signing the agreement, depending on complexity and resource availability." },
  { q: "Do you integrate AI securely into existing SaaS products?", a: "Absolutely. We specialize in building custom AI agents and integrating strict LLM features securely into existing cloud platforms to automate your specific workflows without exposing private data." },
  { q: "How do you handle project scope changes?", a: "We work with an agile mindset. If new features are needed, we pivot dynamically, transparently scoping out the differences and adjusting timelines before proceeding." },
  { q: "Will I own the intellectual property and code?", a: "100%. Upon project completion and final payment, all intellectual property, design assets, and source code are fully transferred and licensed to you." },
  { q: "Do you provide post-launch support and maintenance?", a: "Yes, we offer flexible post-launch retainers to ensure your application stays updated, secure, and continues to scale smoothly as your user base grows." },
  { q: "What is Clinizy Care, and how is it related to Brynex Labs?", a: "Clinizy Care is hospital management software for Indian clinics, nursing homes and small hospitals. Brynex Labs designed and built it, and we operate it ourselves. It is our own product, and it is why we can say every service we sell, we have already shipped for ourselves. Product details and pricing live on clinizy.in." },
  { q: "Do you build healthcare software for other companies?", a: "Yes. Healthcare is our proven vertical. We bring what we built for Clinizy Care, including multi-tenant architecture, GST billing and WhatsApp Business API integrations, to healthcare founders and providers who need custom software." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    getWebSiteJsonLd(),
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
      <ProductsBand />
      <ShippedForOurselves />
      <Positioning />
      <Services />
      <WhoWeWorkWith />
      <WhyBrynex />
      <Comparison />
      <HowWeWork />
      <Engagement />
      <FAQ faqs={homeFaqs} />
      <FinalCTA />
    </>
  );
}
