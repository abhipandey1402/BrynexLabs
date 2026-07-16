import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import { getItemListJsonLd, getWebPageJsonLd } from '@/lib/seo';

const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        getWebPageJsonLd({
            type: 'CollectionPage',
            name: 'AI Development, Custom Software & SaaS SEO Services',
            description:
                'Brynex Labs services: AI agents & automation, AI-native custom software & SaaS engineering, and revenue-focused SaaS SEO for startups and enterprises.',
            path: '/services',
        }),
        getItemListJsonLd(
            services.map((service) => ({
                name: service.shortTitle ?? service.title,
                href: `/services/${service.slug}`,
            })),
        ),
    ],
};

export const metadata: Metadata = {
    title: 'AI Development, Custom Software & SaaS SEO Services | Brynex Labs',
    description: 'Explore Brynex Labs services: AI agents & automation, custom software & SaaS development, and revenue-focused SaaS SEO for startups & enterprises, USA & India.',
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'AI Development, Custom Software & SaaS SEO Services | Brynex Labs',
        description: 'AI agent development, custom software & SaaS engineering, and revenue-focused SaaS SEO — for startups and enterprises in the USA & India.',
        url: '/services'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Development, Custom Software & SaaS SEO Services | Brynex Labs',
        description: 'Explore Brynex Labs services for AI agents, custom software, SaaS platforms, and SaaS SEO across the USA and India.',
    },
};

export default function ServicesIndex() {
    return (
        <div className="pt-24 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
            />
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        Our <span className="text-accent">Services</span>
                    </h1>
                    <p className="text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                        Comprehensive engineering solutions to help startups and enterprises ship production-grade software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.slug}
                            title={service.shortTitle ?? service.title}
                            description={service.cardDescription ?? service.description}
                            href={`/services/${service.slug}`}
                            index={index}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
