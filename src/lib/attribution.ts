'use client';

/**
 * First-touch attribution, captured once per browser session and attached to
 * contact-form submissions so every lead carries its marketing source.
 */

const KEY = 'bx-attribution';

export interface Attribution {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    referrer?: string;
    landingPage?: string;
}

/** Call on first page load (root Analytics component). First touch wins. */
export function captureAttribution(): void {
    try {
        if (window.sessionStorage.getItem(KEY)) return;
        const params = new URLSearchParams(window.location.search);
        const attribution: Attribution = {
            utmSource: params.get('utm_source') ?? undefined,
            utmMedium: params.get('utm_medium') ?? undefined,
            utmCampaign: params.get('utm_campaign') ?? undefined,
            utmTerm: params.get('utm_term') ?? undefined,
            utmContent: params.get('utm_content') ?? undefined,
            referrer: document.referrer && !document.referrer.includes(window.location.hostname)
                ? document.referrer
                : undefined,
            landingPage: window.location.pathname,
        };
        window.sessionStorage.setItem(KEY, JSON.stringify(attribution));
    } catch {
        // sessionStorage unavailable — attribution is best-effort.
    }
}

export function getAttribution(): Attribution {
    try {
        const raw = window.sessionStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Attribution) : {};
    } catch {
        return {};
    }
}
