import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';
import { contactEmailTemplate } from '@/lib/templates/contact-email';
import { saveSubmission, recordEmailResult } from '@/lib/contactStore';
import { deriveCountry, emailMeta, computeLeadScore } from '@/lib/leadEnrichment';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

/** Vercel geo headers arrive URI-encoded (e.g. "S%C3%A3o%20Paulo"). */
const safeDecode = (value: string): string => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

const NOTIFY_EMAIL =
    process.env.CONTACT_NOTIFY_EMAIL ||
    'pandeyabhi142002@gmail.com,hello@brynex.in,tiwari.rnf@gmail.com';

const cap = (value: unknown, max: number): string =>
    typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const name = cap(body.name, 120);
    const email = cap(body.email, 200);
    const phone = cap(body.phone, 30);
    const date = cap(body.date, 20);
    const time = cap(body.time, 20);
    const projectDetails = cap(body.projectDetails, 5000);
    const timezone = cap(body.timezone, 60) || 'Unknown';
    const sourcePath = cap(body.source, 200);

    // First-touch marketing attribution (client-captured) + geo (edge headers).
    const attribution = (body.attribution ?? {}) as Record<string, unknown>;
    const utmSource = cap(attribution.utmSource, 120);
    const utmMedium = cap(attribution.utmMedium, 120);
    const utmCampaign = cap(attribution.utmCampaign, 160);
    const utmTerm = cap(attribution.utmTerm, 160);
    const utmContent = cap(attribution.utmContent, 160);
    const referrer = cap(attribution.referrer, 300);
    const landingPage = cap(attribution.landingPage, 200);

    // Geo: Vercel edge headers, with phone/timezone fallbacks for country.
    const headerCountry = cap(request.headers.get('x-vercel-ip-country'), 8);
    const country = deriveCountry(headerCountry, phone, timezone);
    const city = safeDecode(cap(request.headers.get('x-vercel-ip-city'), 80));
    const region = safeDecode(cap(request.headers.get('x-vercel-ip-country-region'), 80));
    const ip = cap(request.headers.get('x-forwarded-for'), 100).split(',')[0].trim();
    const language = cap(request.headers.get('accept-language'), 120).split(',')[0].trim();

    // Session engagement (client-tracked) — capped defensively.
    const engagement = (body.engagement ?? {}) as Record<string, unknown>;
    const pagesVisited = Array.isArray(engagement.pagesVisited)
        ? engagement.pagesVisited.filter((p): p is string => typeof p === 'string').map((p) => p.slice(0, 200)).slice(0, 25)
        : [];
    const pageCount = typeof engagement.pageCount === 'number' && Number.isFinite(engagement.pageCount)
        ? Math.min(Math.max(0, Math.round(engagement.pageCount)), 1000)
        : pagesVisited.length;
    const sessionSeconds = typeof engagement.sessionSeconds === 'number' && Number.isFinite(engagement.sessionSeconds)
        ? Math.min(Math.max(0, Math.round(engagement.sessionSeconds)), 86_400)
        : 0;

    // Automated enrichment + scoring.
    const { emailType, companyDomain } = emailMeta(email);
    const leadScore = computeLeadScore({
        emailType,
        hasPhone: Boolean(phone),
        projectDetailsLength: projectDetails.length,
        pageCount,
        sessionSeconds,
        sourcePath: sourcePath || undefined,
        landingPage: landingPage || undefined,
        hasUtm: Boolean(utmSource),
        country,
    });

    if (!name || !email || !date || !time) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // 1) Persist the lead FIRST — a flaky SMTP relay must never lose a submission.
    let submissionId: string | null = null;
    if (isDbConfigured()) {
        try {
            const submission = await saveSubmission({
                name,
                email,
                phone: phone || undefined,
                preferredDate: date,
                preferredTime: time,
                timezone,
                projectDetails: projectDetails || undefined,
                sourcePath: sourcePath || undefined,
                userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? undefined,
                utmSource: utmSource || undefined,
                utmMedium: utmMedium || undefined,
                utmCampaign: utmCampaign || undefined,
                utmTerm: utmTerm || undefined,
                utmContent: utmContent || undefined,
                referrer: referrer || undefined,
                landingPage: landingPage || undefined,
                country: country || undefined,
                city: city || undefined,
                region: region || undefined,
                ip: ip || undefined,
                language: language || undefined,
                pagesVisited: pagesVisited.length > 0 ? pagesVisited : undefined,
                pageCount: pageCount || undefined,
                sessionSeconds: sessionSeconds || undefined,
                emailType,
                companyDomain,
                leadScore,
            });
            submissionId = submission.id;
        } catch (err) {
            console.error('[contact] Failed to persist submission:', err);
        }
    }

    // 2) Notify with retry + exponential backoff (never throws).
    const emailHtml = contactEmailTemplate({
        name,
        email,
        phone,
        date,
        time,
        details: projectDetails,
        timezone,
    });

    const result = await emailService.sendMailWithRetry({
        to: NOTIFY_EMAIL,
        subject: `New Consultation Request from ${name}`,
        html: emailHtml,
        replyTo: email,
    });

    if (submissionId) {
        try {
            await recordEmailResult(submissionId, result);
        } catch (err) {
            console.error('[contact] Failed to record email result:', err);
        }
    }

    // The submission is stored — succeed even if the notification email failed
    // after all retries; the admin panel shows it as failed with a retry action.
    if (submissionId || result.ok) {
        return NextResponse.json({ success: true });
    }

    console.error('[contact] No DB and email failed after retries:', result.error);
    return NextResponse.json(
        { error: 'Failed to send your request. Please try again.' },
        { status: 500 },
    );
}
