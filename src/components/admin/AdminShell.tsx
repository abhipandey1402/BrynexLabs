import Link from 'next/link';
import AdminNav from './AdminNav';
import LogoutButton from './LogoutButton';

interface AdminShellProps {
    title: string;
    /** Small muted line under the title. */
    subtitle?: string;
    /** Rendered to the right of the title — primary page actions. */
    actions?: React.ReactNode;
    children: React.ReactNode;
}

/** Shared chrome for authenticated super-admin pages. */
export default function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
    const adminEmail = process.env.ADMIN_EMAIL;

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
                <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <Link href="/super-admin" className="flex items-baseline gap-2 select-none">
                            <span className="font-extrabold text-lg tracking-tighter text-foreground">BRYNEX</span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">CMS</span>
                        </Link>
                        <AdminNav />
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/blog" target="_blank" className="hidden md:inline text-xs font-bold text-foreground-secondary hover:text-accent transition-colors">
                            View Blog ↗
                        </Link>
                        {adminEmail && (
                            <span className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-secondary border border-border text-xs font-semibold text-foreground-secondary" title="Signed in">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden />
                                {adminEmail}
                            </span>
                        )}
                        <LogoutButton />
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-6 py-10">
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
    );
}
