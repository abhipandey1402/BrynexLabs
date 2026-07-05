import { permanentRedirect } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    };
}

export default function IndiaServiceRedirect({ params }: PageProps) {
    permanentRedirect(`/services/${params.slug}`);
}
