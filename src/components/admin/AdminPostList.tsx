'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/data/blog';

type StatusFilter = 'all' | 'published' | 'draft';

export default function AdminPostList({ posts, staticSlugs = [] }: { posts: BlogPost[]; staticSlugs?: string[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');

    const staticSet = useMemo(() => new Set(staticSlugs), [staticSlugs]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((post) => {
            if (status !== 'all' && post.status !== status) return false;
            if (q && !post.title.toLowerCase().includes(q) && !post.slug.includes(q)) return false;
            return true;
        });
    }, [posts, query, status]);

    const counts = useMemo(() => ({
        all: posts.length,
        published: posts.filter((p) => p.status === 'published').length,
        draft: posts.filter((p) => p.status === 'draft').length,
    }), [posts]);

    const remove = async (slug: string, title: string) => {
        const isOverride = staticSet.has(slug);
        const message = isOverride
            ? `Delete the CMS override for "${title}"? The original code-defined article will become live again.`
            : `Delete "${title}"? This cannot be undone.`;
        if (!window.confirm(message)) return;
        setDeleting(slug);
        setError(null);
        try {
            const res = await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error ?? 'Failed to delete the article.');
                return;
            }
            router.refresh();
        } catch {
            setError('Network error — the article was not deleted.');
        } finally {
            setDeleting(null);
        }
    };

    if (posts.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border bg-background-card/50 px-6 py-16 text-center">
                <p className="text-foreground font-bold mb-1">No CMS articles yet</p>
                <p className="text-foreground-secondary text-sm">Hit &ldquo;+ New Article&rdquo; to publish your first one.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {error && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                    {error}
                </div>
            )}

            {/* Toolbar: status tabs + search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex gap-1 p-1 rounded-xl bg-background-secondary border border-border w-fit" role="tablist" aria-label="Filter by status">
                    {(['all', 'published', 'draft'] as const).map((s) => (
                        <button
                            key={s}
                            type="button"
                            role="tab"
                            aria-selected={status === s}
                            onClick={() => setStatus(s)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                                status === s
                                    ? 'bg-accent text-white shadow-button'
                                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'
                            }`}
                        >
                            {s === 'draft' ? 'Drafts' : s} <span className={status === s ? 'opacity-80' : 'text-foreground-muted'}>({counts[s]})</span>
                        </button>
                    ))}
                </div>
                <div className="relative sm:w-72">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title or slug…"
                        aria-label="Search articles"
                        className="w-full rounded-xl border border-border bg-background-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted placeholder:opacity-60 focus:border-accent focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-background-card/50 px-6 py-10 text-center text-sm text-foreground-secondary">
                    No articles match {query.trim() ? <>&ldquo;{query.trim()}&rdquo;</> : 'this filter'}.
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((post) => (
                        <div key={post.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background-card px-5 py-4 hover:border-accent/40 transition-colors">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2.5 mb-1">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            post.status === 'published'
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/30'
                                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                                        }`}
                                    >
                                        {post.status}
                                    </span>
                                    {staticSet.has(post.slug) && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30" title="Replaces the code-defined article with the same slug">
                                            Override
                                        </span>
                                    )}
                                    <span className="text-xs font-bold text-accent">{post.category}</span>
                                </div>
                                <p className="font-bold text-foreground truncate">{post.title}</p>
                                <p className="text-xs text-foreground-muted mt-0.5">/blog/{post.slug} · {post.date} · {post.readTime}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {post.status === 'published' && (
                                    <Link href={`/blog/${post.slug}`} target="_blank" className="px-3.5 py-2 rounded-lg text-xs font-bold text-foreground-secondary hover:text-accent transition-colors">
                                        View ↗
                                    </Link>
                                )}
                                <Link
                                    href={`/super-admin/posts/${post.slug}/edit`}
                                    className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-accent transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => remove(post.slug, post.title)}
                                    disabled={deleting === post.slug}
                                    className="px-4 py-2 rounded-lg border border-red-500/30 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                >
                                    {deleting === post.slug ? 'Deleting…' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
