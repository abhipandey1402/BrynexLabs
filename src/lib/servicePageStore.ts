import 'server-only';
import { getDb, isDbConfigured } from './mongodb';
import {
    services as staticServices,
    SERVICE_SECTIONS,
    CUSTOM_SECTION_LAYOUTS,
    type ServiceDetail,
    type ServiceTheme,
    type ServiceSectionConfig,
    type ServiceSectionKey,
    type SectionBackground,
    type HeroLayout,
    type ServiceButtonStyle,
    type ServiceDensity,
    type CustomSection,
    type CustomSectionLayout,
} from '@/data/services';
import { isValidHex } from './serviceTheme';

const COLLECTION = 'service_pages';

/** Stored shape: the full editable service plus CMS bookkeeping. */
interface ServicePageDoc extends ServiceDetail {
    createdAt: string;
    updatedAt: string;
}

let indexesEnsured = false;

async function collection() {
    const db = await getDb();
    const col = db.collection<ServicePageDoc>(COLLECTION);
    if (!indexesEnsured) {
        indexesEnsured = true;
        // Fire-and-forget: index builds are idempotent and must not block reads.
        Promise.all([
            col.createIndex({ slug: 1 }, { unique: true }),
            col.createIndex({ updatedAt: -1 }),
        ]).catch(() => { indexesEnsured = false; });
    }
    return col;
}

function toService(doc: ServicePageDoc): ServiceDetail {
    // Drop CMS bookkeeping + Mongo _id so the public shape matches the static one.
    const service = { ...doc } as Partial<ServicePageDoc> & { _id?: unknown };
    delete service.createdAt;
    delete service.updatedAt;
    delete service._id;
    return service as ServiceDetail;
}

// ----- validation helpers -------------------------------------------------

const SECTION_KEYS = new Set<ServiceSectionKey>(SERVICE_SECTIONS.map((s) => s.key));
const HERO_LAYOUTS: HeroLayout[] = ['centered', 'split', 'minimal'];
const BUTTON_STYLES: ServiceButtonStyle[] = ['gradient', 'solid', 'outline'];
const DENSITIES: ServiceDensity[] = ['compact', 'comfortable', 'spacious'];
const BACKGROUNDS: SectionBackground[] = ['default', 'secondary', 'muted', 'accent'];

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const trimCap = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function strList(v: unknown, max = 50, itemMax = 600): string[] {
    if (!Array.isArray(v)) return [];
    return v
        .filter((s): s is string => typeof s === 'string')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => s.slice(0, itemMax))
        .slice(0, max);
}

const LAYOUTS = new Set<CustomSectionLayout>(CUSTOM_SECTION_LAYOUTS.map((l) => l.value));

/** Validate admin-authored custom sections; returns the clean list (capped). */
function validateCustomSections(raw: unknown): CustomSection[] {
    if (!Array.isArray(raw)) return [];
    const seen = new Set<string>();
    const out: CustomSection[] = [];
    for (const s of raw) {
        if (!isObj(s)) continue;
        const id = typeof s.id === 'string' ? s.id.trim() : '';
        if (!/^custom-[a-z0-9-]{1,40}$/i.test(id) || seen.has(id)) continue;
        const layout = (typeof s.layout === 'string' && LAYOUTS.has(s.layout as CustomSectionLayout)) ? (s.layout as CustomSectionLayout) : 'text';
        const items = Array.isArray(s.items)
            ? s.items.filter(isObj).map((it) => ({ title: trimCap(it.title, 200), description: trimCap(it.description, 800) || undefined })).filter((it) => it.title).slice(0, 12)
            : [];
        const section: CustomSection = { id, layout };
        const eyebrow = trimCap(s.eyebrow, 60); if (eyebrow) section.eyebrow = eyebrow;
        const heading = trimCap(s.heading, 200); if (heading) section.heading = heading;
        const subheading = trimCap(s.subheading, 400); if (subheading) section.subheading = subheading;
        const body = trimCap(s.body, 4000); if (body) section.body = body;
        const buttonText = trimCap(s.buttonText, 80); if (buttonText) section.buttonText = buttonText;
        if (items.length) section.items = items;
        seen.add(id);
        out.push(section);
        if (out.length >= 12) break;
    }
    return out;
}

