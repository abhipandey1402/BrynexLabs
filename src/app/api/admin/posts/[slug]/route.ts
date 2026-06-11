import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDbPostBySlug, updateDbPost, deleteDbPost, validatePostInput } from '@/lib/blogStore';
import { isDbConfigured } from '@/lib/mongodb';

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

function revalidateBlog(slug: string) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');
}

export async function GET(_request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();
    const post = await getDbPostBySlug(params.slug, { includeDrafts: true });
    if (!post) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();

    let raw: unknown;
    try {
        raw = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { input, error } = validatePostInput(raw);
    if (!input) return NextResponse.json({ error }, { status: 400 });

    try {
        const post = await updateDbPost(params.slug, input);
        if (!post) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
        revalidateBlog(params.slug);
        if (post.slug !== params.slug) revalidateBlog(post.slug);
        return NextResponse.json({ post });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update the article.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    if (!isDbConfigured()) return dbNotConfigured();
    const deleted = await deleteDbPost(params.slug);
    if (!deleted) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    revalidateBlog(params.slug);
    return NextResponse.json({ ok: true });
}
