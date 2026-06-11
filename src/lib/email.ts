import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
}

export interface SendResult {
    ok: boolean;
    attempts: number;
    error?: string;
}

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            secure: false, // true for 465, false for other ports
            // Bounded timeouts so a hung SMTP connection fails fast and the
            // retry loop stays within a serverless request budget.
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 12000,
        });
    }

    async sendMail({ to, subject, html, from, replyTo }: EmailOptions) {
        const mailOptions = {
            from: from || process.env.SMTP_FROM || '"Brynex Labs" <noreply@prepforge.space>',
            replyTo: replyTo || process.env.SMTP_FROM || '"Brynex Labs" <noreply@prepforge.space>',
            to,
            subject,
            html,
        };

        const info = await this.transporter.sendMail(mailOptions);
        return info;
    }

    /**
     * Send with exponential backoff + jitter. Never throws — returns a result
     * the caller can persist, so a flaky SMTP relay can't lose a lead.
     */
    async sendMailWithRetry(options: EmailOptions, maxAttempts = 3): Promise<SendResult> {
        let lastError = '';
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.sendMail(options);
                return { ok: true, attempts: attempt };
            } catch (err) {
                lastError = err instanceof Error ? err.message : String(err);
                console.error(`[email] attempt ${attempt}/${maxAttempts} failed:`, lastError);
                if (attempt < maxAttempts) {
                    // 500ms, 1.5s (+ up to 250ms jitter) — bounded for serverless.
                    const delay = 500 * 3 ** (attempt - 1) + Math.random() * 250;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        return { ok: false, attempts: maxAttempts, error: lastError };
    }
}

export const emailService = new EmailService();
