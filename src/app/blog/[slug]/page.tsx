import { getPostBySlug, getAllPosts } from '@/data/blog';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import BlogCTA from '@/components/blog/BlogCTA';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
        title: `${post.title} | Brynex Labs`,
        description: post.seoDescription,
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

    // CMS string injection handler: safely splits arbitrary raw HTML blobs emitted from Headless 
    // CMS databases by our magic '[CTA]' marker to instantly inject a functional interactive native React modal block.
    const contentBlocks = post.content.split('[CTA]');

    return (
        <article className="pt-32 pb-24">
            
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
                    {/* Native Tailwind Typography prose renderer to beautifully map raw HTML */}
                    <div className="
                        prose 
                        prose-lg 
                        md:prose-xl
                        dark:prose-invert 
                        max-w-none
                        
                        /* Headings */
                        prose-headings:font-black 
                        prose-headings:tracking-tight 
                        prose-headings:text-foreground
                        prose-h2:text-3xl md:prose-h2:text-4xl
                        prose-h2:mt-16 prose-h2:mb-6
                        prose-h3:text-2xl md:prose-h3:text-3xl
                        prose-h3:mt-10 prose-h3:mb-4
                        
                        /* Paragraphs & Text */
                        prose-p:text-lg md:prose-p:text-xl
                        prose-p:leading-loose 
                        prose-p:text-foreground-secondary
                        prose-p:mb-12
                        
                        /* Lists */
                        prose-li:text-lg md:prose-li:text-xl
                        prose-li:text-foreground-secondary
                        prose-li:leading-loose
                        prose-li:my-4
                        prose-ul:my-10 prose-ol:my-10
                        
                        /* Formatting & Quotes */
                        prose-strong:text-foreground
                        prose-strong:font-extrabold
                        prose-blockquote:border-l-accent
                        prose-blockquote:bg-accent/5
                        prose-blockquote:py-3
                        prose-blockquote:px-6
                        prose-blockquote:my-12
                        prose-blockquote:rounded-r-2xl
                        prose-blockquote:font-medium
                        prose-blockquote:text-foreground
                        prose-blockquote:not-italic
                        
                        /* Links */
                        prose-a:text-accent 
                        hover:prose-a:text-accent-light 
                        prose-a:font-semibold
                        prose-a:no-underline hover:prose-a:underline
                    ">
                        
                        {contentBlocks.map((block, index) => (
                            <div key={index}>
                                {/* Renders generic raw HTML strictly bound by Tailwind styles */}
                                <div dangerouslySetInnerHTML={{ __html: block }} />
                                
                                {/* Triggers the injected React Application Component boundary */}
                                {index < contentBlocks.length - 1 && <BlogCTA />}
                            </div>
                        ))}
                        
                    </div>
                </div>
            </SectionWrapper>
        </article>
    );
}
