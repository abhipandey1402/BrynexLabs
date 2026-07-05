/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // Retired service pages merged into AI-Native Software Engineering
        const retiredServiceSlugs = [
            'custom-software-development',
            'saas-product-engineering',
            'cloud-infrastructure',
            'web-mobile-development',
            'application-modernization',
        ];

        const retiredServiceRedirects = retiredServiceSlugs.map((slug) => ({
            source: `/services/${slug}`,
            destination: '/services/ai-native-software-engineering',
            permanent: true,
        }));

        return [
            {
                source: '/in/services/:slug',
                destination: '/services/:slug',
                permanent: true,
            },
            ...retiredServiceRedirects,
        ];
    },
};

export default nextConfig;
