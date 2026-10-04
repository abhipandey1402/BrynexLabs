import type { CaseStudySection } from '@/data/case-studies';

export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

/** Splits "Lead-in: rest of the sentence" so the lead-in can be emphasised. */
function splitLead(text: string, max = 80): { lead: string; rest: string } | null {
    const i = text.indexOf(': ');
    if (i < 6 || i > max) return null;
    const lead = text.slice(0, i);
    if (/[.!?]/.test(lead)) return null;
    return { lead, rest: text.slice(i + 2) };
}

function Lead({ text, max }: { text: string; max: number }) {
    const split = splitLead(text, max);
    if (!split) return <>{text}</>;
    return (
        <>
            <strong className="font-semibold text-foreground">{split.lead}: </strong>
            {split.rest}
        </>
    );
}

/** One narrative section of a case study: heading, paragraphs and bullets, with bolded lead-ins. */
export default function StorySection({ section }: { section: CaseStudySection }) {
    const boldParagraphLeads = /decisions/i.test(section.heading);
    return (
        <section id={slugify(section.heading)} className="scroll-mt-28">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">{section.heading}</h2>
            <div className="mt-5 max-w-3xl space-y-5">
                {section.paragraphs.map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed text-foreground-secondary">
                        {boldParagraphLeads ? <Lead text={para} max={90} /> : para}
                    </p>
                ))}
            </div>
            {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-6 max-w-3xl space-y-4">
                    {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-lg leading-relaxed text-foreground-secondary">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>
                                <Lead text={bullet} max={60} />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
