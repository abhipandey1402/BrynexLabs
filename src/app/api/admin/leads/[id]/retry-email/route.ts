import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionById, recordEmailResult } from '@/lib/contactStore';
import { emailService } from '@/lib/email';
import { contactEmailTemplate } from '@/lib/templates/contact-email';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'pandeyabhi142002@gmail.com';

/** Re-sends the notification email for a stored lead whose delivery failed. */
export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
    if (!isDbConfigured()) {
        return NextResponse.json({ error: 'MongoDB is not configured.' }, { status: 503 });
    }

    const submission = await getSubmissionById(params.id);
    if (!submission) {
        return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    const result = await emailService.sendMailWithRetry({
        to: NOTIFY_EMAIL,
        subject: `New Consultation Request from ${submission.name}`,
        html: contactEmailTemplate({
            name: submission.name,
            email: submission.email,
            phone: submission.phone,
            date: submission.preferredDate,
            time: submission.preferredTime,
            details: submission.projectDetails ?? '',
            timezone: submission.timezone,
        }),
        replyTo: submission.email,
    });

    await recordEmailResult(params.id, result);

    if (!result.ok) {
        return NextResponse.json(
            { error: `Email failed again after ${result.attempts} attempts: ${result.error}` },
            { status: 502 },
        );
    }
    return NextResponse.json({ ok: true, attempts: result.attempts });
}
