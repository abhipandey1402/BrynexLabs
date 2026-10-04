import type { CaseStudyFaq } from '@/data/case-studies';

/**
 * Native <details> accordion: works without JavaScript, is keyboard and
 * screen-reader friendly by default, and every answer is in the HTML for
 * crawlers and AI answer engines.
 */
export default function CaseFaq({ faqs }: { faqs: CaseStudyFaq[] }) {
    return (
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background-card">
            {faqs.map((f) => (
                <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-semibold text-foreground transition-colors hover:bg-background-secondary/60 [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-180"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </summary>
                    <p className="px-6 pb-6 leading-relaxed text-foreground-secondary">{f.a}</p>
                </details>
            ))}
        </div>
    );
}
