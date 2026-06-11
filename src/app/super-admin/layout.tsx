import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Super Admin | Brynex Labs',
    robots: { index: false, follow: false },
};

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-background">{children}</div>;
}
