import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndiaServiceBySlug, getAllIndiaServiceSlugs } from '@/lib/serviceService';
import ServicePageClient from '@/components/ServicePageClient';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await getIndiaServiceBySlug(params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | Brynex Labs',
        };
    }

    const seo = service.marketIN?.seo ?? service.seo;

    return {
        title: seo.title,
        description: seo.metaDescription,
        alternates: {
            canonical: `/in/services/${service.slug}`,
            // hreflang pair with the global version (visible in GSC).
            languages: {
                'en-IN': `/in/services/${service.slug}`,
                'en-US': `/services/${service.slug}`,
                'x-default': `/services/${service.slug}`,
            },
        },
        openGraph: {
            title: seo.title,
            description: seo.metaDescription,
            url: `/in/services/${service.slug}`,
            type: 'website',
            locale: 'en_IN',
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllIndiaServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

/** "₹1,49,999" -> "149999" for schema.org Offer price. */
function numericPrice(price: string): string | null {
    const digits = price.replace(/[^0-9]/g, '');
    return digits.length > 0 ? digits : null;
}

export default async function IndiaServicePage({ params }: PageProps) {
    const service = await getIndiaServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    const inV = service.marketIN!;
    const faqs = inV.faqs ?? service.faqs;
    const offers = (service.pricing?.tiers ?? [])
        .filter((t) => t.priceIN && numericPrice(t.priceIN))
        .map((t) => ({
            "@type": "Offer",
            "name": t.name,
            "price": numericPrice(t.priceIN!),
            "priceCurrency": "INR",
            "url": `https://brynex.in/in/services/${service.slug}`,
        }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": service.title,
                "serviceType": service.title,
                "description": inV.seo?.metaDescription ?? service.description,
                "provider": {
                    "@type": "Organization",
                    "@id": "https://brynex.in/#organization",
                    "name": "Brynex Labs",
                    "url": "https://brynex.in"
                },
                "areaServed": { "@type": "Country", "name": "India" },
                "url": `https://brynex.in/in/services/${service.slug}`,
                ...(offers.length > 0 ? { "offers": offers } : {})
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brynex.in" },
                    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://brynex.in/services" },
                    { "@type": "ListItem", "position": 3, "name": `${service.title} (India)`, "item": `https://brynex.in/in/services/${service.slug}` }
                ]
            },
            ...(faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
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
            {/* The toggle sets the opt-out cookie client-side before navigating,
                so the clean global URL loads directly (no redirect bounce). */}
            <ServicePageClient
                service={service}
                market="IN"
                alternateUrl={`/services/${service.slug}`}
            />
        </>
    );
}
