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
                {/* Pinned page header — h-16 on desktop so its bottom border
                    lines up with the sidebar's brand row in one continuous line. */}
                <header className="sticky top-14 lg:static z-30 bg-background border-b border-border">
                    <div className="relative h-auto lg:h-16 px-5 sm:px-8 py-3 lg:py-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(194,65,12,0.6)]" aria-hidden />
                                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground-muted leading-none">
                                    Super Admin <span className="text-border mx-0.5">/</span> <span className="text-accent">{title}</span>
                                </span>
                            </div>
                            <div className="mt-1 flex items-baseline gap-3 min-w-0">
                                <h1 className="text-lg font-black text-foreground tracking-tight leading-tight truncate">{title}</h1>
                                {subtitle && (
                                    <>
                                        <span className="hidden xl:block w-px h-3.5 self-center bg-border shrink-0" aria-hidden />
                                        <p className="hidden xl:block text-xs text-foreground-secondary truncate" title={subtitle}>{subtitle}</p>
                                    </>
                                )}
                            </div>
                            {/* On stacked/mobile layouts the bar is auto-height, so the subtitle fits below */}
                            {subtitle && <p className="lg:hidden mt-0.5 text-xs text-foreground-secondary truncate">{subtitle}</p>}
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
