import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
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
}

export const emailService = new EmailService();
