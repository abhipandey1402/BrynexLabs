import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/serviceService';
import ServicePageClient from '@/components/ServicePageClient';
import { absoluteUrl, getBreadcrumbJsonLd } from '@/lib/seo';

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

    const seo = service.marketIN?.seo ?? service.seo;

    return {
        title: seo.title,
        description: seo.metaDescription,
        alternates: {
            canonical: `/services/${service.slug}`,
        },
        openGraph: {
            title: seo.title,
            description: seo.metaDescription,
            url: `/services/${service.slug}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.metaDescription,
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

/** "₹1,49,999" -> "149999", "₹50K" -> "50000" for schema.org Offer price. */
function numericInrPrice(price: string): string | null {
    const upper = price.toUpperCase();
    const numeric = upper.replace(/[^0-9.]/g, '');
    if (!numeric) return null;

    const value = Number(numeric);
    if (!Number.isFinite(value)) return null;

    return String(Math.round(upper.includes('K') ? value * 1000 : value));
}

export default async function ServicePage({ params }: PageProps) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    const faqs = service.marketIN?.faqs ?? service.faqs;
    const offers = (service.pricing?.tiers ?? [])
        .map((tier) => {
            const price = numericInrPrice(tier.priceIN ?? tier.price);
            if (!price) return null;

            return {
                "@type": "Offer",
                "name": tier.name,
                "price": price,
                "priceCurrency": "INR",
                "url": `https://brynex.in/services/${service.slug}`,
            };
        })
        .filter((offer): offer is { "@type": "Offer"; name: string; price: string; priceCurrency: string; url: string } => Boolean(offer));

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": `https://brynex.in/services/${service.slug}#service`,
                "name": service.title,
                "serviceType": service.title,
                "description": service.marketIN?.seo?.metaDescription ?? service.description,
                "provider": {
                    "@type": "Organization",
                    "@id": "https://brynex.in/#organization",
                    "name": "Brynex Labs",
                    "url": "https://brynex.in"
                },
                "areaServed": { "@type": "Country", "name": "India" },
                "url": `https://brynex.in/services/${service.slug}`,
                ...(offers.length > 0 ? { "offers": offers } : {})
            },
            getBreadcrumbJsonLd([
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: service.title, href: `/services/${service.slug}` },
            ]),
            ...(faqs.length > 0 ? [{
                "@type": "FAQPage",
                "@id": `${absoluteUrl(`/services/${service.slug}`)}#faq`,
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
            <ServicePageClient
                service={service}
                market="IN"
            />
        </>
    );
}
