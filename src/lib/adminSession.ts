// Edge-safe session helpers (used by middleware) — keep Node-only APIs out of this file.
import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE = 'brynex_admin_session';
const SESSION_TTL = '24h';

function secretKey(): Uint8Array {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret || secret.length < 16) {
        throw new Error('ADMIN_SESSION_SECRET is not set (min 16 chars). Add it to .env.local.');
    }
    return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
    return new SignJWT({ role: 'super-admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(SESSION_TTL)
        .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    try {
        const { payload } = await jwtVerify(token, secretKey());
        return payload.role === 'super-admin';
    } catch {
        return false;
    }
}