function validateTheme(raw: unknown, customIds: Set<string>): ServiceTheme | undefined {
    if (!isObj(raw)) return undefined;
    const theme: ServiceTheme = {};

    if (typeof raw.accentColor === 'string' && isValidHex(raw.accentColor)) theme.accentColor = raw.accentColor.trim();
    if (typeof raw.accentLight === 'string' && isValidHex(raw.accentLight)) theme.accentLight = raw.accentLight.trim();
    if (typeof raw.heroLayout === 'string' && HERO_LAYOUTS.includes(raw.heroLayout as HeroLayout)) theme.heroLayout = raw.heroLayout as HeroLayout;
    if (typeof raw.buttonStyle === 'string' && BUTTON_STYLES.includes(raw.buttonStyle as ServiceButtonStyle)) theme.buttonStyle = raw.buttonStyle as ServiceButtonStyle;
    if (typeof raw.density === 'string' && DENSITIES.includes(raw.density as ServiceDensity)) theme.density = raw.density as ServiceDensity;

    if (Array.isArray(raw.sections)) {
        const seen = new Set<string>();
        const sections: ServiceSectionConfig[] = [];
        for (const s of raw.sections) {
            if (!isObj(s) || typeof s.key !== 'string') continue;
            const key = s.key;
            const known = SECTION_KEYS.has(key as ServiceSectionKey) || customIds.has(key);
            if (!known || seen.has(key)) continue;
            seen.add(key);
            sections.push({
                key,
                visible: s.visible !== false,
                background: BACKGROUNDS.includes(s.background as SectionBackground) ? (s.background as SectionBackground) : 'default',
            });
        }
        if (sections.length) theme.sections = sections;
    }

    return Object.keys(theme).length ? theme : undefined;
}

/**
 * Validate and normalise a service-page payload. Only slug/title/description/SEO
 * are strictly required; every other field is sanitised defensively so a
 * partial edit can never produce a malformed document.
 */
