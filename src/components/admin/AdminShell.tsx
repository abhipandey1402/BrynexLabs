import AdminSidebar from './AdminSidebar';
import { countNewLeads } from '@/lib/contactStore';

interface AdminShellProps {
    title: string;
    /** Small muted line under the title. */
    subtitle?: string;
    /** Rendered to the right of the title — primary page actions. */
    actions?: React.ReactNode;
    children: React.ReactNode;
}

/** Shared chrome for authenticated super-admin pages: sidebar + content area. */
export default async function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const newLeads = await countNewLeads();

    return (
        <div className="min-h-screen lg:flex">
            <AdminSidebar newLeads={newLeads} adminEmail={adminEmail} />
            <div className="flex-1 min-w-0">
                <main className="mx-auto max-w-6xl px-5 sm:px-8 py-8 lg:py-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{title}</h1>
                            {subtitle && <p className="mt-1.5 text-sm text-foreground-secondary">{subtitle}</p>}
                        </div>
                        {actions && <div className="shrink-0">{actions}</div>}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
