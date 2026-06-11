/**
 * Seeds CMS blog posts from scripts/seed-content/*.mjs into MongoDB.
 *
 * Runs the same validation + sanitization rules as the admin API
 * (src/lib/blogStore.ts), so seeded posts are indistinguishable from
 * posts created through the CMS. Upserts by slug — safe to re-run.
 *
 * Usage: node scripts/seed-blogs.mjs [--dry-run]
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { MongoClient } from 'mongodb';
import sanitizeHtml from 'sanitize-html';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'scripts', 'seed-content');
const DRY_RUN = process.argv.includes('--dry-run');

const BLOG_CATEGORIES = ['AI', 'SaaS', 'Cloud', 'DevOps', 'Engineering'];
const SERVICE_SLUGS = ['ai-agents-automation', 'ai-native-software-engineering', 'saas-seo'];
// Slugs owned by src/data/blog.tsx — seeding one would silently override it.
const STATIC_SLUGS = [
    'cloud-vs-on-premise-decision',
    'ai-agents-in-business-practical-guide',
    'choose-right-tech-stack-saas',
];

// Mirrors sanitizeContent() in src/lib/blogStore.ts.
function sanitizeContent(html) {
    return sanitizeHtml(html, {
        allowedTags: [
            'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u', 's',
            'mark', 'blockquote', 'br', 'hr', 'code', 'pre', 'img', 'figure', 'figcaption',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
        ],
        allowedAttributes: {
            a: ['href', 'target', 'rel'],
            img: ['src', 'alt', 'width', 'height'],
            th: ['colspan', 'rowspan'],
            td: ['colspan', 'rowspan'],
            p: ['style'],
            h2: ['style'],
            h3: ['style'],
            h4: ['style'],
        },
        allowedStyles: { '*': { 'text-align': [/^(left|center|right|justify)$/] } },
        allowedSchemes: ['https', 'http', 'mailto'],
        transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true) },
    });
}

function visibleWords(html) {
    return html.replace(/\[CTA\]/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean);
}

function estimateReadTime(html) {
    return `${Math.max(1, Math.round(visibleWords(html).length / 200))} min read`;
}

function validate(post, file) {
    const errors = [];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug ?? '')) errors.push('invalid slug');
    if (STATIC_SLUGS.includes(post.slug)) errors.push('slug collides with a code-defined article');
    if (!post.title || post.title.length < 4) errors.push('title too short');
    if (!post.excerpt || post.excerpt.length < 20) errors.push('excerpt too short');
    if (!post.author) errors.push('missing author');
    if (!BLOG_CATEGORIES.includes(post.category)) errors.push(`invalid category "${post.category}"`);
    if (!post.seoDescription || post.seoDescription.length < 50 || post.seoDescription.length > 170) {
        errors.push(`seoDescription must be 50-170 chars (got ${post.seoDescription?.length ?? 0})`);
    }
    const ctaCount = (post.content.match(/\[CTA\]/g) ?? []).length;
    if (ctaCount !== 2) errors.push(`expected 2 [CTA] markers, found ${ctaCount}`);
    const words = visibleWords(post.content).length;
    if (words < 1500) errors.push(`content too short: ${words} words`);
    const badServices = (post.relatedServices ?? []).filter((s) => !SERVICE_SLUGS.includes(s));
    if (badServices.length) errors.push(`unknown relatedServices: ${badServices.join(', ')}`);
    if (errors.length) throw new Error(`${file}: ${errors.join('; ')}`);
    return words;
}

function loadEnv() {
    const env = {};
    for (const line of readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
        const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
        if (m) env[m[1]] = m[2];
    }
    return env;
}

// Publish order, newest first — high-intent buyer topics get the freshest dates.
const PREFERRED_ORDER = [
    'how-much-do-ai-agents-cost-2026',
    'ai-agents-vs-rpa-vs-zapier-which-automation-fits',
    'automating-customer-support-ai-agents-playbook',
    'ai-agent-readiness-checklist',
    'back-office-automation-ai-agents',
    'rag-pipeline-business-knowledge-guide',
    'ai-agent-guardrails-evals-production',
    'multi-agent-systems-when-to-use',
    'ai-native-software-development-lean-teams',
    'mvp-to-production-saas-roadmap',
];
const rank = (f) => {
    const i = PREFERRED_ORDER.indexOf(f.replace(/\.mjs$/, ''));
    return i === -1 ? PREFERRED_ORDER.length : i;
};
const files = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mjs'))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
if (files.length === 0) {
    console.error('No content files found in', CONTENT_DIR);
    process.exit(1);
}

const posts = [];
for (const file of files) {
    const mod = await import(pathToFileURL(path.join(CONTENT_DIR, file)).href);
    const post = mod.default;
    if (!post?.slug) continue; // helper scripts in the same dir
    const words = validate(post, file);
    posts.push({ ...post, content: sanitizeContent(post.content), _words: words, _file: file });
}

// Stagger publish dates over recent weeks (newest first by file order) so the
// blog reads as an active publication rather than a single bulk drop.
const newest = new Date('2026-06-10T09:30:00.000Z');
const DAY = 24 * 60 * 60 * 1000;
const gaps = [0, 4, 9, 13, 18, 23, 27, 32, 38, 43, 48, 54];

const env = loadEnv();
if (!env.MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
}

console.log(`${DRY_RUN ? '[dry-run] ' : ''}Seeding ${posts.length} posts:\n`);

const client = DRY_RUN ? null : new MongoClient(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
if (client) await client.connect();
const col = client?.db(env.MONGODB_DB || 'brynex').collection('blog_posts');

let inserted = 0;
let updated = 0;
for (const [i, post] of posts.entries()) {
    const publishedAt = new Date(newest.getTime() - (gaps[i] ?? i * 5) * DAY);
    const iso = publishedAt.toISOString();
    const doc = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        content: post.content,
        seoDescription: post.seoDescription,
        relatedServices: post.relatedServices ?? [],
        techTags: post.techTags ?? [],
        status: 'published',
        readTime: estimateReadTime(post.content),
        date: publishedAt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        publishedAt: iso,
        updatedAt: iso,
    };
    console.log(`  ${doc.date}  ${post.slug}  (${post._words} words, ${doc.readTime})`);
    if (!DRY_RUN) {
        const res = await col.updateOne(
            { slug: post.slug },
            { $set: doc, $setOnInsert: { createdAt: iso } },
            { upsert: true },
        );
        if (res.upsertedCount) inserted += 1;
        else updated += 1;
    }
}

if (client) {
    console.log(`\nDone: ${inserted} inserted, ${updated} updated.`);
    await client.close();
}