export function validateServiceInput(raw: unknown): { input?: ServiceDetail; error?: string } {
    if (!isObj(raw)) return { error: 'Invalid request body.' };

    const slug = trimCap(raw.slug, 80).toLowerCase();
    const title = trimCap(raw.title, 160);
    const description = trimCap(raw.description, 400);
    const seo = isObj(raw.seo) ? raw.seo : {};
    const seoTitle = trimCap(seo.title, 160);
    const seoMeta = trimCap(seo.metaDescription, 320);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: 'Slug must be lowercase letters, numbers, and hyphens (e.g. "ai-agents").' };
    if (title.length < 3) return { error: 'Title must be at least 3 characters.' };
    if (description.length < 20) return { error: 'Description must be at least 20 characters.' };
    if (seoTitle.length < 10) return { error: 'SEO title must be at least 10 characters.' };
    if (seoMeta.length < 50 || seoMeta.length > 320) return { error: 'SEO meta description should be 50–320 characters.' };

    const input: ServiceDetail = {
        slug,
        title,
        description,
        seo: { title: seoTitle, metaDescription: seoMeta },
        challenges: strList(raw.challenges),
        solutions: strList(raw.solutions),
        techStack: Array.isArray(raw.techStack)
            ? raw.techStack
                .filter(isObj)
                .map((t) => ({ name: trimCap(t.name, 60), icon: trimCap(t.icon, 8) }))
                .filter((t) => t.name)
                .slice(0, 60)
            : [],
        faqs: Array.isArray(raw.faqs)
            ? raw.faqs
                .filter(isObj)
                .map((f) => ({ question: trimCap(f.question, 300), answer: trimCap(f.answer, 1500) }))
                .filter((f) => f.question && f.answer)
                .slice(0, 30)
            : [],
    };

    // ----- optional scalar copy -----
    const opt = (k: keyof ServiceDetail, max: number) => {
        const val = trimCap(raw[k as string], max);
        if (val) (input as unknown as Record<string, unknown>)[k as string] = val;
    };
    opt('shortTitle', 120);
    opt('cardDescription', 300);
    opt('badge', 80);
    opt('hook', 600);
    opt('problemHeading', 160);
    opt('problemSummary', 600);
    opt('processHeading', 160);
    opt('processSummary', 600);

    // ----- optional structured blocks -----
    if (Array.isArray(raw.metrics)) {
        const metrics = raw.metrics.filter(isObj).map((m) => ({ value: trimCap(m.value, 40), label: trimCap(m.label, 120) })).filter((m) => m.value && m.label).slice(0, 8);
        if (metrics.length) input.metrics = metrics;
    }

    if (isObj(raw.subServices)) {
        const heading = trimCap(raw.subServices.heading, 160);
        const items = Array.isArray(raw.subServices.items)
            ? raw.subServices.items.filter(isObj).map((it) => ({ title: trimCap(it.title, 160), intro: trimCap(it.intro, 300) || undefined, points: strList(it.points, 12, 300) })).filter((it) => it.title).slice(0, 12)
            : [];
        if (heading && items.length) input.subServices = { heading, subheading: trimCap(raw.subServices.subheading, 300) || undefined, items };
    }

    if (isObj(raw.whyUs)) {
        const heading = trimCap(raw.whyUs.heading, 160);
        const items = Array.isArray(raw.whyUs.items)
            ? raw.whyUs.items.filter(isObj).map((it) => ({ title: trimCap(it.title, 160), description: trimCap(it.description, 600) })).filter((it) => it.title && it.description).slice(0, 12)
            : [];
        if (heading && items.length) input.whyUs = { heading, items };
    }

    if (isObj(raw.comparison)) {
        const heading = trimCap(raw.comparison.heading, 160);
        const rows = Array.isArray(raw.comparison.rows)
            ? raw.comparison.rows.filter(isObj).map((r) => ({ typical: trimCap(r.typical, 400), ours: trimCap(r.ours, 400) })).filter((r) => r.typical && r.ours).slice(0, 20)
            : [];
        if (heading && rows.length) input.comparison = { heading, rows };
    }

    if (isObj(raw.pricing)) {
        const heading = trimCap(raw.pricing.heading, 160);
        const tiers = Array.isArray(raw.pricing.tiers)
            ? raw.pricing.tiers.filter(isObj).map((t) => ({
                name: trimCap(t.name, 120),
                tagline: trimCap(t.tagline, 200) || undefined,
                priceLabel: trimCap(t.priceLabel, 60) || undefined,
                price: trimCap(t.price, 60),
                priceIN: trimCap(t.priceIN, 60) || undefined,
                period: trimCap(t.period, 40) || undefined,
                features: strList(t.features, 20, 300),
                highlighted: t.highlighted === true,
                buttonText: trimCap(t.buttonText, 80) || 'Get started',
            })).filter((t) => t.name && t.price).slice(0, 6)
            : [];
        if (heading && tiers.length) input.pricing = { heading, subheading: trimCap(raw.pricing.subheading, 300) || undefined, tiers, assurances: strList(raw.pricing.assurances, 10, 200) };
    }

    if (Array.isArray(raw.process)) {
        const process = raw.process.filter(isObj).map((p) => ({ title: trimCap(p.title, 160), description: trimCap(p.description, 800) })).filter((p) => p.title && p.description).slice(0, 12);
        if (process.length) input.process = process;
    }

    if (isObj(raw.targetAudience)) {
        const fr = strList(raw.targetAudience.for, 12, 300);
        const notFor = strList(raw.targetAudience.notFor, 12, 300);
        if (fr.length || notFor.length) input.targetAudience = { for: fr, notFor };
    }

    if (isObj(raw.testimonial)) {
        const quote = trimCap(raw.testimonial.quote, 800);
        if (quote) input.testimonial = { quote, author: trimCap(raw.testimonial.author, 120), role: trimCap(raw.testimonial.role, 160), avatar: trimCap(raw.testimonial.avatar, 500) || undefined };
    }

    if (isObj(raw.customCta)) {
        const title2 = trimCap(raw.customCta.title, 200);
        if (title2) input.customCta = { title: title2, subtitle: trimCap(raw.customCta.subtitle, 600), buttonText: trimCap(raw.customCta.buttonText, 80) || 'Start a project', bullets: strList(raw.customCta.bullets, 8, 200) };
    }

    if (isObj(raw.marketIN)) {
        const m = raw.marketIN;
        const marketIN: NonNullable<ServiceDetail['marketIN']> = {};
        if (isObj(m.seo)) {
            const t = trimCap(m.seo.title, 160);
            const d = trimCap(m.seo.metaDescription, 320);
            if (t && d) marketIN.seo = { title: t, metaDescription: d };
        }
        const mHook = trimCap(m.hook, 600); if (mHook) marketIN.hook = mHook;
        const mSub = trimCap(m.pricingSubheading, 300); if (mSub) marketIN.pricingSubheading = mSub;
        const mAss = strList(m.assurances, 10, 200); if (mAss.length) marketIN.assurances = mAss;
        const mCta = trimCap(m.ctaSubtitle, 600); if (mCta) marketIN.ctaSubtitle = mCta;
        const mNote = trimCap(m.pricingNote, 200); if (mNote) marketIN.pricingNote = mNote;
        const mFaqs = Array.isArray(m.faqs)
            ? m.faqs.filter(isObj).map((f) => ({ question: trimCap(f.question, 300), answer: trimCap(f.answer, 1500) })).filter((f) => f.question && f.answer).slice(0, 30)
            : [];
        if (mFaqs.length) marketIN.faqs = mFaqs;
        if (Object.keys(marketIN).length) input.marketIN = marketIN;
    }

    const customSections = validateCustomSections(raw.customSections);
    if (customSections.length) input.customSections = customSections;

    const theme = validateTheme(raw.theme, new Set(customSections.map((c) => c.id)));
    if (theme) input.theme = theme;

    return { input };
}

