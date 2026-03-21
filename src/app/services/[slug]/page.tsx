import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import ServicePageClient from '@/components/ServicePageClient';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | Brynex Labs',
        };
    }

    return {
        title: service.seo.title,
        description: service.seo.metaDescription,
        alternates: { canonical: `/services/${service.slug}` },
        openGraph: {
            title: service.seo.title,
            description: service.seo.metaDescription,
            url: `/services/${service.slug}`,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default function ServicePage({ params }: PageProps) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Brynex Labs",
            "url": "https://brynex.in"
        },
        "url": `https://brynex.in/services/${service.slug}`
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicePageClient service={service} />
        </>
    );
}
