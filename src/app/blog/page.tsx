import { getAllPosts, BlogCategory } from '@/data/blog';
import BlogCard from '@/components/blog/BlogCard';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights & Engineering Blog | Brynex Labs',
    description: 'Deep dives on SaaS Architecture, Autonomous AI Agents, and scalable Cloud engineering from the Brynex Labs collective.',
};

export default async function BlogIndex({ searchParams }: { searchParams: { category?: string } }) {
    const allPosts = await getAllPosts();
    const currentCategory = searchParams.category as BlogCategory | undefined;

    const filteredPosts = currentCategory 
        ? allPosts.filter(post => post.category === currentCategory)
        : allPosts;

    const categories: ('All' | BlogCategory)[] = ['All', 'AI', 'SaaS', 'Cloud', 'DevOps', 'Engineering'];

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

            {/* URL Parameter Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {categories.map((cat) => {
                    const isActive = (cat === 'All' && !currentCategory) || cat === currentCategory;
                    const href = cat === 'All' ? '/blog' : `/blog?category=${cat}`;
                    return (
                        <Link 
                            key={cat} 
                            href={href}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                                isActive 
                                ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(194,65,12,0.4)]' 
                                : 'bg-background-secondary border-border/80 hover:border-accent hover:bg-background-card text-foreground-secondary hover:text-foreground'
                            }`}
                        >
                            {cat}
                        </Link>
                    );
                })}
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <BlogCard key={post.slug} post={post} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-background-secondary flex items-center justify-center text-foreground-muted">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                        <p className="text-foreground-secondary">We haven&apos;t published any structural insights under this exact category yet.</p>
                        <Link href="/blog" className="mt-6 text-accent hover:text-accent-light font-semibold">
                            Clear filters &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
