'use client';

import { useState } from 'react';
import { BlogPost, BlogCategory } from '@/data/blog';
import BlogCard from './BlogCard';

const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'AI', 'SaaS', 'Cloud', 'DevOps', 'Engineering'];

/**
 * Client-side category filtering so switching topics is instant and animated —
 * no server round-trip, no scroll jump, no full-page re-render. The URL is kept
 * in sync via replaceState so filtered views stay shareable.
 */
export default function BlogIndexClient({ posts, initialCategory }: { posts: BlogPost[]; initialCategory?: BlogCategory }) {
    const [category, setCategory] = useState<'All' | BlogCategory>(
        initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'All',
    );

    const select = (cat: 'All' | BlogCategory) => {
        setCategory(cat);
        const url = cat === 'All' ? '/blog' : `/blog?category=${cat}`;
        window.history.replaceState(null, '', url);
    };

    const filtered = category === 'All' ? posts : posts.filter((post) => post.category === category);

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {CATEGORIES.map((cat) => {
                    const isActive = cat === category;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => select(cat)}
                            aria-pressed={isActive}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                                isActive
                                    ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(194,65,12,0.4)] scale-105'
                                    : 'bg-background-secondary border-border/80 hover:border-accent hover:bg-background-card text-foreground-secondary hover:text-foreground'
                            }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Post Grid — keyed by category so each switch replays a staggered fade-in */}
            <div key={category} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filtered.length > 0 ? (
                    filtered.map((post, index) => (
                        <div
                            key={post.slug}
                            className="animate-fade-in-up opacity-0 h-full"
                            style={{ animationDelay: `${Math.min(index * 60, 420)}ms` }}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center animate-fade-in-up">
                        <div className="w-16 h-16 mb-4 rounded-full bg-background-secondary flex items-center justify-center text-foreground-muted">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                        <p className="text-foreground-secondary">We haven&apos;t published any structural insights under this exact category yet.</p>
                        <button type="button" onClick={() => select('All')} className="mt-6 text-accent hover:text-accent-light font-semibold transition-colors">
                            Clear filters &rarr;
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
