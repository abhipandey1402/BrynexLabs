import CaseIcon from './CaseIcon';
import type { CaseStudy } from '@/data/case-studies';

const CAPTION: Record<CaseStudy['art'], string> = {
    hiring: 'Shortlist ready · recruiter decides',
    exam: 'Mock exam ready · instant feedback',
    clinic: '24 automations live · 6 AI agents',
    suite: 'Five AI products · one platform',
};

/**
 * A compact thumbnail for case-study cards: the study's AI agents (or
 * products) as labelled tiles, with the one-line outcome beneath. Same visual
 * language as the full hero scene, sized for a card.
 */
export default function CaseThumb({ study, className = '' }: { study: CaseStudy; className?: string }) {
    const items = (study.products ?? study.agents ?? []).slice(0, 6).map((x) => ({
        icon: x.icon,
        hi: 'nameHi' in x ? x.nameHi : undefined,
        name: x.name,
    }));
    const cols = items.length >= 5 ? 'grid-cols-3' : 'grid-cols-4';

    return (
        <div className={`relative aspect-[4/3] overflow-hidden bg-background-secondary/70 ${className}`} role="img" aria-label={`${study.clientName}: ${CAPTION[study.art]}`}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(var(--accent-rgb),0.16),transparent_72%)]" />
                <div
                    className="absolute inset-0 opacity-[0.04] invert dark:invert-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between gap-2 p-4 sm:p-5" aria-hidden="true">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-sheen" />
                    {study.products ? 'AI products' : 'AI agents'}
                </span>
                <ul className={`mx-auto grid w-full max-w-lg gap-x-2 gap-y-2.5 sm:gap-x-3 sm:gap-y-4 ${cols}`}>
                    {items.map((it, i) => (
                        <li key={it.name} className="flex flex-col items-center gap-1.5 text-center">
                            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-card sm:h-14 sm:w-14 sm:rounded-2xl">
                                <span className="absolute -inset-0.5 rounded-[0.85rem] ring-2 ring-accent/30 motion-safe:animate-sheen" style={{ animationDelay: `${i * 0.3}s` }} />
                                <CaseIcon name={it.icon} className="relative h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                            <span className="text-[11px] font-semibold leading-tight text-foreground-secondary sm:text-xs">
                                {it.hi && (
                                    <span lang="hi" className="mr-1 text-accent">
                                        {it.hi}
                                    </span>
                                )}
                                <span className="line-clamp-2">{it.name}</span>
                            </span>
                        </li>
                    ))}
                </ul>
                <span className="w-fit rounded-full border border-border bg-background-card/90 px-3 py-1 text-xs font-semibold text-foreground-secondary backdrop-blur">{CAPTION[study.art]}</span>
            </div>
        </div>
    );
}
