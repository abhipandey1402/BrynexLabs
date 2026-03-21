/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function AnalyticsInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

    // Track pageviews automatically
    useEffect(() => {
        if (pathname && gaId && typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('config', gaId, {
                page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
            });
        }
    }, [pathname, searchParams, gaId]);

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gaId}', {
                                page_path: window.location.pathname,
                            });
                        `}
                    </Script>
                </>
            )}

            {/* Microsoft Clarity (UX Heatmaps/Recordings) */}
            {clarityId && (
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${clarityId}");
                    `}
                </Script>
            )}

            {/* Meta (Facebook) Pixel */}
            {metaId && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${metaId}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}
        </>
    );
}

export default function Analytics() {
    return (
        <Suspense fallback={null}>
            <AnalyticsInner />
        </Suspense>
    );
}
