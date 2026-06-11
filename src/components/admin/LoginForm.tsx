'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Login failed.');
                return;
            }
            const from = searchParams.get('from');
            router.push(from && from.startsWith('/super-admin') ? from : '/super-admin');
            router.refresh();
        } catch {
            setError('Network error — please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="rounded-2xl border border-border bg-background-card p-8 space-y-5 shadow-card">
            {error && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="admin-email" className="block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2">Email</label>
                <input
                    id="admin-email"
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                />
            </div>
            <div>
                <label htmlFor="admin-password" className="block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2">Password</label>
                <input
                    id="admin-password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-accent-gradient text-white font-bold shadow-button hover:brightness-110 transition-all disabled:opacity-50"
            >
                {loading ? 'Signing in…' : 'Sign In'}
            </button>
        </form>
    );
}
