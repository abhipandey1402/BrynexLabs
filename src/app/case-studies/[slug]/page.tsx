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
        openGraph: {
            title: project.seo.title,
            description: project.seo.metaDescription,
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

    return <CaseStudyClient project={project} />;
}
