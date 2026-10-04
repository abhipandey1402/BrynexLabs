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
     * Bol (बोल) — AI clinical documentation, renamed from "Clinizy Scribe".
     * Status mirrors clinizy.in/ai-clinical-documentation ("Early access").
     * NOTE: clinizy.in still says "Clinizy Scribe" until the rename ships there.
     */
    bol: {
        name: 'Bol',
        nameHi: 'बोल',
        status: 'Early access',
        documentTypes: ['SOAP note', 'H&P', 'Discharge summary', 'ER note'],
    },
    /** Real screens from the running app with fictional demo data. Filled in once captured. */
    // Captured 2026-09-30 from Clinizy Care v1.20.0 running locally with a
    // fictional demo clinic ("Sunrise Clinic") and reserved, non-routable phone numbers.
    screenshots: {
        dashboard: {
            src: '/products/clinizy-care/screens/dashboard.jpg',
            alt: 'Clinizy Care owner dashboard for a demo clinic, showing 30-day revenue, OPD visits, bed occupancy and pharmacy sales with trend charts',
            width: 1600,
            height: 1000,
        },
        opd: {
            src: '/products/clinizy-care/screens/opd-queue.jpg',
            alt: 'Clinizy Care live OPD queue with token numbers, payment and check-in status, and a vitals panel flagging high blood pressure',
            width: 1600,
            height: 1000,
        },
        prescription: {
            src: '/products/clinizy-care/screens/prescription.jpg',
            alt: 'A finalized digital prescription in Clinizy Care with an ICD-10 diagnosis and medicines with dosing instructions',
            width: 1600,
            height: 1000,
        },
        pharmacy: {
            src: '/products/clinizy-care/screens/pharmacy.jpg',
            alt: 'Clinizy Care pharmacy inventory listing stock by batch with low-stock and near-expiry badges',
            width: 1600,
            height: 1000,
        },
        ipd: {
            src: '/products/clinizy-care/screens/ipd-bed-map.jpg',
            alt: 'Clinizy Care IPD bed map showing total, available and occupied beds across wards',
            width: 1600,
            height: 1000,
        },
        lab: {
            src: '/products/clinizy-care/screens/lab-report.jpg',
            alt: 'A verified lab report in Clinizy Care with HbA1c and lipid profile results flagged against reference ranges',
            width: 1600,
            height: 1000,
        },
        hindi: {
            src: '/products/clinizy-care/screens/dashboard-hindi.jpg',
            alt: 'The Clinizy Care dashboard with the interface switched to Hindi',
            width: 1600,
            height: 1000,
        },
        mobile: {
            src: '/products/clinizy-care/screens/mobile-opd-queue.jpg',
            alt: 'Clinizy Care OPD queue on a phone browser',
            width: 585,
            height: 1266,
        },
    } as Partial<Record<'dashboard' | 'opd' | 'billing' | 'prescription' | 'pharmacy' | 'ipd' | 'lab' | 'automations' | 'hindi' | 'mobile', Screenshot>>,
};

export type AIFeatureId = 'bol' | 'saathi' | 'awaz' | 'nazar' | 'buddhi' | 'setu';

export interface AIFeature {
    id: AIFeatureId;
    /** Latin-script name, e.g. "Bol". */
    name: string;
    /** Devanagari name, e.g. "बोल". */
    nameHi: string;
    /** What it is, in three or four words. */
    title: string;
    /**
     * Honest availability. 'Early access' mirrors clinizy.in. 'Roadmap' means
     * planned in the Clinizy AI Blueprint (Sep 2026) with no shipped code yet —
     * never promote an item past 'Roadmap' until it is live on clinizy.in.
     */
    status: 'Early access' | 'Roadmap';
    /** One line, shown in the list. */
    summary: string;
    /** One or two sentences, shown with the animated illustration. */
    detail: string;
}

/**
 * The AI line-up for Clinizy Care, shown in the compact animated showcase.
 * Bol is in early access; the other five come from the Clinizy AI Blueprint
 * (internal, 5 Sep 2026) and are labelled Roadmap until they ship.
 */
export const AI_FEATURES: AIFeature[] = [
    {
        id: 'bol',
        name: 'Bol',
        nameHi: 'बोल',
        title: 'AI clinical notes',
        status: 'Early access',
        summary: 'Speak the consult in Hinglish; get a structured draft.',
        detail: 'The doctor dictates the way they actually talk, and Bol drafts a structured clinical note to review, with a guardrail that rejects non-clinical input. Consult time goes to the patient, not the keyboard.',
    },
    {
        id: 'saathi',
        name: 'Saathi',
        nameHi: 'साथी',
        title: 'WhatsApp front desk',
        status: 'Roadmap',
        summary: 'Books, reschedules and shares reports, even at 11 pm.',
        detail: 'An AI agent on the clinic\'s own WhatsApp number that books and reschedules, shares the queue position, sends reports and payment links, and hands anything clinical to a person.',
    },
    {
        id: 'awaz',
        name: 'Awaz',
        nameHi: 'आवाज़',
        title: 'Reminder calls',
        status: 'Roadmap',
        summary: 'A short call for patients who never open WhatsApp.',
        detail: 'A 45-second call in the patient\'s language for a due follow-up, a refill or a ready report. It takes one spoken answer (yes, no or a day) and records it.',
    },
    {
        id: 'nazar',
        name: 'Nazar',
        nameHi: 'नज़र',
        title: 'The 8 am owner brief',
        status: 'Roadmap',
        summary: 'Three things to fix today, with the rupees on each.',
        detail: 'Every morning the owner gets a WhatsApp brief: unbilled lab orders, missed follow-ups, stock about to expire. Every figure comes from a database query; the AI only ranks and explains.',
    },
    {
        id: 'buddhi',
        name: 'Buddhi',
        nameHi: 'बुद्धि',
        title: 'Pharmacy forecasting',
        status: 'Roadmap',
        summary: 'Reorder from your own prescribing history.',
        detail: 'Forecasts demand from what the clinic\'s doctors actually prescribe, drafts the purchase order, and plans how to clear near-expiry stock while the supplier return window is still open.',
    },
    {
        id: 'setu',
        name: 'Setu',
        nameHi: 'सेतु',
        title: 'Ask your clinic',
        status: 'Roadmap',
        summary: 'A question in Hindi in, a chart out.',
        detail: 'Owners ask in plain Hindi or Hinglish and get a chart back. The AI only chooses from pre-approved, clinic-scoped reports, so it can never write its own queries or see another clinic\'s data.',
    },
];

/** Live today: a few of the 24 Autopilot automations, shown beside the AI roadmap. */
export const AUTOPILOT_LIVE = ['Follow-up recalls', 'Refill reminders', 'Critical-result alerts', 'Near-expiry alerts'];

/** "Shipped for ourselves first" — each service we sell, mapped to where it runs in Clinizy Care. */
export const SHIPPED_FOR_OURSELVES: ShippedProof[] = [
    {
        service: 'AI agents',
        serviceHref: '/services/ai-agents-automation',
        proof: 'Bol, AI clinical notes',
        status: 'Early access',
        detail: 'Bol turns a doctor’s Hinglish dictation into a structured clinical note, with a guardrail agent that checks the input before anything is drafted. Five more AI capabilities are on the roadmap.',
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
