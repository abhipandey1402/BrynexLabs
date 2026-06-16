import AdminShell from '@/components/admin/AdminShell';
import ServicePageEditor from '@/components/admin/ServicePageEditor';

export const dynamic = 'force-dynamic';

export default function NewServicePage() {
    return (
        <AdminShell title="New Service Page">
            <ServicePageEditor mode="create" />
        </AdminShell>
    );
}
