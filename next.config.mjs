/** @type {import('next').NextConfig} */

// Defense-in-depth response headers applied to every route. The CSP is
// intentionally permissive on inline/eval (Next.js hydration + next-themes +
// JSON-LD need inline), but still locks down object/base/form/frame vectors —
// a meaningful upgrade over having no policy at all. A nonce-based strict CSP
// is the next hardening step.
const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
            'upgrade-insecure-requests',
        ].join('; '),
    },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
    poweredByHeader: false,

    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },

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
            // Defensive redirects for commonly-guessed legal URLs that would 404.
            { source: '/privacy-policy', destination: '/privacy', permanent: true },
            { source: '/terms-of-service', destination: '/terms', permanent: true },
            ...retiredServiceRedirects,
        ];
    },
};

export default nextConfig;
