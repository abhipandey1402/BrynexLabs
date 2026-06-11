import Link from 'next/link';
import LogoutButton from './LogoutButton';

/** Shared chrome for authenticated super-admin pages. */
export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
                <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <Link href="/super-admin" className="flex items-baseline gap-2 select-none">
                            <span className="font-extrabold text-lg tracking-tighter text-foreground">BRYNEX</span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">CMS</span>
                        </Link>
                        <nav className="hidden sm:flex items-center gap-1 text-sm">
                            <Link href="/super-admin" className="px-3 py-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors font-semibold">
                                Articles
                            </Link>
                            <Link href="/super-admin/posts/new" className="px-3 py-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors font-semibold">
                                New Article
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/blog" target="_blank" className="text-xs font-bold text-foreground-secondary hover:text-accent transition-colors">
                            View Blog ↗
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-8">{title}</h1>
                {children}
            </main>
        </div>
    );
}
