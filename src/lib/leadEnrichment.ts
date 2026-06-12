import 'server-only';

/**
 * Automated lead enrichment — everything derivable from the request and the
 * fields the visitor already filled, with zero extra questions asked.
 */

const FREE_EMAIL_DOMAINS = new Set([
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk',
    'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'outlook.in', 'live.com',
    'icloud.com', 'me.com', 'mac.com', 'aol.com', 'msn.com', 'ymail.com',
    'protonmail.com', 'proton.me', 'pm.me', 'rediffmail.com', 'zohomail.in',
    'mail.com', 'gmx.com', 'yandex.com',
]);

export function emailMeta(email: string): { emailType: 'business' | 'personal'; companyDomain?: string } {
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    if (!domain || FREE_EMAIL_DOMAINS.has(domain)) return { emailType: 'personal' };
    return { emailType: 'business', companyDomain: domain };
}

const PHONE_COUNTRY: [string, string][] = [
    ['+91', 'IN'], ['+1', 'US'], ['+44', 'GB'], ['+61', 'AU'], ['+971', 'AE'],
    ['+65', 'SG'], ['+49', 'DE'], ['+33', 'FR'], ['+31', 'NL'], ['+353', 'IE'],
    ['+64', 'NZ'], ['+81', 'JP'], ['+966', 'SA'], ['+974', 'QA'], ['+27', 'ZA'],
];

const TZ_COUNTRY: Record<string, string> = {
    'Asia/Calcutta': 'IN', 'Asia/Kolkata': 'IN',
    'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
    'America/Los_Angeles': 'US', 'America/Phoenix': 'US',
    'Europe/London': 'GB', 'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
    'Asia/Dubai': 'AE', 'Asia/Singapore': 'SG', 'Europe/Berlin': 'DE',
    'Europe/Paris': 'FR', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
};

/** Country with fallbacks: edge geo header → phone prefix → timezone. */
export function deriveCountry(headerCountry: string, phone?: string, timezone?: string): string | undefined {
    if (headerCountry) return headerCountry;
    if (phone) {
        // Longest prefix first so +971 wins over +9.
        const match = PHONE_COUNTRY
            .slice()
            .sort((a, b) => b[0].length - a[0].length)
            .find(([prefix]) => phone.replace(/[\s-]/g, '').startsWith(prefix));
        if (match) return match[1];
    }
    if (timezone && TZ_COUNTRY[timezone]) return TZ_COUNTRY[timezone];
    return undefined;
}

const HIGH_INTENT_PATHS = ['/services/', '/hire-ai-developers', '/ai-development-company-in-india', '/contact', '/in/services/'];
const TARGET_MARKETS = new Set(['IN', 'US', 'GB', 'AU', 'CA', 'AE', 'SG']);

export interface ScoreInput {
    emailType: 'business' | 'personal';
    hasPhone: boolean;
    projectDetailsLength: number;
    pageCount: number;
    sessionSeconds: number;
    sourcePath?: string;
    landingPage?: string;
    hasUtm: boolean;
    country?: string;
}

/**
 * 0–100 engagement/fit score so hot leads surface instantly.
 * Heuristic, not ML — every rule maps to "more likely to close".
 */
export function computeLeadScore(input: ScoreInput): number {
    let score = 0;
    if (input.emailType === 'business') score += 25;
    if (input.hasPhone) score += 15;
    if (input.projectDetailsLength > 200) score += 15;
    else if (input.projectDetailsLength > 50) score += 8;
    if (input.pageCount >= 6) score += 15;
    else if (input.pageCount >= 3) score += 10;
    if (input.sessionSeconds >= 300) score += 15;
    else if (input.sessionSeconds >= 120) score += 10;
    const paths = [input.sourcePath ?? '', input.landingPage ?? ''];
    if (paths.some((p) => HIGH_INTENT_PATHS.some((h) => p.startsWith(h) || p === h.replace(/\/$/, '')))) score += 10;
    if (input.hasUtm) score += 5;
    if (input.country && TARGET_MARKETS.has(input.country)) score += 5;
    return Math.min(100, score);
}
