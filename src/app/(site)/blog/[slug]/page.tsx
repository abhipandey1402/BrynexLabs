import { getPostBySlug, getAllPosts } from '@/lib/blogService';
import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import ArticleProse from '@/components/blog/ArticleProse';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { Metadata } from 'next';
import {
    getBlogImageUrl,
    getBlogPostingJsonLd,
    getBreadcrumbJsonLd,
    getPostDate,
    getPostModifiedDate,
} from '@/lib/seo';

// Statically generate known posts; CMS posts created later render on-demand
// (dynamicParams) and stay fresh via ISR + on-save revalidation from the admin.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
        title: `${post.title} | Brynex Labs`,
        description: post.seoDescription,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.seoDescription,
            url: `/blog/${post.slug}`,
            type: 'article',
            publishedTime: getPostDate(post),
            modifiedTime: getPostModifiedDate(post),
            authors: [post.author],
            images: [{ url: getBlogImageUrl(post), alt: post.title }],
            ...(post.techTags && post.techTags.length > 0 ? { tags: post.techTags } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.seoDescription,
            images: [getBlogImageUrl(post)],
        },
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const relatedServices = (post.relatedServices ?? [])
        .map((slug) => services.find((s) => s.slug === slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s));

    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
        .filter((candidate) => candidate.slug !== post.slug)
        .map((candidate) => {
            const sharedTags = (candidate.techTags ?? []).filter((tag) => post.techTags?.includes(tag)).length;
            const score = sharedTags * 2 + (candidate.category === post.category ? 1 : 0);
            return { candidate, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ candidate }) => candidate);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            getBlogPostingJsonLd(post),
            getBreadcrumbJsonLd([
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: post.title, href: `/blog/${post.slug}` },
            ]),
        ],
    };

    return (
        <article className="pt-32 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Layer */}
            <SectionWrapper className="mb-12 border-b border-border/30 pb-16">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-light transition-colors mb-10">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    <div className="flex items-center justify-center gap-3 mb-8 text-xs font-black uppercase tracking-widest">
                        <span className="text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">{post.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        <span className="text-foreground-muted">{post.readTime}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-10 leading-[1.15]">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-foreground-secondary font-semibold text-sm md:text-base">
                        <span className="text-foreground">{post.author}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border/80" />
                        <span>{post.date}</span>
                        {post.updatedAt && post.updatedAt !== post.publishedAt && (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-border/80" />
                                <span>Updated {new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.updatedAt))}</span>
                            </>
                        )}
                    </div>
                </div>
            </SectionWrapper>

            {/* Read/Render Layer */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="mb-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 md:p-8">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-accent">Direct answer</p>
                        <p className="text-lg md:text-xl leading-relaxed text-foreground-secondary">
                            {post.excerpt}
                        </p>
                    </div>

                    <ArticleProse content={post.content} />

                    {/* Tech stack tags (CMS-mapped) */}
                    {post.techTags && post.techTags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-border/40">
                            <h2 className="text-xs font-black uppercase tracking-widest text-foreground-secondary mb-4">Technologies Covered</h2>
                            <div className="flex flex-wrap gap-2">
                                {post.techTags.map((tag) => (
                                    <span key={tag} className="px-3.5 py-1.5 rounded-full border border-border bg-background-card text-foreground-secondary text-sm font-semibold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related services (CMS-mapped) */}
                    {relatedServices.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-black text-foreground tracking-tight mb-6">Related Services</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group block p-6 rounded-2xl border border-border bg-background-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <h3 className="font-extrabold text-foreground group-hover:text-accent transition-colors mb-2">
                                            {service.shortTitle ?? service.title}
                                        </h3>
                                        <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-2">
                                            {service.cardDescription ?? service.description}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-accent">
                                            Explore service
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {relatedPosts.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-border/40">
                            <h2 className="text-2xl font-black text-foreground tracking-tight mb-6">Read Next</h2>
                            <div className="space-y-4">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/blog/${related.slug}`}
                                        className="group block rounded-2xl border border-border bg-background-card p-5 hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-black uppercase tracking-[0.18em] text-accent">{related.category}</span>
                                            <h3 className="text-lg font-extrabold text-foreground group-hover:text-accent transition-colors">{related.title}</h3>
                                            <p className="text-sm leading-relaxed text-foreground-secondary line-clamp-2">{related.excerpt}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </article>
    );
}
