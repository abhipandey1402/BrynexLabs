'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const from = searchParams.get('from');
    const safeFrom = from && from.startsWith('/') && !from.startsWith('//') ? from : null;
    const continueTo = safeFrom && safeFrom !== '/super-admin' && safeFrom !== '/' ? safeFrom : null;

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
                setLoading(false);
                return;
            }
            // Keep the loading state on while navigating so the button doesn't flicker back.
            // On admin.<domain> the dashboard is "/"; in dev/preview it's /super-admin.
            const fallback = window.location.hostname.startsWith('admin.') ? '/' : '/super-admin';
            router.push(safeFrom ?? fallback);
            router.refresh();
        } catch {
            setError('Network error — please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="rounded-2xl border border-border bg-background-card p-8 space-y-5 shadow-card">
            {continueTo && !error && (
                <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-xs font-semibold text-foreground-secondary">
                    Sign in to continue to <span className="font-mono text-accent">{continueTo}</span>
                </div>
            )}
            {error && (
                <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="admin-email" className="block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2">Email</label>
                <input
                    id="admin-email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="username"
                    placeholder="you@brynex.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-foreground-muted placeholder:opacity-50 focus:border-accent focus:outline-none transition-colors"
                />
            </div>
            <div>
                <label htmlFor="admin-password" className="block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2">Password</label>
                <div className="relative">
                    <input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-foreground-muted placeholder:opacity-50 focus:border-accent focus:outline-none transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground-muted hover:text-foreground transition-colors"
                    >
                        {showPassword ? (
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><line x1="2" x2="22" y1="2" y2="22" />
                            </svg>
                        ) : (
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-accent-gradient text-white font-bold shadow-button hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                )}
                {loading ? 'Signing in…' : 'Sign In'}
            </button>
        </form>
    );
}
