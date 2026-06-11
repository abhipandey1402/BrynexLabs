import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';
import { getDbPostBySlug, isStaticSlug } from '@/lib/blogStore';
import { blogPosts as staticPosts } from '@/data/blog';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const post = await getDbPostBySlug(params.slug, { includeDrafts: true });

    if (post) {
        return (
            <AdminShell
                title="Edit Article"
                subtitle={isStaticSlug(post.slug) ? 'CMS override of a code-defined article' : `/blog/${post.slug}`}
            >
                <PostEditor mode="edit" initialPost={post} />
            </AdminShell>
        );
    }

    // No CMS copy yet — editing a code-defined article creates an override.
    const staticPost = staticPosts.find((p) => p.slug === params.slug);
    if (!staticPost) notFound();

    return (
        <AdminShell title="Edit Article" subtitle="Code-defined article — saving creates a CMS override">
            <PostEditor mode="override" initialPost={staticPost} />
        </AdminShell>
    );
}
