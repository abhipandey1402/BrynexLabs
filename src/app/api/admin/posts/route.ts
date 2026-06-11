import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDbPosts, createDbPost, validatePostInput } from '@/lib/blogStore';
import { isDbConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

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

export async function GET() {
    if (!isDbConfigured()) return dbNotConfigured();
    const posts = await getDbPosts({ includeDrafts: true });
    return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
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
        const post = await createDbPost(input);
        revalidateBlog(post.slug);
        return NextResponse.json({ post }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create the article.';
        const isConflict = message.includes('slug');
        return NextResponse.json({ error: message }, { status: isConflict ? 409 : 500 });
    }
}
