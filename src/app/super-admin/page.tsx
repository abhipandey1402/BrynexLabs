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

    const published = posts.filter((p) => p.status === 'published').length;
    const drafts = posts.length - published;
    const dbSlugs = new Set(posts.map((p) => p.slug));
    const staticSlugs = staticPosts.map((p) => p.slug);
    const overriddenCount = staticSlugs.filter((s) => dbSlugs.has(s)).length;

    const stats = [
        { label: 'CMS Articles', value: posts.length },
        { label: 'Published', value: published, accent: 'text-green-500' },
        { label: 'Drafts', value: drafts, accent: drafts > 0 ? 'text-amber-500' : undefined },
        { label: 'Code-Defined', value: staticPosts.length, note: overriddenCount > 0 ? `${overriddenCount} overridden` : undefined },
    ];

    return (
        <AdminShell
            title="Articles"
            actions={
                <Link
                    href="/super-admin/posts/new"
                    className="inline-block px-5 py-2.5 rounded-xl bg-accent-gradient text-white text-sm font-bold shadow-button hover:brightness-110 transition-all"
                >
                    + New Article
                </Link>
            }
        >
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

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-background-card px-5 py-4">
                        <p className={`text-2xl font-black tracking-tight ${stat.accent ?? 'text-foreground'}`}>{stat.value}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground-secondary mt-1">
                            {stat.label}
                            {stat.note && <span className="ml-2 normal-case tracking-normal font-semibold text-accent">· {stat.note}</span>}
                        </p>
                    </div>
                ))}
            </div>

            <AdminPostList posts={posts} staticSlugs={staticSlugs} />

            {/* Code-defined posts — editable via CMS override */}
            <div className="mt-12">
                <h2 className="text-sm font-black uppercase tracking-widest text-foreground-secondary mb-2">Code-Defined Articles</h2>
                <p className="text-xs text-foreground-muted mb-4">
                    These live in the codebase (src/data/blog.tsx). Hitting <span className="font-bold text-foreground">Edit</span> creates a CMS copy that replaces the original on the live site — delete the copy to restore it.
                </p>
                <div className="space-y-2">
                    {staticPosts.map((post) => {
                        const overridden = dbSlugs.has(post.slug);
                        return (
                            <div key={post.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-background-secondary/30 px-5 py-3.5">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2.5">
                                        <p className={`font-bold truncate ${overridden ? 'text-foreground-muted line-through decoration-border' : 'text-foreground-secondary'}`}>{post.title}</p>
                                        {overridden && (
                                            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30">
                                                Overridden by CMS
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-foreground-muted mt-0.5">/blog/{post.slug} · {post.category} · {post.date}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={`/blog/${post.slug}`} target="_blank" className="px-3.5 py-2 rounded-lg text-xs font-bold text-foreground-muted hover:text-accent transition-colors">
                                        View ↗
                                    </Link>
                                    {!overridden && (
                                        <Link
                                            href={`/super-admin/posts/${post.slug}/edit`}
                                            className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-accent transition-colors"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminShell>
    );
}
