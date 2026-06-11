'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
    { href: '/super-admin', label: 'Articles' },
    { href: '/super-admin/posts/new', label: 'New Article' },
];

export default function AdminNav() {
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
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                            active
                                ? 'text-accent bg-accent/10'
                                : 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
