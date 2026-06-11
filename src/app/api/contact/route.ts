import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';
import { contactEmailTemplate } from '@/lib/templates/contact-email';
import { saveSubmission, recordEmailResult } from '@/lib/contactStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'pandeyabhi142002@gmail.com';

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
