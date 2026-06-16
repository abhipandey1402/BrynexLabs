import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDbPosts, createDbPost, validatePostInput } from '@/lib/blogStore';
import { isDbConfigured } from '@/lib/mongodb';
import { pingIndexNow } from '@/lib/indexnow';

export const runtime = 'nodejs';

function dbNotConfigured() {
    return NextResponse.json(
        { error: 'MongoDB is not configured. Set MONGODB_URI in the environment.' },
        { status: 503 },
    );
}

async function revalidateBlog(slug: string) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');
    await pingIndexNow(['/blog', `/blog/${slug}`]);
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

    // Explicit opt-in lets the CMS override a code-defined article by reusing its slug.
    const allowStaticSlug = (raw as Record<string, unknown>).overrideStatic === true;

    try {
        const post = await createDbPost(input, { allowStaticSlug });
        await revalidateBlog(post.slug);
        return NextResponse.json({ post }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create the article.';
        const isConflict = message.includes('slug');
        return NextResponse.json({ error: message }, { status: isConflict ? 409 : 500 });
    }
}
