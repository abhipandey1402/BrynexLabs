/**
 * Products Brynex Labs owns and operates.
 *
 * Source-of-truth rule: every product claim below must match clinizy.in as it
 * is today (clinizy.in is canonical for the product; we tell the builder's
 * story). Architecture claims must match the Clinizy codebase. Re-verify
 * against the live site before changing any number here.
 * Last verified against clinizy.in: 2026-09-30.
 */

export interface Screenshot {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface ShippedProof {
    /** The Brynex service line. */
    service: string;
    serviceHref: string;
    /** Where that service runs in our own product. */
    proof: string;
    /** Optional status qualifier, shown verbatim (e.g. "Early access"). */
    status?: string;
    detail: string;
}

export interface Capability {
    title: string;
    description: string;
}

const CLINIZY_ORIGIN = 'https://clinizy.in';

export const CLINIZY = {
    slug: 'clinizy-care',
    name: 'Clinizy Care',
    /** Descriptor shown next to the branded link (never inside it, sitewide). */
    category: 'Hospital Management Software',
    /** Canonical product URL — matches clinizy.in's own Organization.url origin. */
    url: CLINIZY_ORIGIN,
    /** The homepage CTA target (normal, followed link). */
    homeUrl: `${CLINIZY_ORIGIN}/`,
    /** clinizy.in's own schema nodes. We reference these by @id; never redefine them. */
    organizationId: `${CLINIZY_ORIGIN}/#organization`,
    softwareId: `${CLINIZY_ORIGIN}/#software`,
    /** Card copy (brief-approved). Price matches clinizy.in/pricing: from ₹1,999/mo, excl. GST. */
    summary:
        "Hospital software for Bharat's clinics: OPD queue, GST billing, e-prescriptions, pharmacy, IPD, lab and WhatsApp, in English & Hindi. From ₹1,999/month + GST.",
    /** Proof chips. 11 modules + 24 automations: clinizy.in/features, /automations. Languages: clinizy.in/about. */
    proofChips: ['11 modules', '24 automations', 'English, Hindi & Hinglish'],
    /** Brand colour — used only inside Clinizy's own card/sections. clinizy.in theme-color. */
    brandGreen: '#1A6B3C',
    /** Official brand-kit logos: dark text for light surfaces, white text for dark surfaces. */
    logo: {
        src: '/products/clinizy-care/clinizy-care-logo.png',
        alt: 'Clinizy Care',
        width: 640,
        height: 279,
    } satisfies Screenshot,
    logoOnDark: {
        src: '/products/clinizy-care/clinizy-care-logo-dark.png',
        alt: 'Clinizy Care',
        width: 640,
        height: 262,
    } satisfies Screenshot,
    symbol: {
        src: '/products/clinizy-care/clinizy-care-symbol.png',
        alt: '',
        width: 160,
        height: 160,
    } satisfies Screenshot,
    /** Deep links into clinizy.in — used with descriptive anchors in body copy only. */
    links: {
        features: `${CLINIZY_ORIGIN}/features`,
        pricing: `${CLINIZY_ORIGIN}/pricing`,
        opdQueue: `${CLINIZY_ORIGIN}/opd-queue-management-software`,
        gstBilling: `${CLINIZY_ORIGIN}/gst-billing-software-for-clinics`,
        whatsapp: `${CLINIZY_ORIGIN}/whatsapp-for-clinics`,
        automations: `${CLINIZY_ORIGIN}/automations`,
        patientRecords: `${CLINIZY_ORIGIN}/patient-records-software`,
        aiDocumentation: `${CLINIZY_ORIGIN}/ai-clinical-documentation`,
        about: `${CLINIZY_ORIGIN}/about`,
        changelog: `${CLINIZY_ORIGIN}/changelog`,
    },
    /** The 11 modules, in clinizy.in's own order (/features ItemList). */
    modules: [
        'OPD Queue Management',
        'GST Billing',
        'Pharmacy & Inventory',
        'IPD & Bed Management',
        'Digital Prescriptions',
        'Lab & Diagnostics',
        'Appointment Scheduling',
        'Patient Records',
        'Reports & Analytics',
        'AI Clinical Documentation',
        'WhatsApp for Clinics',
    ],
    /**
     * Clinizy Scribe — AI clinical documentation. Status and wording match
     * clinizy.in/ai-clinical-documentation ("Early access · launching soon").
     * Never present it as generally available until clinizy.in does.
     */
    scribe: {
        name: 'Clinizy Scribe',
        status: 'Early access',
        documentTypes: ['SOAP note', 'H&P', 'Discharge summary', 'ER note'],
    },
    /** Real screens from the running app with fictional demo data. Filled in once captured. */
    screenshots: {} as Partial<Record<'dashboard' | 'opd' | 'billing' | 'prescription' | 'pharmacy' | 'ipd' | 'lab' | 'automations' | 'hindi' | 'mobile', Screenshot>>,
};

export type AIFeatureVisual = 'notes' | 'documents' | 'guardrail' | 'recall' | 'safety' | 'stock';

export interface AIFeature {
    id: AIFeatureVisual;
    title: string;
    /** AI = model-driven (Clinizy Scribe). Autopilot = clinizy.in's name for its rule-based automations. */
    kind: 'AI' | 'Autopilot';
    /** Must match clinizy.in. Roadmap items get 'In development' — never 'Live'. */
    status: 'Live' | 'Early access' | 'In development';
    /** One line, shown in the list. */
    summary: string;
    /** One sentence, shown with the animated preview. */
    detail: string;
}

/**
 * High-impact AI + Autopilot features in Clinizy Care, for the compact
 * animated showcase. Scribe items mirror clinizy.in/ai-clinical-documentation
 * (early access); Autopilot items are live automations on clinizy.in/automations.
 */
export const AI_FEATURES: AIFeature[] = [
    {
        id: 'notes',
        title: 'AI clinical notes',
        kind: 'AI',
        status: 'Early access',
        summary: 'Dictation in, a structured SOAP note out.',
        detail: 'Clinizy Scribe turns a doctor\u2019s dictation into a structured note to review, so consult time goes to the patient, not the keyboard.',
    },
    {
        id: 'documents',
        title: 'Discharge summaries & more',
        kind: 'AI',
        status: 'Early access',
        summary: 'Discharge summaries, H&P and ER notes.',
        detail: 'The same engine drafts discharge summaries, H&P and ER notes in a consistent structure, ready for the doctor to check and sign.',
    },
    {
        id: 'guardrail',
        title: 'Guardrailed AI output',
        kind: 'AI',
        status: 'Early access',
        summary: 'Checks the input before anything is drafted.',
        detail: 'A guardrail agent rejects non-clinical input and anti-hallucination checks run on every draft, so notes stay grounded in what the doctor said.',
    },
    {
        id: 'recall',
        title: 'Autopilot recalls',
        kind: 'Autopilot',
        status: 'Live',
        summary: 'Follow-ups, refills and no-show win-back on WhatsApp.',
        detail: 'Follow-up recalls, refill reminders and no-show win-back messages go out on WhatsApp by themselves, in English or Hindi.',
    },
    {
        id: 'safety',
        title: 'Clinical safety net',
        kind: 'Autopilot',
        status: 'Live',
        summary: 'Critical results and vitals escalate instantly.',
        detail: 'Critical lab results, abnormal vitals and missed doses are escalated to the right person automatically, instead of waiting in a list.',
    },
    {
        id: 'stock',
        title: 'Zero-waste pharmacy',
        kind: 'Autopilot',
        status: 'Live',
        summary: 'Low-stock and near-expiry alerts, before they cost you.',
        detail: 'Low-stock reorder alerts and 30/60/90-day near-expiry warnings keep the shelves stocked without writing off expired medicine.',
    },
];

/** "Shipped for ourselves first" — each service we sell, mapped to where it runs in Clinizy Care. */
export const SHIPPED_FOR_OURSELVES: ShippedProof[] = [
    {
        service: 'AI agents',
        serviceHref: '/services/ai-agents-automation',
        proof: 'AI clinical notes',
        status: 'Early access',
        detail: 'Clinizy Scribe turns a doctor’s dictation into structured clinical notes, with a guardrail agent that checks the input before anything is drafted.',
    },
    {
        service: 'SaaS engineering',
        serviceHref: '/services/ai-native-software-engineering',
        proof: 'A multi-tenant HMS',
        detail: 'Eleven modules on one patient record, with every clinic’s data scoped by a fail-closed tenant guard on every query.',
    },
    {
        service: 'Automation',
        serviceHref: '/services/ai-agents-automation',
        proof: '24 built-in automations',
        detail: 'Recalls, WhatsApp reminders, dues follow-ups and clinical-safety alerts that run on their own, around the clock.',
    },
    {
        service: 'SEO',
        serviceHref: '/services/saas-seo',
        proof: 'The clinizy.in content engine',
        detail: 'Module, comparison and automation pages, a plain-language blog for clinic owners, and llms.txt for AI search.',
    },
];

/**
 * Healthcare capabilities we can prove, because they run in Clinizy Care
 * today. ABDM/ABHA is deliberately absent: it is sandbox-only and certification
 * is still in progress — add it only once it is live.
 */
export const HEALTHCARE_CAPABILITIES: Capability[] = [
    {
        title: 'Multi-tenant HMS & EMR',
        description:
            'One patient record shared by reception, doctor, pharmacy, lab and IPD, with every clinic isolated from every other by a tenant guard on every database query.',
    },
    {
        title: 'GST billing',
        description:
            'CGST/SGST or IGST by place of supply, exempt consultations, MRP-inclusive pharmacy pricing, money held in paise, and invoice numbering by financial year.',
    },
    {
        title: 'WhatsApp Business API',
        description:
            'Direct Meta Cloud API integration with approved English and Hindi templates, queued delivery with retries, signed webhooks, quiet hours, opt-outs and per-plan quotas.',
    },
    {
        title: 'DPDP-aligned data handling',
        description:
            'India-hosted on AWS Mumbai, encrypted in transit, role-based access across seven staff roles, two-factor sign-in, an audit trail of every change, and clinic-level export and deletion.',
    },
    {
        title: 'Clinical workflow automation',
        description:
            'Scheduled and event-driven workflows: follow-up recalls, refill reminders, critical-result escalation, low-stock and near-expiry alerts, with per-clinic controls.',
    },
    {
        title: 'Hindi, Hinglish & English interfaces',
        description:
            'Three complete interface languages, switched per user, with a translation-parity test that fails the build if any screen is missing a string.',
    },
];
