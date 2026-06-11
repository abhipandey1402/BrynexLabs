import 'server-only';
import { BlogPost, blogPosts as staticPosts } from '@/data/blog';
import { getDbPosts, getDbPostBySlug } from './blogStore';

function postTime(post: BlogPost): number {
    const parsed = Date.parse(post.publishedAt ?? post.date);
    return Number.isNaN(parsed) ? 0 : parsed;
}

/** Published posts from MongoDB merged with the code-defined posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
    let dbPosts: BlogPost[] = [];
    try {
        dbPosts = await getDbPosts();
    } catch (err) {
        // The blog must stay up even if the database is unreachable.
        console.error('[blog] Failed to load posts from MongoDB:', err);
    }
    // A published DB post with the same slug overrides its code-defined original.
    const dbSlugs = new Set(dbPosts.map((p) => p.slug));
    const statics = staticPosts
        .filter((p) => !dbSlugs.has(p.slug))
        .map((p) => ({ ...p, source: 'static' as const }));
    return [...dbPosts, ...statics].sort((a, b) => postTime(b) - postTime(a));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
        const dbPost = await getDbPostBySlug(slug);
        if (dbPost) return dbPost;
    } catch (err) {
        console.error('[blog] Failed to load post from MongoDB:', err);
    }
    const staticPost = staticPosts.find((post) => post.slug === slug);
    return staticPost ? { ...staticPost, source: 'static' } : undefined;
}
