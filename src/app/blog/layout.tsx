import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Insights | Brynex Labs',
    description: 'Technical insights, engineering deep dives, and company updates from the team at Brynex Labs.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog & Insights | Brynex Labs',
        description: 'Technical insights, engineering deep dives, and company updates from the team at Brynex Labs.',
        url: '/blog'
    }
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
