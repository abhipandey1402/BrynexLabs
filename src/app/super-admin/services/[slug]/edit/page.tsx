import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ServicePageEditor from '@/components/admin/ServicePageEditor';
import { getDbServiceBySlug } from '@/lib/servicePageStore';
import { services as staticServices } from '@/data/services';

export const dynamic = 'force-dynamic';

export default async function EditServicePage({ params }: { params: { slug: string } }) {
    const dbService = await getDbServiceBySlug(params.slug);
    const staticService = staticServices.find((s) => s.slug === params.slug);

    // Prefer the CMS copy; fall back to the code-defined source for first-time editing.
    if (dbService) {
        return (
            <AdminShell title="Edit Service Page">
                <ServicePageEditor mode={staticService ? 'override' : 'edit'} initialService={dbService} hasOverride />
            </AdminShell>
        );
    }

    if (!staticService) notFound();

    return (
        <AdminShell title="Edit Service Page">
            <ServicePageEditor mode="override" initialService={staticService} hasOverride={false} />
        </AdminShell>
    );
}
