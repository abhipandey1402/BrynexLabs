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

/**
 * Shared chrome for authenticated super-admin pages.
 * App-shell layout: sidebar and the page header stay pinned; only the
 * content pane scrolls (desktop). On mobile the header is sticky under
 * the top bar and the document scrolls naturally.
 */
export default async function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const newLeads = await countNewLeads();

    return (
        <div className="min-h-screen lg:flex lg:h-screen lg:overflow-hidden">
            <AdminSidebar newLeads={newLeads} adminEmail={adminEmail} />
            <div className="flex-1 min-w-0 flex flex-col lg:h-screen">
                {/* Pinned page header */}
                <header className="sticky top-14 lg:static z-30 bg-background border-b border-border">
                    <div className="relative px-5 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground-muted">
                                    Super Admin <span className="text-border mx-1">/</span> <span className="text-accent">{title}</span>
                                </span>
                            </div>
                            <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight truncate">{title}</h1>
                            {subtitle && <p className="mt-0.5 text-xs sm:text-sm text-foreground-secondary truncate">{subtitle}</p>}
                        </div>
                        {actions && <div className="shrink-0">{actions}</div>}
                        {/* Accent hairline */}
                        <div className="absolute bottom-0 left-0 h-px w-32 bg-accent-gradient" aria-hidden />
                    </div>
                </header>

                {/* Scrollable content pane */}
                <main className="flex-1 lg:overflow-y-auto">
                    <div className="px-5 sm:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
