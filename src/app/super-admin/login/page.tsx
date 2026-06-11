import { Suspense } from 'react';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-baseline gap-2 select-none mb-3">
                        <span className="font-extrabold text-2xl tracking-tighter text-foreground">BRYNEX</span>
                        <span className="text-xs font-black tracking-[0.3em] text-accent uppercase">CMS</span>
                    </div>
                    <p className="text-foreground-secondary text-sm">Sign in to manage articles</p>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
