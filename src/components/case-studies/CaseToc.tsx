'use client';

import { useEffect, useRef, useState } from 'react';

export interface TocItem {
    id: string;
    label: string;
}

/** Where, below the top of the viewport, a section counts as "the one you're reading". */
const READING_LINE_PX = 170;

/**
 * Desktop "On this page" rail. Sticks while the story is on screen and
 * highlights the section currently being read. Needs the page's body not to
 * be a scroll container (see globals.css) or sticky silently fails.
 */
export function CaseTocRail({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        // `items` is in document order, so the last section above the reading line wins.
        const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
        let raf = 0;
        const update = () => {
            raf = 0;
            let current: string | null = null;
            for (const el of els) {
                if (el.getBoundingClientRect().top <= READING_LINE_PX) current = el.id;
                else break;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [items]);

    return (
        <nav aria-label="On this page" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <p className="mb-4 text-sm font-semibold text-foreground">On this page</p>
            <ul className="space-y-0.5 border-l border-border">
                {items.map((item) => {
                    const on = item.id === active;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                aria-current={on ? 'location' : undefined}
                                className={`-ml-px block border-l-2 py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors duration-200 ${
                                    on ? 'border-accent font-semibold text-foreground' : 'border-transparent text-foreground-secondary hover:border-border-hover hover:text-foreground'
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/** Collapsible "On this page" for screens too narrow for the rail. */
export function CaseTocMobile({ items }: { items: TocItem[] }) {
    return (
        <details className="group mb-10 rounded-xl border border-border bg-background-card lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                On this page
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-foreground-muted transition-transform duration-200 group-open:rotate-180">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </summary>
            <ul className="border-t border-border p-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`} className="block rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    );
}

/** A thin bar at the very top of the viewport: how far through the story you are. */
export function ReadingProgress({ targetId }: { targetId: string }) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = document.getElementById(targetId);
        const bar = barRef.current;
        if (!target || !bar) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const r = target.getBoundingClientRect();
            const total = Math.max(1, r.height - window.innerHeight * 0.4);
            const p = Math.min(1, Math.max(0, (window.innerHeight * 0.35 - r.top) / total));
            bar.style.transform = `scaleX(${p})`;
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [targetId]);

    return <div ref={barRef} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-gradient" style={{ transform: 'scaleX(0)' }} />;
}
