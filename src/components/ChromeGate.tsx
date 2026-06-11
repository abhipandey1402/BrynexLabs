'use client';

import { usePathname } from 'next/navigation';

/** Hides site chrome (navbar, footer, sticky CTA) on super-admin routes. */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    if (pathname?.startsWith('/super-admin')) return null;
    return <>{children}</>;
}
