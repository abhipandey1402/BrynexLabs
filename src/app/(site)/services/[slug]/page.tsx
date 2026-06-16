import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/serviceService';
import ServicePageClient from '@/components/ServicePageClient';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | Brynex Labs',
        };
    }

    return {
        title: service.seo.title,
        description: service.seo.metaDescription,
        alternates: {
            canonical: `/services/${service.slug}`,
            // hreflang: Google serves the en-IN version to Indian searchers
            // and this version everywhere else (visible in GSC).
            languages: service.marketIN ? {
                'en-IN': `/in/services/${service.slug}`,
                'en-US': `/services/${service.slug}`,
                'x-default': `/services/${service.slug}`,
            } : undefined,
        },
        openGraph: {
            title: service.seo.title,
            description: service.seo.metaDescription,
            url: `/services/${service.slug}`,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: PageProps) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": service.title,
                "serviceType": service.title,
                "description": service.description,
                "provider": {
                    "@type": "Organization",
                    "@id": "https://brynex.in/#organization",
                    "name": "Brynex Labs",
                    "url": "https://brynex.in"
                },
                "areaServed": [
                    { "@type": "Country", "name": "United States" },
                    { "@type": "Country", "name": "India" },
                    { "@type": "Country", "name": "United Kingdom" },
                    { "@type": "Country", "name": "Australia" }
                ],
                "url": `https://brynex.in/services/${service.slug}`
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brynex.in" },
                    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brynex.in/services" },
                    { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://brynex.in/services/${service.slug}` }
                ]
            },
            ...(service.faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": service.faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                }))
            }] : [])
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicePageClient
                service={service}
                market="GLOBAL"
                alternateUrl={service.marketIN ? `/in/services/${service.slug}` : undefined}
            />
        </>
    );
}
