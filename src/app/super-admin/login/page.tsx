import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
            {/* Decorative backdrop */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-accent/5 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(var(--border)) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--border)) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
                    }}
                />
            </div>

            <Link
                href="/"
                className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm font-semibold text-foreground-secondary hover:text-foreground transition-colors"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                </svg>
                Back to website
            </Link>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-gradient shadow-button mb-5">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <div className="flex items-baseline justify-center gap-2 select-none mb-2">
                        <span className="font-extrabold text-2xl tracking-tighter text-foreground">BRYNEX</span>
                        <span className="text-xs font-black tracking-[0.3em] text-accent uppercase">CMS</span>
                    </div>
                    <p className="text-foreground-secondary text-sm">Sign in to manage articles and publishing</p>
                </div>

                <Suspense>
                    <LoginForm />
                </Suspense>

                <p className="mt-8 text-center text-xs text-foreground-muted">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline -mt-0.5 mr-1.5">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                    Restricted area — authorized personnel only
                </p>
            </div>
        </div>
    );
}