// ----- CRUD ---------------------------------------------------------------

export function isStaticServiceSlug(slug: string): boolean {
    return staticServices.some((s) => s.slug === slug);
}

export async function getDbServices(): Promise<ServiceDetail[]> {
    if (!isDbConfigured()) return [];
    const col = await collection();
    const docs = await col.find({}).sort({ updatedAt: -1 }).toArray();
    return docs.map(toService);
}

export async function getDbServiceBySlug(slug: string): Promise<ServiceDetail | null> {
    if (!isDbConfigured()) return null;
    const col = await collection();
    const doc = await col.findOne({ slug });
    return doc ? toService(doc) : null;
}

export async function createDbService(input: ServiceDetail): Promise<ServiceDetail> {
    const col = await collection();
    const now = new Date().toISOString();
    const doc: ServicePageDoc = { ...input, createdAt: now, updatedAt: now };
    try {
        await col.insertOne(doc);
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && (err as { code?: number }).code === 11000) {
            throw new Error('A service page with this slug already exists.');
        }
        throw err;
    }
    return toService(doc);
}

/** Upsert by slug — the editor always targets a known slug, new or existing. */
export async function upsertDbService(slug: string, input: ServiceDetail): Promise<ServiceDetail> {
    const col = await collection();
    const now = new Date().toISOString();
    const result = await col.findOneAndUpdate(
        { slug },
        { $set: { ...input, slug, updatedAt: now }, $setOnInsert: { createdAt: now } },
        { upsert: true, returnDocument: 'after' },
    );
    if (!result) throw new Error('Failed to save the service page.');
    return toService(result);
}

export async function deleteDbService(slug: string): Promise<boolean> {
    const col = await collection();
    const result = await col.deleteOne({ slug });
    return result.deletedCount === 1;
}
