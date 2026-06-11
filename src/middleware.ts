import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminSession';

const PUBLIC_ADMIN_PATHS = ['/super-admin/login', '/api/admin/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get(ADMIN_COOKIE)?.value;

    if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
        // Already signed in — skip the login screen and land on the dashboard.
        if (pathname === '/super-admin/login' && (await verifySessionToken(token))) {
            const from = request.nextUrl.searchParams.get('from');
            const target = from && from.startsWith('/super-admin') ? from : '/super-admin';
            return NextResponse.redirect(new URL(target, request.url));
        }
        return NextResponse.next();
    }

    const isAuthenticated = await verifySessionToken(token);

    if (isAuthenticated) {
        return NextResponse.next();
    }

    if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = new URL('/super-admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/super-admin/:path*', '/api/admin/:path*'],
};
