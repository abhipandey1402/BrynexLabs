'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/super-admin/login');
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
