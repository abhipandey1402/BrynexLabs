import 'server-only';
import sanitizeHtml from 'sanitize-html';
import { getDb, isDbConfigured } from './mongodb';
import { BlogPost, BlogCategory, BlogPostStatus, BLOG_CATEGORIES, blogPosts as staticPosts } from '@/data/blog';
import { services } from '@/data/services';

const COLLECTION = 'blog_posts';

export interface BlogPostInput {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    category: BlogCategory;
    content: string;
    seoDescription: string;
    readTime?: string;
    relatedServices?: string[];
    techTags?: string[];
    status?: BlogPostStatus;
}

interface BlogPostDoc extends Omit<BlogPost, 'source'> {
    publishedAt: string;
    status: BlogPostStatus;
    createdAt: string;
    updatedAt: string;
}

let indexesEnsured = false;

async function collection() {
    const db = await getDb();
    const col = db.collection<BlogPostDoc>(COLLECTION);
    if (!indexesEnsured) {
        indexesEnsured = true;
        // Fire-and-forget: index builds are idempotent and must not block reads.
        Promise.all([
            col.createIndex({ slug: 1 }, { unique: true }),
            col.createIndex({ status: 1, publishedAt: -1 }),
            col.createIndex({ category: 1, status: 1 }),
            col.createIndex({ relatedServices: 1 }),
            col.createIndex({ title: 'text', excerpt: 'text', seoDescription: 'text' }),
        ]).catch(() => { indexesEnsured = false; });
    }
    return col;
}

function toPost(doc: BlogPostDoc): BlogPost {
    return {
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        author: doc.author,
        date: doc.date,
        readTime: doc.readTime,
        category: doc.category,
        content: doc.content,
        seoDescription: doc.seoDescription,
        relatedServices: doc.relatedServices ?? [],
        techTags: doc.techTags ?? [],
        publishedAt: doc.publishedAt,
        status: doc.status,
        source: 'db',
    };
}

export function sanitizeContent(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [
            'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u', 's',
            'blockquote', 'br', 'hr', 'code', 'pre', 'img', 'figure', 'figcaption', 'table',
            'thead', 'tbody', 'tr', 'th', 'td',
        ],
        allowedAttributes: {
            a: ['href', 'target', 'rel'],
            img: ['src', 'alt', 'width', 'height'],
        },
        allowedSchemes: ['https', 'http', 'mailto'],
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
        },
    });
}

export function estimateReadTime(html: string): string {
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function validatePostInput(raw: unknown): { input?: BlogPostInput; error?: string } {
    if (typeof raw !== 'object' || raw === null) return { error: 'Invalid request body.' };
    const body = raw as Record<string, unknown>;

    const str = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '');
    const slug = str('slug').toLowerCase();
    const title = str('title');
    const excerpt = str('excerpt');
    const author = str('author');
    const category = str('category') as BlogCategory;
    const content = typeof body.content === 'string' ? body.content : '';
    const seoDescription = str('seoDescription');

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: 'Slug must be lowercase letters, numbers, and hyphens (e.g. "my-article").' };
    if (title.length < 4) return { error: 'Title must be at least 4 characters.' };
    if (excerpt.length < 20) return { error: 'Excerpt must be at least 20 characters.' };
    if (!author) return { error: 'Author is required.' };
    if (!BLOG_CATEGORIES.includes(category)) return { error: 'Choose a valid category.' };
    if (content.replace(/<[^>]+>/g, '').trim().length < 100) return { error: 'Article content is too short — write at least a few paragraphs.' };
    if (seoDescription.length < 50 || seoDescription.length > 170) return { error: 'SEO description should be 50–170 characters.' };

    const validServiceSlugs = new Set(services.map((s) => s.slug));
    const relatedServices = Array.isArray(body.relatedServices)
        ? body.relatedServices.filter((s): s is string => typeof s === 'string' && validServiceSlugs.has(s))
        : [];

    const techTags = Array.isArray(body.techTags)
        ? body.techTags
            .filter((t): t is string => typeof t === 'string')
            .map((t) => t.trim())
            .filter((t) => t.length > 0 && t.length <= 40)
            .slice(0, 30)
        : [];

    const status: BlogPostStatus = body.status === 'draft' ? 'draft' : 'published';

    return {
        input: {
            slug,
            title,
            excerpt,
            author,
            category,
            content: sanitizeContent(content),
            seoDescription,
            readTime: str('readTime') || undefined,
            relatedServices,
            techTags,
            status,
        },
    };
}

export async function getDbPosts(options?: { includeDrafts?: boolean }): Promise<BlogPost[]> {
    if (!isDbConfigured()) return [];
    const col = await collection();
    const filter = options?.includeDrafts ? {} : { status: 'published' as const };
    const docs = await col.find(filter).sort({ publishedAt: -1 }).toArray();
    return docs.map(toPost);
}

export async function getDbPostBySlug(slug: string, options?: { includeDrafts?: boolean }): Promise<BlogPost | null> {
    if (!isDbConfigured()) return null;
    const col = await collection();
    const doc = await col.findOne(
        options?.includeDrafts ? { slug } : { slug, status: 'published' },
    );
    return doc ? toPost(doc) : null;
}

export function isStaticSlug(slug: string): boolean {
    return staticPosts.some((p) => p.slug === slug);
}

export async function createDbPost(input: BlogPostInput): Promise<BlogPost> {
    if (isStaticSlug(input.slug)) {
        throw new Error('This slug is already used by a code-defined article.');
    }
    const col = await collection();
    const now = new Date();
    const doc: BlogPostDoc = {
        ...input,
        readTime: input.readTime ?? estimateReadTime(input.content),
        relatedServices: input.relatedServices ?? [],
        techTags: input.techTags ?? [],
        status: input.status ?? 'published',
        date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        publishedAt: now.toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
    };
    try {
        await col.insertOne(doc);
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && (err as { code?: number }).code === 11000) {
            throw new Error('An article with this slug already exists.');
        }
        throw err;
    }
    return toPost(doc);
}

export async function updateDbPost(slug: string, input: BlogPostInput): Promise<BlogPost | null> {
    if (input.slug !== slug && isStaticSlug(input.slug)) {
        throw new Error('This slug is already used by a code-defined article.');
    }
    const col = await collection();
    const now = new Date().toISOString();
    const result = await col.findOneAndUpdate(
        { slug },
        {
            $set: {
                ...input,
                readTime: input.readTime ?? estimateReadTime(input.content),
                updatedAt: now,
            },
        },
        { returnDocument: 'after' },
    );
    return result ? toPost(result) : null;
}

export async function deleteDbPost(slug: string): Promise<boolean> {
    const col = await collection();
    const result = await col.deleteOne({ slug });
    return result.deletedCount === 1;
}
