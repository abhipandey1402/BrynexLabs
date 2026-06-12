import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
    return (
        <AdminShell title="New Article">
            <PostEditor mode="create" />
        </AdminShell>
    );
}
