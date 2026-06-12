'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

interface AdminSidebarProps {
    newLeads?: number;
    adminEmail?: string;
}

const ICONS = {
    articles: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M15 2v5h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
        </svg>
    ),
    newArticle: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
        </svg>
    ),
    leads: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    blog: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
    ),
};

const SECTIONS: { label: string; items: { sub: string; label: string; icon: keyof typeof ICONS; badge?: 'leads' }[] }[] = [
    {
        label: 'Content',
        items: [
            { sub: '', label: 'Articles', icon: 'articles' },
            { sub: '/posts/new', label: 'New Article', icon: 'newArticle' },
        ],
    },
    {
        label: 'Engagement',
        items: [
            { sub: '/leads', label: 'Leads', icon: 'leads', badge: 'leads' },
        ],
    },
];

export default function AdminSidebar({ newLeads = 0, adminEmail }: AdminSidebarProps) {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // On admin.<domain> the URLs are clean ("/leads"); in dev/preview they
    // live under /super-admin. Derive the base from the current path so
    // links and active states work on both without hydration mismatches.
    const base = pathname?.startsWith('/super-admin') ? '/super-admin' : '';
    const hrefFor = (sub: string) => `${base}${sub}` || '/';
    const isActive = (sub: string) =>
        sub === ''
            ? pathname === (base || '/') || (pathname.includes('/posts/') && pathname.endsWith('/edit'))
            : pathname === `${base}${sub}`;

    const nav = (
        <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
            {SECTIONS.map((section) => (
                <div key={section.label}>
                    <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground-muted">{section.label}</p>
                    <div className="space-y-1">
                        {section.items.map((item) => {
                            const active = isActive(item.sub);
                            return (
                                <Link
                                    key={item.sub || 'articles'}
                                    href={hrefFor(item.sub)}
                                    onClick={() => setDrawerOpen(false)}
                                    aria-current={active ? 'page' : undefined}
                                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        active
                                            ? 'bg-accent/10 text-accent'
                                            : 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary'
                                    }`}
                                >
                                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-accent" aria-hidden />}
                                    <span className={active ? 'text-accent' : 'text-foreground-muted group-hover:text-foreground-secondary transition-colors'}>
                                        {ICONS[item.icon]}
                                    </span>
                                    {item.label}
                                    {item.badge === 'leads' && newLeads > 0 && (
                                        <span className="ml-auto min-w-[20px] h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-black leading-none">
                                            {newLeads > 99 ? '99+' : newLeads}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );

    const footer = (
        <div className="px-3 py-4 border-t border-border space-y-3">
            <Link
                href="/blog"
                target="_blank"
                onClick={() => setDrawerOpen(false)}
                className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
            >
                <span className="text-foreground-muted group-hover:text-foreground-secondary transition-colors">{ICONS.blog}</span>
                View Live Blog
            </Link>
            <div className="px-3 flex items-center justify-between gap-2">
                {adminEmail && (
                    <span className="flex items-center gap-2 min-w-0 text-xs font-semibold text-foreground-secondary" title={`Signed in as ${adminEmail}`}>
                        <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-green-500" aria-hidden />
                        <span className="truncate">{adminEmail}</span>
                    </span>
                )}
                <LogoutButton />
            </div>
        </div>
    );

    const brand = (
        <Link href={hrefFor('')} className="flex items-baseline gap-2 select-none" onClick={() => setDrawerOpen(false)}>
            <span className="font-extrabold text-lg tracking-tighter text-foreground">BRYNEX</span>
            <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">CMS</span>
        </Link>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen border-r border-border bg-background">
                <div className="h-16 flex items-center px-6 border-b border-border">{brand}</div>
                {nav}
                {footer}
            </aside>

            {/* Mobile top bar */}
            <header className="lg:hidden sticky top-0 z-40 h-14 flex items-center justify-between px-4 border-b border-border bg-background">
                {brand}
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Open admin menu"
                    className="relative p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                    {newLeads > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" aria-hidden />}
                </button>
            </header>

            {/* Mobile drawer */}
            <div className={`lg:hidden fixed inset-0 z-50 ${drawerOpen ? '' : 'pointer-events-none'}`} aria-hidden={!drawerOpen}>
                <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setDrawerOpen(false)}
                    aria-hidden
                />
                <div className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] flex flex-col bg-background border-r border-border shadow-2xl transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="h-14 flex items-center justify-between px-4 border-b border-border">
                            {brand}
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Close admin menu"
                                className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        {nav}
                        {footer}
                    </div>
                </div>
        </>
    );
}
