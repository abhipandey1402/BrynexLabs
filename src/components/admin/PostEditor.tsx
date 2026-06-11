'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, BlogCategory, BLOG_CATEGORIES } from '@/data/blog';
import { services } from '@/data/services';
import RichTextEditor from './RichTextEditor';
import ArticleProse from '@/components/blog/ArticleProse';

interface PostEditorProps {
    mode: 'create' | 'edit';
    initialPost?: BlogPost;
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/[\s-]+/g, '-')
        .slice(0, 80);
}

function estimateReadTime(html: string): string {
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
}

const FIELD_CLASS = 'w-full rounded-xl border border-border bg-background-card px-4 py-3 text-foreground placeholder:text-foreground-muted placeholder:opacity-50 placeholder:font-normal focus:border-accent focus:outline-none transition-colors';
const LABEL_CLASS = 'block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2';

export default function PostEditor({ mode, initialPost }: PostEditorProps) {
    const router = useRouter();

    const [title, setTitle] = useState(initialPost?.title ?? '');
    const [slug, setSlug] = useState(initialPost?.slug ?? '');
    const [slugTouched, setSlugTouched] = useState(mode === 'edit');
    const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '');
    const [author, setAuthor] = useState(initialPost?.author ?? 'Brynex Labs Engineering');
    const [category, setCategory] = useState<BlogCategory>(initialPost?.category ?? 'Engineering');
    const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription ?? '');
    const [content, setContent] = useState(initialPost?.content ?? '');
    const [relatedServices, setRelatedServices] = useState<string[]>(initialPost?.relatedServices ?? []);
    const [techTags, setTechTags] = useState<string[]>(initialPost?.techTags ?? []);
    const [customTag, setCustomTag] = useState('');
    const [tab, setTab] = useState<'write' | 'preview'>('write');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const techSuggestions = useMemo(() => {
        const names = services.flatMap((s) => s.techStack.map((t) => t.name));
        return Array.from(new Set(names));
    }, []);

    const readTime = useMemo(() => estimateReadTime(content), [content]);

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!slugTouched) setSlug(slugify(value));
    };

    const toggleService = (serviceSlug: string) => {
        setRelatedServices((prev) =>
            prev.includes(serviceSlug) ? prev.filter((s) => s !== serviceSlug) : [...prev, serviceSlug],
        );
    };

    const toggleTag = (tag: string) => {
        setTechTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const addCustomTag = () => {
        const tag = customTag.trim();
        if (tag && !techTags.includes(tag)) setTechTags((prev) => [...prev, tag]);
        setCustomTag('');
    };

    const save = async (status: 'draft' | 'published') => {
        setSaving(true);
        setError(null);

        const payload = {
            title,
            slug,
            excerpt,
            author,
            category,
            seoDescription,
            // The editor wraps the CTA marker in a paragraph; the renderer expects the bare token.
            content: content.replace(/<p>\s*\[CTA\]\s*<\/p>/g, '[CTA]'),
            relatedServices,
            techTags,
            status,
        };

        try {
            const isEdit = mode === 'edit' && initialPost;
            const res = await fetch(
                isEdit ? `/api/admin/posts/${initialPost.slug}` : '/api/admin/posts',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                },
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Something went wrong while saving.');
                return;
            }
            router.push('/super-admin');
            router.refresh();
        } catch {
            setError('Network error — the article was not saved.');
        } finally {
            setSaving(false);
        }
    };

    const previewPost: BlogPost = {
        slug: slug || 'preview',
        title: title || 'Untitled article',
        excerpt,
        author,
        date: initialPost?.date ?? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        readTime,
        category,
        content,
        seoDescription,
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
            {/* ===== Main column ===== */}
            <div className="space-y-6 min-w-0">
                {error && (
                    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="post-title" className={LABEL_CLASS}>Title</label>
                    <input
                        id="post-title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. How to Build Production-Grade AI Agents in 2026"
                        className={`${FIELD_CLASS} text-xl font-bold placeholder:text-base`}
                    />
                </div>

                <div>
                    <label htmlFor="post-excerpt" className={LABEL_CLASS}>Excerpt <span className="text-foreground-muted font-medium normal-case">— shown on blog cards</span></label>
                    <textarea
                        id="post-excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={2}
                        placeholder="e.g. A one-or-two sentence hook that makes readers click…"
                        className={FIELD_CLASS}
                    />
                </div>

                {/* Write / Preview tabs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1 p-1 rounded-xl bg-background-secondary border border-border" role="tablist">
                            {(['write', 'preview'] as const).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    role="tab"
                                    aria-selected={tab === t}
                                    onClick={() => setTab(t)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
                                        tab === t
                                            ? 'bg-accent text-white shadow-button scale-[1.02]'
                                            : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'
                                    }`}
                                >
                                    {t === 'write' ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                    {t}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest">{readTime}</span>
                    </div>

                    {tab === 'write' ? (
                        <>
                            <RichTextEditor initialContent={content} onChange={setContent} />
                            <p className="mt-2 text-xs text-foreground-muted">
                                Tip: the <span className="font-bold text-accent">+ CTA Block</span> button drops a [CTA] marker — it renders as the &ldquo;Talk to an Expert&rdquo; conversion block on the live article.
                            </p>
                        </>
                    ) : (
                        <div className="rounded-xl border border-border bg-background p-6 md:p-10">
                            {/* Mirrors the live article header so the preview is faithful */}
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center gap-3 mb-6 text-xs font-black uppercase tracking-widest">
                                    <span className="text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">{previewPost.category}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                                    <span className="text-foreground-muted">{previewPost.readTime}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-6 leading-[1.15]">{previewPost.title}</h1>
                                <div className="flex items-center justify-center gap-4 text-foreground-secondary font-semibold text-sm">
                                    <span className="text-foreground">{previewPost.author}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-border/80" />
                                    <span>{previewPost.date}</span>
                                </div>
                            </div>
                            <ArticleProse content={content || '<p>Nothing to preview yet — start writing.</p>'} />
                        </div>
                    )}
                </div>
            </div>

            {/* ===== Sidebar ===== */}
            <aside className="space-y-6 xl:sticky xl:top-24">
                {/* Publish */}
                <div className="rounded-2xl border border-border bg-background-card p-6 space-y-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Publish</h2>
                    {mode === 'edit' && initialPost?.status && (
                        <p className="text-xs text-foreground-muted">
                            Current status:{' '}
                            <span className={`font-bold ${initialPost.status === 'published' ? 'text-green-500' : 'text-amber-500'}`}>
                                {initialPost.status}
                            </span>
                        </p>
                    )}
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => save('published')}
                            disabled={saving}
                            className="w-full py-3 rounded-xl bg-accent-gradient text-white font-bold shadow-button hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving…' : mode === 'edit' ? 'Update & Publish' : 'Publish Article'}
                        </button>
                        <button
                            type="button"
                            onClick={() => save('draft')}
                            disabled={saving}
                            className="w-full py-3 rounded-xl border border-border bg-background text-foreground-secondary font-bold hover:border-accent hover:text-foreground transition-colors disabled:opacity-50"
                        >
                            Save as Draft
                        </button>
                    </div>
                </div>

                {/* Meta */}
                <div className="rounded-2xl border border-border bg-background-card p-6 space-y-5">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Article Settings</h2>
                    <div>
                        <label htmlFor="post-slug" className={LABEL_CLASS}>URL Slug</label>
                        <div className="flex items-center gap-1 text-sm">
                            <span className="text-foreground-muted shrink-0">/blog/</span>
                            <input
                                id="post-slug"
                                value={slug}
                                onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                                placeholder="your-article-slug"
                                className={`${FIELD_CLASS} !py-2 font-mono text-sm`}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="post-author" className={LABEL_CLASS}>Author</label>
                        <input id="post-author" value={author} onChange={(e) => setAuthor(e.target.value)} className={FIELD_CLASS} />
                    </div>
                    <div>
                        <label htmlFor="post-category" className={LABEL_CLASS}>Category</label>
                        <select
                            id="post-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as BlogCategory)}
                            className={FIELD_CLASS}
                        >
                            {BLOG_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* SEO */}
                <div className="rounded-2xl border border-border bg-background-card p-6 space-y-3">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">SEO</h2>
                    <div>
                        <label htmlFor="post-seo" className={LABEL_CLASS}>Meta Description</label>
                        <textarea
                            id="post-seo"
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            rows={3}
                            placeholder="e.g. The summary search engines show under your title — make it count…"
                            className={FIELD_CLASS}
                        />
                        <p className={`mt-1.5 text-xs font-semibold ${seoDescription.length >= 50 && seoDescription.length <= 170 ? 'text-green-500' : 'text-foreground-muted'}`}>
                            {seoDescription.length}/170 characters {seoDescription.length < 50 && '(aim for 50+)'}
                        </p>
                    </div>
                </div>

                {/* Service mapping */}
                <div className="rounded-2xl border border-border bg-background-card p-6 space-y-3">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Related Services</h2>
                    <p className="text-xs text-foreground-muted">Mapped services render as &ldquo;Related Services&rdquo; cards under the article.</p>
                    <div className="space-y-2">
                        {services.map((service) => {
                            const checked = relatedServices.includes(service.slug);
                            return (
                                <button
                                    key={service.slug}
                                    type="button"
                                    onClick={() => toggleService(service.slug)}
                                    aria-pressed={checked}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-colors ${
                                        checked
                                            ? 'border-accent bg-accent/10 text-foreground'
                                            : 'border-border bg-background text-foreground-secondary hover:border-accent/50'
                                    }`}
                                >
                                    <span className={`flex items-center justify-center w-5 h-5 rounded-md border text-[10px] font-black shrink-0 ${checked ? 'bg-accent border-accent text-white' : 'border-border text-transparent'}`}>✓</span>
                                    {service.shortTitle ?? service.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tech tags */}
                <div className="rounded-2xl border border-border bg-background-card p-6 space-y-3">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Tech Stack Tags</h2>
                    <p className="text-xs text-foreground-muted">Tag the technologies this article covers — shown as chips on the article.</p>
                    {techTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {techTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    title={`Remove ${tag}`}
                                    className="px-3 py-1.5 rounded-full bg-accent text-white text-xs font-bold hover:brightness-110 transition-all"
                                >
                                    {tag} ✕
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {techSuggestions.filter((t) => !techTags.includes(t)).map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className="px-3 py-1.5 rounded-full border border-border bg-background text-foreground-secondary text-xs font-semibold hover:border-accent hover:text-foreground transition-colors"
                            >
                                + {tag}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={customTag}
                            onChange={(e) => setCustomTag(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }}
                            placeholder="Add a custom tag…"
                            className={`${FIELD_CLASS} !py-2 text-sm`}
                        />
                        <button
                            type="button"
                            onClick={addCustomTag}
                            className="shrink-0 px-4 rounded-xl border border-border text-sm font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
