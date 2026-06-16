import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDbServiceBySlug, upsertDbService, deleteDbService, validateServiceInput } from '@/lib/servicePageStore';
import { isDbConfigured } from '@/lib/mongodb';
import { pingIndexNow } from '@/lib/indexnow';

export const runtime = 'nodejs';

interface Params {
    params: { slug: string };
}

function dbNotConfigured() {
    return NextResponse.json(
        { error: 'MongoDB is not configured. Set MONGODB_URI in the environment.' },
        { status: 503 },
    );
}

async function revalidateService(slug: string) {
    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    revalidatePath(`/in/services/${slug}`);
    revalidatePath('/sitemap.xml');
    await pingIndexNow(['/services', `/services/${slug}`, `/in/services/${slug}`]);
}

export async function GET(_request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();
    const service = await getDbServiceBySlug(params.slug);
    if (!service) return NextResponse.json({ error: 'Service page not found.' }, { status: 404 });
    return NextResponse.json({ service });
}

export async function PUT(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();

    let raw: unknown;
    try {
        raw = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { input, error } = validateServiceInput(raw);
    if (!input) return NextResponse.json({ error }, { status: 400 });

    try {
        // The slug in the URL is authoritative — the editor never renames a page.
        const service = await upsertDbService(params.slug, input);
        await revalidateService(params.slug);
        return NextResponse.json({ service });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save the service page.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();
    const deleted = await deleteDbService(params.slug);
    if (!deleted) return NextResponse.json({ error: 'Service page not found.' }, { status: 404 });
    // Restores the code-defined version (if any) on the live site.
    await revalidateService(params.slug);
    return NextResponse.json({ ok: true });
}
