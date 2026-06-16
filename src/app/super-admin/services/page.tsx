import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { getDbServices } from '@/lib/servicePageStore';
import { isDbConfigured } from '@/lib/mongodb';
import { services as staticServices } from '@/data/services';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
    const dbConfigured = isDbConfigured();
    let dbServices: Awaited<ReturnType<typeof getDbServices>> = [];
    let dbError: string | null = null;

    if (dbConfigured) {
        try {
            dbServices = await getDbServices();
        } catch {
            dbError = 'Could not reach MongoDB. Check that MONGODB_URI is correct and the database is online.';
        }
    }

    const dbSlugs = new Set(dbServices.map((s) => s.slug));
    const staticSlugs = new Set(staticServices.map((s) => s.slug));
    const overriddenCount = staticServices.filter((s) => dbSlugs.has(s.slug)).length;
    const cmsOnly = dbServices.filter((s) => !staticSlugs.has(s.slug));

    const stats = [
        { label: 'Service Pages', value: staticServices.length + cmsOnly.length },
        { label: 'Customised', value: dbServices.length, accent: dbServices.length > 0 ? 'text-green-500' : undefined },
        { label: 'Code-Defined', value: staticServices.length, note: overriddenCount > 0 ? `${overriddenCount} customised` : undefined },
    ];

    return (
        <AdminShell
            title="Service Pages"
            actions={
                <Link href="/super-admin/services/new" className="inline-block px-5 py-2.5 rounded-xl bg-accent-gradient text-white text-sm font-bold shadow-button hover:brightness-110 transition-all">
                    + New Page
                </Link>
            }
        >
            {!dbConfigured && (
                <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-foreground-secondary">
                    <span className="font-bold text-amber-500">MongoDB is not configured.</span>{' '}
                    Add <code className="font-mono text-foreground">MONGODB_URI</code> to your environment to edit service pages from here.
                </div>
            )}
            {dbError && <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{dbError}</div>}

            <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-background-card px-5 py-4">
                        <p className={`text-2xl font-black tracking-tight ${stat.accent ?? 'text-foreground'}`}>{stat.value}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground-secondary mt-1">
                            {stat.label}
                            {stat.note && <span className="ml-2 normal-case tracking-normal font-semibold text-accent">· {stat.note}</span>}
                        </p>
                    </div>
                ))}
            </div>

            <h2 className="text-sm font-black uppercase tracking-widest text-foreground-secondary mb-2">All Service Pages</h2>
            <p className="text-xs text-foreground-muted mb-4">
                Edit content, styling, and layout for each page. Saving creates a CMS copy that takes over the live site; <span className="font-bold text-foreground">Reset to code</span> inside the editor restores the original.
            </p>
            <div className="space-y-2">
                {staticServices.map((service) => {
                    const customised = dbSlugs.has(service.slug);
                    return (
                        <div key={service.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background-card px-5 py-3.5">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2.5">
                                    <p className="font-bold truncate text-foreground">{service.shortTitle ?? service.title}</p>
                                    {customised && (
                                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30">Customised</span>
                                    )}
                                    {service.marketIN && (
                                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-background-secondary text-foreground-muted border border-border">🇮🇳 IN</span>
                                    )}
                                </div>
                                <p className="text-xs text-foreground-muted mt-0.5">/services/{service.slug}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={`/services/${service.slug}`} target="_blank" className="px-3.5 py-2 rounded-lg text-xs font-bold text-foreground-muted hover:text-accent transition-colors">View ↗</Link>
                                <Link href={`/super-admin/services/${service.slug}/edit`} className="px-4 py-2 rounded-lg bg-accent-gradient text-white text-xs font-bold shadow-button hover:brightness-110 transition-all">Edit</Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {cmsOnly.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-sm font-black uppercase tracking-widest text-foreground-secondary mb-2">CMS-Only Pages</h2>
                    <p className="text-xs text-foreground-muted mb-4">Created from the admin and not present in the codebase.</p>
                    <div className="space-y-2">
                        {cmsOnly.map((service) => (
                            <div key={service.slug} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background-card px-5 py-3.5">
                                <div className="min-w-0">
                                    <p className="font-bold truncate text-foreground">{service.shortTitle ?? service.title}</p>
                                    <p className="text-xs text-foreground-muted mt-0.5">/services/{service.slug}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link href={`/services/${service.slug}`} target="_blank" className="px-3.5 py-2 rounded-lg text-xs font-bold text-foreground-muted hover:text-accent transition-colors">View ↗</Link>
                                    <Link href={`/super-admin/services/${service.slug}/edit`} className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-accent transition-colors">Edit</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AdminShell>
    );
}
