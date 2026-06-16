import 'server-only';
import { services as staticServices, type ServiceDetail } from '@/data/services';
import { getDbServices, getDbServiceBySlug } from './servicePageStore';

/**
 * The full set of service slugs the site can render — the union of
 * code-defined services and any CMS-only pages. Used by generateStaticParams.
 */
export async function getAllServiceSlugs(): Promise<string[]> {
    let dbServices: ServiceDetail[] = [];
    try {
        dbServices = await getDbServices();
    } catch (err) {
        console.error('[services] Failed to load services from MongoDB:', err);
    }
    const slugs = new Set(staticServices.map((s) => s.slug));
    dbServices.forEach((s) => slugs.add(s.slug));
    return Array.from(slugs);
}

/**
 * Resolve a service by slug, preferring the CMS copy. A DB document with the
 * same slug as a code-defined service overrides it on the live site; deleting
 * the DB copy restores the original. Falls back to static on any DB error so
 * the marketing pages stay up even if MongoDB is unreachable.
 */
export async function getServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
    try {
        const dbService = await getDbServiceBySlug(slug);
        if (dbService) return dbService;
    } catch (err) {
        console.error('[services] Failed to load service from MongoDB:', err);
    }
    return staticServices.find((s) => s.slug === slug);
}

/** India-market variant resolver — only services that define marketIN qualify. */
export async function getIndiaServiceBySlug(slug: string): Promise<ServiceDetail | undefined> {
    const service = await getServiceBySlug(slug);
    return service?.marketIN ? service : undefined;
}

export async function getAllIndiaServiceSlugs(): Promise<string[]> {
    const slugs = await getAllServiceSlugs();
    const resolved = await Promise.all(slugs.map((s) => getServiceBySlug(s)));
    return resolved.filter((s): s is ServiceDetail => Boolean(s?.marketIN)).map((s) => s.slug);
}
