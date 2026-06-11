'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/super-admin', label: 'Articles' },
    { href: '/super-admin/posts/new', label: 'New Article' },
    { href: '/super-admin/leads', label: 'Leads' },
];

export default function AdminNav({ newLeads = 0 }: { newLeads?: number }) {
    const pathname = usePathname();

    return (
        <nav className="hidden sm:flex items-center gap-1 text-sm">
            {LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                            active
                                ? 'text-accent bg-accent/10'
                                : 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary'
                        }`}
                    >
                        {label}
                        {label === 'Leads' && newLeads > 0 && (
                            <span className="min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-black leading-none">
                                {newLeads > 99 ? '99+' : newLeads}
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
