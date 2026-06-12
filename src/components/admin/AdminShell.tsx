import AdminSidebar from './AdminSidebar';
import { countNewLeads } from '@/lib/contactStore';

interface AdminShellProps {
    /** Current section name, shown in the header breadcrumb. */
    title: string;
    /** Rendered on the right side of the header — primary page actions. */
    actions?: React.ReactNode;
    children: React.ReactNode;
}

/**
 * Shared chrome for authenticated super-admin pages.
 * App-shell layout: sidebar and the page header stay pinned; only the
 * content pane scrolls (desktop). On mobile the header is sticky under
 * the top bar and the document scrolls naturally.
 */
export default async function AdminShell({ title, actions, children }: AdminShellProps) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const newLeads = await countNewLeads();

    return (
        <div className="min-h-screen lg:flex lg:h-screen lg:overflow-hidden">
            <AdminSidebar newLeads={newLeads} adminEmail={adminEmail} />
            <div className="flex-1 min-w-0 flex flex-col lg:h-screen">
                {/* Pinned header — h-16 on desktop so its bottom border lines up
                    with the sidebar's brand row in one continuous line. The
                    sidebar already names the section, so this stays slim:
                    breadcrumb left, page actions right. */}
                <header className="sticky top-14 lg:static z-30 bg-background border-b border-border">
                    <div className="relative h-14 lg:h-16 px-5 sm:px-8 flex items-center justify-between gap-4">
                        <h1 className="flex items-center gap-2 min-w-0">
                            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(194,65,12,0.6)]" aria-hidden />
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] leading-none truncate">
                                <span className="text-foreground-muted">Super Admin</span>
                                <span className="text-border mx-1.5">/</span>
                                <span className="text-accent">{title}</span>
                            </span>
                        </h1>
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
