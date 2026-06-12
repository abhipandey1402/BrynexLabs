'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        // Clean URLs on admin.<domain>, /super-admin paths in dev/preview.
        const base = pathname?.startsWith('/super-admin') ? '/super-admin' : '';
        router.push(`${base}/login`);
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors"
        >
            Log out
        </button>
    );
}
