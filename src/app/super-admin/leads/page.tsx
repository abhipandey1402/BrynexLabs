import AdminShell from '@/components/admin/AdminShell';
import LeadsList from '@/components/admin/LeadsList';
import { getSubmissions } from '@/lib/contactStore';
import { isDbConfigured } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
    const dbConfigured = isDbConfigured();
    let leads: Awaited<ReturnType<typeof getSubmissions>> = [];
    let dbError: string | null = null;

    if (dbConfigured) {
        try {
            leads = await getSubmissions({ limit: 500 });
        } catch {
            dbError = 'Could not reach MongoDB. Check that MONGODB_URI is correct and the database is online.';
        }
    }

    return (
        <AdminShell title="Leads">
            {!dbConfigured && (
                <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-foreground-secondary">
                    <span className="font-bold text-amber-500">MongoDB is not configured.</span>{' '}
                    Add <code className="font-mono text-foreground">MONGODB_URI</code> to your environment to start capturing submissions.
                </div>
            )}
            {dbError && (
                <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">
                    {dbError}
                </div>
            )}
            <LeadsList initialLeads={leads} />
        </AdminShell>
    );
}
