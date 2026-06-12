import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminSession';

const ADMIN_PREFIX = '/super-admin';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'brynex.in';

/** Page paths that exist on the admin subdomain (clean URLs, no /super-admin prefix). */
const ADMIN_PAGE_PREFIXES = ['/login', '/leads', '/posts'];

function isStaticAsset(pathname: string): boolean {
    return (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/fonts') ||
        /\.[a-zA-Z0-9]+$/.test(pathname) // favicon.ico, robots.txt, images, …
    );
}

function isAdminPagePath(pathname: string): boolean {
    return (
        pathname === '/' ||
        ADMIN_PAGE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    );
}

/**
 * Host-based routing:
 *  - admin.<domain> serves the admin app at clean URLs ("/", "/leads",
 *    "/posts/new", "/login") by rewriting onto /super-admin/* internally.
 *  - The apex/www domain redirects /super-admin/* over to the subdomain.
 *  - Any other host (localhost dev, previews) keeps the classic
 *    /super-admin paths so local workflows are unchanged.
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = (request.headers.get('host') ?? '').toLowerCase();
    const hostname = host.split(':')[0];
    const isAdminHost = hostname.startsWith('admin.');

    if (isAdminHost) {
        if (isStaticAsset(pathname)) return NextResponse.next();

        // Only the admin API belongs on this host.
        if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin')) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Normalize legacy/internal links: /super-admin/leads -> /leads
        if (pathname.startsWith(ADMIN_PREFIX)) {
            const url = request.nextUrl.clone();
            url.pathname = pathname.slice(ADMIN_PREFIX.length) || '/';
            return NextResponse.redirect(url);
        }

        // Non-admin pages (e.g. /blog) belong on the main site.
        if (!pathname.startsWith('/api/admin') && !isAdminPagePath(pathname)) {
            const url = request.nextUrl.clone();
            url.host = host.replace(/^admin\./, '');
            return NextResponse.redirect(url);
        }

        const token = request.cookies.get(ADMIN_COOKIE)?.value;
        const isAuthenticated = await verifySessionToken(token);

        // Public endpoints: the login screen and the login API.
        if (pathname === '/login' || pathname === '/api/admin/login') {
            if (pathname === '/login') {
                if (isAuthenticated) {
                    const from = request.nextUrl.searchParams.get('from');
                    const url = request.nextUrl.clone();
                    url.pathname = from && from.startsWith('/') && !from.startsWith('//') ? from : '/';
                    url.search = '';
                    return NextResponse.redirect(url);
                }
                const url = request.nextUrl.clone();
                url.pathname = `${ADMIN_PREFIX}/login`;
                return NextResponse.rewrite(url);
            }
            return NextResponse.next();
        }

        if (!isAuthenticated) {
            if (pathname.startsWith('/api/admin')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.search = '';
            url.searchParams.set('from', pathname);
            return NextResponse.redirect(url);
        }

        if (pathname.startsWith('/api/admin')) return NextResponse.next();

        // Authenticated page: serve the real route under /super-admin.
        const url = request.nextUrl.clone();
        url.pathname = pathname === '/' ? ADMIN_PREFIX : `${ADMIN_PREFIX}${pathname}`;
        return NextResponse.rewrite(url);
    }

    // ----- Main domain / other hosts -----

    // In production the admin lives on the subdomain — move old URLs there.
    if (
        pathname.startsWith(ADMIN_PREFIX) &&
        (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`)
    ) {
        const url = request.nextUrl.clone();
        url.host = `admin.${ROOT_DOMAIN}`;
        url.pathname = pathname.slice(ADMIN_PREFIX.length) || '/';
        return NextResponse.redirect(url);
    }

    // Classic /super-admin behavior (local dev, preview deployments).
    if (pathname.startsWith(ADMIN_PREFIX) || pathname.startsWith('/api/admin')) {
        const token = request.cookies.get(ADMIN_COOKIE)?.value;

        if (pathname === `${ADMIN_PREFIX}/login` || pathname === '/api/admin/login') {
            if (pathname === `${ADMIN_PREFIX}/login` && (await verifySessionToken(token))) {
                const from = request.nextUrl.searchParams.get('from');
                const target = from && from.startsWith(ADMIN_PREFIX) ? from : ADMIN_PREFIX;
                return NextResponse.redirect(new URL(target, request.url));
            }
            return NextResponse.next();
        }

        const isAuthenticated = await verifySessionToken(token);
        if (isAuthenticated) return NextResponse.next();

        if (pathname.startsWith('/api/admin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const loginUrl = new URL(`${ADMIN_PREFIX}/login`, request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // Host-based routing needs to see every request; static assets are
    // filtered both here and in isStaticAsset() for the admin host.
    matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts).*)'],
};
