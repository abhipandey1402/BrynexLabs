import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, isAdminConfigured } from '@/lib/adminAuth';
import { ADMIN_COOKIE, createSessionToken } from '@/lib/adminSession';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    if (!isAdminConfigured()) {
        return NextResponse.json(
            { error: 'Admin access is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the environment.' },
            { status: 503 },
        );
    }

    let body: { email?: string; password?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (!body.email || !body.password || !verifyCredentials(body.email, body.password)) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
    });
    return response;
}
