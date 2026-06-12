import { BlogCategory } from '@/data/blog';
import { getAllPosts } from '@/lib/blogService';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import SectionWrapper from '@/components/SectionWrapper';
import { Metadata } from 'next';

// Revalidate periodically; the admin CMS also revalidates on-demand after every save.
export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Insights & Engineering Blog | Brynex Labs',
    description: 'Deep dives on SaaS Architecture, Autonomous AI Agents, and scalable Cloud engineering from the Brynex Labs collective.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Insights & Engineering Blog | Brynex Labs',
        description: 'Deep dives on SaaS Architecture, Autonomous AI Agents, and scalable Cloud engineering from the Brynex Labs collective.',
        url: '/blog',
        type: 'website',
    },
};

export default async function BlogIndex({ searchParams }: { searchParams: { category?: string } }) {
    const allPosts = await getAllPosts();
    const currentCategory = searchParams.category as BlogCategory | undefined;

    return (
        <SectionWrapper className="pt-32 pb-24">
            <div className="text-center mb-16 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 mt-6">
                    Engineering <span className="text-accent">Insights</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto">
                    Architectural deep-dives, infrastructure strategies, and tactical guides to building modern software at scale.
                </p>
            </div>

            <BlogIndexClient posts={allPosts} initialCategory={currentCategory} />
        </SectionWrapper>
    );
}
