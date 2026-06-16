import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDbServices, createDbService, validateServiceInput } from '@/lib/servicePageStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

function dbNotConfigured() {
    return NextResponse.json(
        { error: 'MongoDB is not configured. Set MONGODB_URI in the environment.' },
        { status: 503 },
    );
}

function revalidateService(slug: string) {
    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    revalidatePath(`/in/services/${slug}`);
    revalidatePath('/sitemap.xml');
}

export async function GET() {
    if (!isDbConfigured()) return dbNotConfigured();
    const services = await getDbServices();
    return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
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
        const service = await createDbService(input);
        revalidateService(service.slug);
        return NextResponse.json({ service }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create the service page.';
        const isConflict = message.includes('slug');
        return NextResponse.json({ error: message }, { status: isConflict ? 409 : 500 });
    }
}
