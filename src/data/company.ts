/**
 * The one reconciled set of studio facts, rendered identically on Home and
 * About (and mirrored in llms.txt / llms-full.txt). Every figure must be true
 * and consistent sitewide: team figures are confirmed by the founder; product
 * figures are provable from public pages (our case studies and clinizy.in).
 * Don't add a number here unless you can stand behind it publicly.
 */
export interface StudioFact {
    value: string;
    label: string;
    /** One short line of context — where the number comes from. */
    detail: string;
}

export const STUDIO_FACTS: StudioFact[] = [
    { value: '2023', label: 'Founded', detail: 'Built in India, working globally' },
    { value: '5+', label: 'Senior engineers', detail: 'The people who scope it ship it' },
    { value: '4+ yrs', label: 'Average experience', detail: 'No juniors learning on your budget' },
    { value: '3', label: 'Products shipped', detail: 'RegorTalent, ExamPapers, Clinizy Care' },
    { value: '1', label: 'Live SaaS we own and run', detail: 'Clinizy Care' },
    { value: '100%', label: 'Code & IP ownership', detail: 'On every client engagement' },
];

/** Plain-text rendering of the facts, for llms.txt and similar text surfaces. */
export const STUDIO_FACTS_TEXT = STUDIO_FACTS.map((f) => `${f.value} ${f.label.toLowerCase()} (${f.detail})`).join('; ');
