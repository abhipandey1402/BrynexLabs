import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';
import CaseStudyView from '@/components/case-studies/CaseStudyView';
import { getBreadcrumbJsonLd, getCaseStudyArticleJsonLd, getCaseStudyImageUrl } from '@/lib/seo';

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
            images: [{ url: getCaseStudyImageUrl(project.slug), width: 1200, height: 630, alt: project.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.seo.title,
            description: project.seo.metaDescription,
            images: [getCaseStudyImageUrl(project.slug)],
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
        "@graph": [
            getCaseStudyArticleJsonLd(project),
            ...(project.faqs && project.faqs.length > 0
                ? [
                      {
                          '@type': 'FAQPage',
                          '@id': `${getCaseStudyImageUrl(project.slug).replace('/og-image', '')}#faq`,
                          mainEntity: project.faqs.map((f) => ({
                              '@type': 'Question',
                              name: f.q,
                              acceptedAnswer: { '@type': 'Answer', text: f.a },
                          })),
                      },
                  ]
                : []),
            getBreadcrumbJsonLd([
                { name: 'Home', href: '/' },
                { name: 'Case Studies', href: '/case-studies' },
                { name: project.title, href: `/case-studies/${project.slug}` },
            ]),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CaseStudyView study={project} related={caseStudies.filter((p) => p.slug !== project.slug).slice(0, 3)} />
        </>
    );
}
