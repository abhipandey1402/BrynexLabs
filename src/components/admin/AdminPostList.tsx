'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/data/blog';

export default function AdminPostList({ posts }: { posts: BlogPost[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const remove = async (slug: string, title: string) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
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
        <div className="space-y-2">
            {error && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                    {error}
                </div>
            )}
            {posts.map((post) => (
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
    );
}
