import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';
import { contactEmailTemplate } from '@/lib/templates/contact-email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, date, time, projectDetails, timezone } = body;

        // Basic validation
        if (!name || !email || !date || !time) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const emailHtml = contactEmailTemplate({
            name,
            email,
            phone,
            date,
            time,
            details: projectDetails,
            timezone: timezone || 'Unknown'
        });

        // Send email to admin/support
        await emailService.sendMail({
            // to: 'support@prepforge.space', // Default to sender if not specified
            to: 'pandeyabhi142002@gmail.com', // Default to sender if not specified
            subject: `New Consultation Request from ${name}`,
            html: emailHtml,
            replyTo: email
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
