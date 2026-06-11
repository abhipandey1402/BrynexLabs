import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';
import { getDbPostBySlug } from '@/lib/blogStore';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const post = await getDbPostBySlug(params.slug, { includeDrafts: true });
    if (!post) notFound();

    return (
        <AdminShell title="Edit Article">
            <PostEditor mode="edit" initialPost={post} />
        </AdminShell>
    );
}
