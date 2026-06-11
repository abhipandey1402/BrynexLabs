import { getPostBySlug, getAllPosts } from '@/lib/blogService';
import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import ArticleProse from '@/components/blog/ArticleProse';
import Link from 'next/link';
import { Metadata } from 'next';

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
            publishedTime: post.publishedAt ?? undefined,
            authors: [post.author],
            ...(post.techTags && post.techTags.length > 0 ? { tags: post.techTags } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.seoDescription,
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seoDescription,
        author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: 'Brynex Labs', url: 'https://brynex.in' },
        datePublished: post.publishedAt ?? post.date,
        mainEntityOfPage: `https://brynex.in/blog/${post.slug}`,
        ...(post.techTags && post.techTags.length > 0 ? { keywords: post.techTags.join(', ') } : {}),
    };

    return (
        <article className="pt-32 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Layer */}
            <SectionWrapper className="mb-12 border-b border-border/30 pb-16">
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
                    </div>
                </div>
            </SectionWrapper>

            {/* Read/Render Layer */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                </div>
            </SectionWrapper>
        </article>
    );
}
