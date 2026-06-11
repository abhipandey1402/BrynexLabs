import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import AdminPostList from '@/components/admin/AdminPostList';
import { getDbPosts } from '@/lib/blogStore';
import { isDbConfigured } from '@/lib/mongodb';
import { blogPosts as staticPosts } from '@/data/blog';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const dbConfigured = isDbConfigured();
    let posts: Awaited<ReturnType<typeof getDbPosts>> = [];
    let dbError: string | null = null;

    if (dbConfigured) {
        try {
            posts = await getDbPosts({ includeDrafts: true });
        } catch {
            dbError = 'Could not reach MongoDB. Check that MONGODB_URI is correct and the database is online.';
        }
    }

    return (
        <AdminShell title="Articles">
            {!dbConfigured && (
                <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-foreground-secondary">
                    <span className="font-bold text-amber-500">MongoDB is not configured.</span>{' '}
                    Add <code className="font-mono text-foreground">MONGODB_URI</code> to your environment to create and manage articles from here.
                </div>
            )}
            {dbError && (
                <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">
                    {dbError}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <p className="text-foreground-secondary text-sm">
                    <span className="font-bold text-foreground">{posts.length}</span> CMS article{posts.length === 1 ? '' : 's'}
                    <span className="mx-2 text-border">·</span>
                    <span className="font-bold text-foreground">{staticPosts.length}</span> code-defined
                </p>
                <Link
                    href="/super-admin/posts/new"
                    className="px-5 py-2.5 rounded-xl bg-accent-gradient text-white text-sm font-bold shadow-button hover:brightness-110 transition-all"
                >
                    + New Article
                </Link>
            </div>

            <AdminPostList posts={posts} />

            {/* Code-defined posts (read-only) */}
            <div className="mt-12">
                <h2 className="text-sm font-black uppercase tracking-widest text-foreground-secondary mb-4">Code-Defined Articles (read-only)</h2>
                <div className="space-y-2">
                    {staticPosts.map((post) => (
                        <div key={post.slug} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background-secondary/30 px-5 py-3.5">
                            <div className="min-w-0">
                                <p className="font-bold text-foreground-secondary truncate">{post.title}</p>
                                <p className="text-xs text-foreground-muted">/blog/{post.slug} · {post.category} · {post.date}</p>
                            </div>
                            <Link href={`/blog/${post.slug}`} target="_blank" className="shrink-0 text-xs font-bold text-foreground-muted hover:text-accent transition-colors">
                                View ↗
                            </Link>
                        </div>
                    ))}
                </div>
                <p className="mt-3 text-xs text-foreground-muted">These live in the codebase (src/data/blog.tsx) and can only be changed by a developer.</p>
            </div>
        </AdminShell>
    );
}
