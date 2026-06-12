import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import CaseStudyClient from '@/components/CaseStudyClient';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = caseStudies.find((p) => p.slug === params.slug);

    if (!project) {
        return {
            title: 'Project Not Found | Brynex Labs',
        };
    }

    return {
        title: project.seo.title,
        description: project.seo.metaDescription,
        alternates: { canonical: `/case-studies/${project.slug}` },
        openGraph: {
            title: project.seo.title,
            description: project.seo.metaDescription,
            url: `/case-studies/${project.slug}`,
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    return caseStudies.map((project) => ({
        slug: project.slug,
    }));
}

export default function CaseStudyPage({ params }: PageProps) {
    const project = caseStudies.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": project.title,
        "description": project.summary,
        "author": {
            "@type": "Organization",
            "name": "Brynex Labs",
            "url": "https://brynex.in"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Brynex Labs",
            "logo": {
                "@type": "ImageObject",
                "url": "https://brynex.in/favicon.ico"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://brynex.in/case-studies/${project.slug}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CaseStudyClient project={project} />
        </>
    );
}
