import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/blog/BlogCard';
import { getAuthorBySlug, getAllAuthorSlugs, getAuthorForCategory } from '@/data/authors';
import { getAllPosts } from '@/lib/blogService';
import { absoluteUrl, getBreadcrumbJsonLd, getPersonJsonLd, SITE_NAME } from '@/lib/seo';

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const author = getAuthorBySlug(params.slug);
    if (!author) return { title: 'Author Not Found | Brynex Labs' };

    const title = `${author.name} — ${author.jobTitle} | ${SITE_NAME}`;
    return {
        title,
        description: author.bio,
        alternates: { canonical: `/authors/${author.slug}` },
        openGraph: {
            title,
            description: author.bio,
            url: `/authors/${author.slug}`,
            type: 'profile',
        },
    };
}

export default async function AuthorPage({ params }: PageProps) {
    const author = getAuthorBySlug(params.slug);
    if (!author) notFound();

    const posts = (await getAllPosts()).filter(
        (post) => getAuthorForCategory(post.category).slug === author.slug,
    );

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfilePage',
                '@id': `${absoluteUrl(`/authors/${author.slug}`)}#profilepage`,
                url: absoluteUrl(`/authors/${author.slug}`),
                name: `${author.name} — ${author.jobTitle}`,
                mainEntity: getPersonJsonLd(author),
                isPartOf: { '@id': 'https://brynex.in/#website' },
            },
            getBreadcrumbJsonLd([
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: author.name, href: `/authors/${author.slug}` },
            ]),
        ],
    };

    return (
        <div className="pt-32 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SectionWrapper>
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: author.name },
                    ]}
                />

                <div className="mx-auto max-w-3xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-gradient text-2xl font-black text-white" aria-hidden="true">
                            {author.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {author.name}
                        </h1>
                        <p className="mt-2 text-lg font-semibold text-accent">{author.jobTitle}</p>
                        <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">{author.bio}</p>
                    </div>
                </div>

                {posts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            Articles by {author.name}
                        </h2>
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-20 text-center">
                    <Link href="/blog" className="font-semibold text-accent hover:text-accent-light transition-colors">
                        &larr; Back to all articles
                    </Link>
                </div>
            </SectionWrapper>
        </div>
    );
}
