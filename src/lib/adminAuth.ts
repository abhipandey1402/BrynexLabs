// Node-runtime credential checks for the super-admin login route.
import { timingSafeEqual, createHash } from 'crypto';

export function isAdminConfigured(): boolean {
    return Boolean(
        process.env.ADMIN_EMAIL &&
        process.env.ADMIN_PASSWORD &&
        process.env.ADMIN_SESSION_SECRET &&
        process.env.ADMIN_SESSION_SECRET.length >= 16,
    );
}

function safeEqual(a: string, b: string): boolean {
    // Hash both sides so the comparison is constant-time regardless of length.
    const ha = createHash('sha256').update(a).digest();
    const hb = createHash('sha256').update(b).digest();
    return timingSafeEqual(ha, hb);
}

export function verifyCredentials(email: string, password: string): boolean {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) return false;
    const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());
    const passwordOk = safeEqual(password, adminPassword);
    return emailOk && passwordOk;
}
