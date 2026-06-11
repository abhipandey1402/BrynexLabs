import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
    return (
        <AdminShell title="New Article" subtitle="Draft it, preview it, publish it — live on /blog the moment you hit Publish.">
            <PostEditor mode="create" />
        </AdminShell>
    );
}
