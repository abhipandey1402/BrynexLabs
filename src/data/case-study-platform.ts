import type { CaseStudy, CaseStudyProduct } from './case-studies';

/**
 * AI agent blueprint for an anonymised five-product healthcare platform.
 *
 * Integrity rules for this file (the owner audits for them):
 * - It is a DESIGN STUDY. It never claims Brynex Labs built the platform, and
 *   it publishes no results, customers or performance figures.
 * - The platform and its products are anonymised: neutral working names, no
 *   vendor, model-provider or infrastructure names, no distinctive numbers.
 * - Status labels mean: Live = the capability exists in the platform today;
 *   Roadmap = proposed here and not built. Never promote an item to Live
 *   without checking the platform's code.
 * - Only one of the five products has LLM agents today. Others have
 *   deterministic engines plus proposed agents, and must stay labelled so.
 */

const products: CaseStudyProduct[] = [
    {
        id: 'notes',
        name: 'Note Studio',
        slogan: 'Say it once. Chart it right.',
        icon: 'file',
        persona: 'Clinicians, especially in behavioral health, and the operations leads who want notes in one consistent format across a group.',
        problem: 'Charting follows clinicians home. Formats drift between people, telehealth sessions get rewritten, and finished notes are re-keyed into the record.',
        solution:
            'A drafting workspace. Paste a transcript, upload a scan or join a meeting, pick a template and get a streamed note to review and sign. AI agents guard the input, draft only what was said, verify codes and build custom templates on request.',
        agents: [
            { name: 'Input guardrail', role: 'Gatekeeper', does: 'Checks that the input is clinical before anything is drafted, and suggests a better template when it is not.', safeguard: 'Non-clinical or off-topic input never reaches the drafting agent.', status: 'Live', kind: 'AI agent', icon: 'shield' },
            { name: 'Drafting agent', role: 'Note writer', does: 'Streams a structured note from the transcript and documents only what the transcript contains.', safeguard: 'It never invents or infers facts. Missing fields stay visibly empty so the clinician reviews before signing.', status: 'Live', kind: 'AI agent', icon: 'file' },
            { name: 'Code-check agent', role: 'Verification', does: 'Looks up diagnosis, medication and lab codes against standard reference services while it drafts.', safeguard: 'Codes come from reference lookups, not from the model’s memory.', status: 'Live', kind: 'AI agent', icon: 'search' },
            { name: 'Template builder', role: 'Customisation', does: 'Turns a plain-English description of a note format into a reusable template that a whole group can share.', safeguard: 'The user previews and edits the template before confirming it.', status: 'Live', kind: 'AI agent', icon: 'sparkles' },
        ],
        capabilities: [
            'Transcripts, scanned documents and live meetings as inputs',
            'Built-in note formats plus custom templates',
            'AI editing: refine, expand and shorten',
            'Standard code lookups for diagnoses, drugs and labs',
            'Export to PDF, Word and text',
            'Usage metered in credits',
        ],
        stack: ['Python', 'FastAPI', 'React', 'LLM on a managed cloud platform', 'Streaming responses', 'Document OCR'],
        scene: {
            inputLabel: 'Inputs',
            inputs: [
                { badge: 'T', title: 'Session transcript' },
                { badge: 'PDF', title: 'Scanned record' },
                { badge: 'M', title: 'Live meeting' },
            ],
            outputLabel: 'Clinician’s view',
            output: {
                kind: 'note',
                title: 'Draft note · for review',
                rows: [
                    { label: 'S', text: 'Reports low mood and poor sleep' },
                    { label: 'O', text: 'Calm, engaged, no acute distress' },
                    { label: 'A', text: 'Adjustment disorder · code verified' },
                    { label: 'P', text: 'Weekly sessions, review in two weeks' },
                ],
                footnote: 'Clinician reviews and signs',
            },
        },
    },
    {
        id: 'voice',
        name: 'Voice Desk',
        slogan: 'Speak anywhere, type nowhere.',
        icon: 'mic',
        persona: 'Individual providers who document in whatever system their practice already uses.',
        problem: 'Notes get typed into other systems after the visit, which costs hours. A tool that only works inside one app is no use to a clinician who lives in several.',
        solution:
            'A desktop app that records the visit, transcribes it with speaker labels and pastes clean text into whichever application has focus. Voice commands, snippets and a personal dictionary handle the formatting.',
        agents: [
            { name: 'Speech engine', role: 'Transcription', does: 'Turns recorded audio into text with speaker labels, in chunks, while the visit is still going.', safeguard: 'The transcript is shown and editable before anything is pasted.', status: 'Live', kind: 'Pipeline stage', icon: 'audio' },
            { name: 'Cleanup pipeline', role: 'Formatting', does: 'Applies voice commands, snippets, a personal dictionary and domain terminology so the text arrives clean.', safeguard: 'Rule-based and predictable: the same words give the same result every time.', status: 'Live', kind: 'Pipeline stage', icon: 'languages' },
            { name: 'Note-structuring agent', role: 'Structured notes', does: 'Takes the finished transcript and drafts a structured note in the clinician’s template, citing the lines each section came from.', safeguard: 'Every section links back to the transcript, and nothing is pasted until the clinician approves.', status: 'Roadmap', kind: 'AI agent', icon: 'sparkles' },
        ],
        capabilities: [
            'Records and transcribes in chunks while the visit runs',
            'Speaker labels for who said what',
            'Pastes into whichever app is in focus',
            'Voice commands, snippets and a personal dictionary',
            'Transcript history stored encrypted on the device',
        ],
        stack: ['Electron', 'Speech-to-text models', 'Speaker diarisation', 'Cloud queues and storage', 'Auto-update'],
        scene: {
            inputLabel: 'Inputs',
            inputs: [
                { badge: 'MIC', title: 'Visit audio' },
                { badge: 'CMD', title: 'Voice commands' },
                { badge: 'DIC', title: 'Personal dictionary' },
            ],
            outputLabel: 'Where it lands',
            output: {
                kind: 'records',
                title: 'Transcript · speaker-labelled',
                rows: [
                    { text: 'Clinician: How has the pain been?', value: '0:04' },
                    { text: 'Patient: Better since the new dose.', value: '0:09' },
                    { text: 'Clinician: Any side effects?', value: '0:15' },
                ],
                footnote: 'Pasted into the app in focus',
            },
        },
    },
    {
        id: 'referrals',
        name: 'Handoff',
        slogan: 'Every referral, to the finish line.',
        icon: 'network',
        persona: 'Referral coordinators and operations leads at sending and receiving practices.',
        problem: 'Referrals sent by fax or email stall at intake, authorisation or a missing document, and nobody can see where they stopped.',
        solution:
            'A shared referral workflow: send, acknowledge, accept or decline with a reason, redirect, and request missing information. Patient details are revealed in stages as a referral progresses, and screening and triage rules route each referral to the right queue.',
        agents: [
            { name: 'Rules-based triage', role: 'Routing', does: 'Applies screening and priority rules the practice configures, so each referral lands in the right queue.', safeguard: 'Deterministic and auditable: the same referral always routes the same way.', status: 'Live', kind: 'Pipeline stage', icon: 'workflow' },
            { name: 'Intake agent', role: 'Document intake', does: 'Reads referrals that arrive as email or documents, proposes the structured fields and quotes the exact source text behind each one.', safeguard: 'A coordinator confirms every field against its quote before a referral is created.', status: 'Roadmap', kind: 'AI agent', icon: 'file-search' },
            { name: 'Chase agent', role: 'Follow-up', does: 'Notices stalled referrals and drafts the nudge: a missing document, an unanswered request, an expiring authorisation.', safeguard: 'Drafts go to a person to send. It never contacts a patient or a practice on its own.', status: 'Roadmap', kind: 'AI agent', icon: 'bell' },
        ],
        capabilities: [
            'Send, acknowledge, accept or decline with a reason, and redirect',
            'Patient details revealed in stages as a referral progresses',
            'Provider identity checks against the public registry',
            'Delivery tracking and referral lifecycle reports',
            'Reminders and auto-expiry for stale referrals',
        ],
        stack: ['TypeScript', 'Node.js', 'React', 'Document database', 'Encrypted blob storage', 'Email delivery tracking'],
        scene: {
            inputLabel: 'Arrives as',
            inputs: [
                { badge: '@', title: 'Referral email' },
                { badge: 'PDF', title: 'Attached document' },
                { badge: '?', title: 'Missing-info request' },
            ],
            outputLabel: 'Intake queue',
            output: {
                kind: 'records',
                title: 'Proposed fields · with source quotes',
                rows: [
                    { text: 'Specialty: Cardiology', value: 'quoted' },
                    { text: 'Urgency: Routine', value: 'quoted' },
                    { text: 'Insurance ID', value: 'needs review' },
                ],
                footnote: 'Coordinator confirms before it is created',
            },
        },
    },
    {
        id: 'outreach',
        name: 'Nudge',
        slogan: 'The follow-up that follows up.',
        icon: 'message',
        persona: 'Front-desk staff and referral coordinators who spend their days playing phone tag.',
        problem: 'Patients miss appointments and referrals go unanswered, because reaching people takes calls that nobody has time to make.',
        solution:
            'Two-way patient texting with consent tracking, admin-approved message templates, timed reminders and a task queue. A workflow engine runs the outreach, and staff only see the messages that need a person.',
        agents: [
            { name: 'Workflow engine', role: 'Outreach', does: 'Runs timed outreach and reminders, follows up when nobody replies, and reads simple replies such as yes, no and stop.', safeguard: 'Only approved templates are sent, opt-outs are enforced on the server, and every change is in an audit log.', status: 'Live', kind: 'Pipeline stage', icon: 'workflow' },
            { name: 'Reply-understanding agent', role: 'Free-text replies', does: 'Understands replies like “yes, but not Tuesday”, proposes the next step and drafts the answer.', safeguard: 'Low-confidence replies and anything clinical go to staff untouched.', status: 'Roadmap', kind: 'AI agent', icon: 'brain' },
            { name: 'Template-drafting agent', role: 'Message drafting', does: 'Drafts new message templates in the practice’s tone from a short description.', safeguard: 'A template is sent only after an administrator approves it.', status: 'Roadmap', kind: 'AI agent', icon: 'sparkles' },
        ],
        capabilities: [
            'Two-way text inbox with consent status',
            'Message templates with an approval step',
            'Timed reminders before appointments',
            'Follow-ups when there is no reply',
            'Task queue for exceptions',
            'Audit log of every change',
        ],
        stack: ['TypeScript', 'Node.js', 'React', 'Workflow state machine', 'SMS and email delivery APIs', 'Document database'],
        scene: {
            inputLabel: 'Triggers',
            inputs: [
                { badge: 'EVT', title: 'Referral event' },
                { badge: 'TPL', title: 'Approved template' },
                { badge: 'OK', title: 'Consent on file' },
            ],
            outputLabel: 'The patient’s phone',
            output: {
                kind: 'chat',
                title: 'Text thread',
                rows: [
                    { label: 'agent', text: 'Reminder: your visit is tomorrow at 10:30. Reply 1 to confirm.' },
                    { label: 'patient', text: 'yes but can we do the afternoon?' },
                    { label: 'agent', text: 'Understood. I’ve asked the front desk to find an afternoon slot.' },
                ],
                footnote: 'Unsure replies go to staff',
            },
        },
    },
    {
        id: 'rates',
        name: 'Rate Lens',
        slogan: 'Know what you are really paid.',
        icon: 'chart',
        persona: 'Revenue-cycle leaders, CFOs and contracting teams.',
        problem: 'Practices sign payer contracts without knowing whether the rates are competitive, and published rate files are enormous and hard to use.',
        solution:
            'A benchmarking workspace. Look up a provider, see negotiated rates by procedure code and compare them with peer and market averages by state and payer, with a branded report to take into the negotiation.',
        agents: [
            { name: 'Benchmarking engine', role: 'Rate comparison', does: 'Looks up negotiated rates by procedure code and compares them with peer and market averages.', safeguard: 'Every figure comes from a query over published rate data, never from a model.', status: 'Live', kind: 'Pipeline stage', icon: 'chart' },
            { name: 'Ask-the-data agent', role: 'Plain-language questions', does: 'Lets a user ask in plain language, then selects a pre-approved comparison and fills in the parameters.', safeguard: 'It chooses from a fixed catalogue of queries and never writes its own, so it cannot reach data it should not see.', status: 'Roadmap', kind: 'AI agent', icon: 'search' },
            { name: 'Contract-reader agent', role: 'Contract terms', does: 'Reads a payer contract, proposes the key terms and rates, and quotes the clause behind each one.', safeguard: 'Every extracted term links to its clause for a person to verify.', status: 'Roadmap', kind: 'AI agent', icon: 'file-search' },
        ],
        capabilities: [
            'Provider lookup by identifier',
            'Negotiated rates by procedure code',
            'Comparison with peer and market averages by state and payer',
            'Branded PDF report for the negotiating table',
            'Plan limits and usage credits',
        ],
        stack: ['Python', 'FastAPI', 'React', 'Cloud data warehouse', 'PDF report generation', 'Charting'],
        scene: {
            inputLabel: 'You choose',
            inputs: [
                { badge: 'NPI', title: 'Provider lookup' },
                { badge: 'CPT', title: 'Procedure codes' },
                { badge: 'ST', title: 'State and payer' },
            ],
            outputLabel: 'Your rate vs. market',
            output: {
                kind: 'chart',
                title: 'Benchmark by code · illustrative',
                rows: [
                    { text: 'Office visit', value: 'Above' },
                    { text: 'Imaging', value: 'At market' },
                    { text: 'Lab panel', value: 'Below' },
                ],
                footnote: 'Illustrative data',
            },
        },
    },
];

const aiAgents = products.flatMap((p) => p.agents).filter((a) => a.kind === 'AI agent');
const liveAgents = aiAgents.filter((a) => a.status === 'Live').length;
const proposedAgents = aiAgents.filter((a) => a.status === 'Roadmap').length;
const engines = products.flatMap((p) => p.agents).filter((a) => a.kind === 'Pipeline stage').length;

export const platformStudy: CaseStudy = {
    slug: 'healthcare-ai-platform-agent-blueprint',
    title: 'An AI Agent Blueprint for a Five-Product Healthcare Platform',
    clientName: 'Healthcare AI platform (name withheld)',
    industry: 'Healthcare AI · Multi-product platform',
    summary:
        'A healthcare software company sells five products on one platform: clinical documentation, dictation, referral tracking, patient texting and payer-rate benchmarking. This design study maps where AI agents belong in each, one use case per product, and what a safe, human-in-the-loop agent layer looks like across all five. The company’s name is withheld.',
    kicker: 'Design study · Healthcare AI',
    tags: ['AI agents', 'Healthcare', 'Platform design', 'Use cases'],
    kind: 'platform',
    art: 'suite',
    seo: {
        title: 'AI Agent Blueprint for a Healthcare Platform | Brynex Labs',
        metaDescription:
            'A design study: where AI agents belong across five healthcare products — documentation, dictation, referrals, patient texting and rate benchmarking.',
    },
    snapshot: [
        { label: 'Industry', value: 'Healthcare AI · name withheld' },
        { label: 'Type', value: 'Design study, not a delivery report' },
        { label: 'Scope', value: 'Five products, one shared agent layer' },
        { label: 'Principle', value: 'Deterministic core, AI on top, a person decides' },
    ],
    productsHeading: 'Five products, five AI use cases',
    productsIntro:
        'Each product gets one clear job for AI, a bounded toolset and a human in the loop. Live means the capability exists in the platform today. Roadmap means we propose it and it is not built yet.',
    products,
    sections: [
        {
            heading: 'About this blueprint',
            paragraphs: [
                'This is a design study, not a delivery report. It looks at a real healthcare software platform, with its name withheld, that sells five products on one login, one bill and one audit trail: clinical documentation, dictation, referral tracking, patient texting and payer-rate benchmarking.',
                'For each product we describe one clear job for AI, the agents that do it and the safeguards around them. Where an AI capability already exists in the platform today we mark it Live. Where we propose one that does not exist yet we mark it Roadmap. We publish no results or performance figures, because this page describes a design, not an outcome.',
            ],
        },
        {
            heading: 'The Platform',
            paragraphs: [
                'The five products share one foundation: sign-in, per-seat licensing, billing and an audit trail. A customer can start with one product and add others later, so the AI layer has to work both on its own and as a suite.',
                'The products are also very different in how AI-ready they are. One already runs LLM agents. One runs speech models. Three run on deterministic engines with no AI at all. That spread is what makes the platform a good test of a sensible agent strategy: it shows where agents belong, and where ordinary code is the right answer.',
            ],
        },
        {
            heading: 'The Challenge',
            paragraphs: [
                'Healthcare staff lose their days to work that is mostly reading, re-typing and chasing: charting after the visit, keying referrals in from emails and scans, calling patients who do not pick up, and trying to read payer rate files that nobody designed for humans.',
                'That is the right territory for AI agents, and also the risky one. The data is protected health information, the decisions affect patients, and a confident wrong answer costs more than a slow right one. So the question is not whether to add agents, but where, and with what limits.',
            ],
        },
        {
            heading: 'Our Approach: One Agent Layer, Five Products',
            paragraphs: ['We would not bolt five separate chatbots onto five products. We would build one agent layer that every product plugs into, with the same rules everywhere.'],
            bullets: [
                'Deterministic core first: The numbers, routing rules and records stay in ordinary code and queries. Agents read, draft and propose on top of them.',
                'A guardrail at the door: Every agent checks that a request is in scope before it does anything, and refuses the rest.',
                'Bounded toolsets: Each agent gets a short list of things it may do and nothing else, so there is no path from a prompt to arbitrary data.',
                'Provenance on every claim: Where an agent extracts or summarises, it quotes the source line, so checking takes seconds.',
                'A person decides: Agents draft, flag and propose. A clinician, coordinator or analyst confirms before anything is signed, filed or sent.',
                'Audit and evals from day one: Every agent action is logged, and each agent ships with an evaluation set, so changes are measured rather than guessed.',
            ],
        },
        {
            heading: 'Safety and Privacy by Design',
            paragraphs: ['The data here is protected health information, so privacy is part of the architecture, not a checklist at the end.'],
            bullets: [
                'Minimum necessary data: Send a model only what the task needs, and keep identifiers out of prompts when a task does not require them.',
                'Redaction in logs and telemetry: Logs and traces never carry patient details.',
                'Tenant isolation: Each customer’s data is scoped on every query, so one customer can never reach another’s.',
                'Agreements before data: Provider agreements covering protected health information are in place before any such data reaches a model.',
                'Controls, not compliance claims: We build the controls. Compliance claims belong to the platform’s owner and its auditors.',
            ],
        },
        {
            heading: 'Where We Would Start',
            paragraphs: ['Sequence matters. We would start where the agent layer is already proven and the safeguards are easiest to verify, then widen.'],
            bullets: [
                'First, harden what is live: Put evaluation sets and audit logging around the existing documentation agents, so they can be changed with confidence.',
                'Second, referral intake: The highest-friction manual step, and a natural fit for an agent that quotes its sources.',
                'Third, reply understanding: Extends the timed outreach already in place from keywords to free text, with staff catching anything unsure.',
                'Fourth, ask-the-data and contract reading: Valuable, but they need the strictest query and provenance controls, so they come last.',
                'Throughout, one shared layer: Each new agent reuses the guardrails, audit and metering, so it starts from something that already works.',
            ],
        },
    ],
    engagementHeading: 'How we would approach it',
    engagement: [
        { title: 'Map where the minutes go', body: 'Start from the people: clinicians, coordinators, the front desk and analysts, and where their time goes in each product.' },
        { title: 'Pick one job per product', body: 'Choose the one task where an agent saves the most time with the least risk, and leave the rest alone.' },
        { title: 'Build the shared layer first', body: 'Guardrails, bounded tools, audit, metering and an evaluation harness, used by every agent that follows.' },
        { title: 'Ship one agent at a time', body: 'Each behind a flag, with an evaluation set, a human review step and a rollback.' },
        { title: 'Measure, then widen', body: 'Judge each agent on real use against its evaluation set before giving it more to do.' },
    ],
    stackHeading: 'Technology we would use',
    techStack: [
        { name: 'LLMs (Claude, GPT-class)', icon: 'LLM' },
        { name: 'Managed cloud LLM platforms', icon: 'Cloud' },
        { name: 'LangGraph agents', icon: 'LG' },
        { name: 'Speech-to-text', icon: 'ASR' },
        { name: 'Python / FastAPI', icon: 'Py' },
        { name: 'TypeScript / Node.js', icon: 'TS' },
        { name: 'PostgreSQL / pgvector', icon: 'PG' },
        { name: 'Evals & tracing', icon: 'Eval' },
    ],
    results: [
        { label: 'Products', value: '5', context: 'one AI use case each' },
        { label: 'AI agents live today', value: String(liveAgents), context: 'all in the documentation product' },
        { label: 'AI agents proposed', value: String(proposedAgents), context: 'designed here, not yet built' },
        { label: 'Deterministic engines', value: String(engines), context: 'the core the agents sit on' },
    ],
    relatedServices: ['ai-agents-automation', 'ai-native-software-engineering'],
    publishedAt: '2026-10-04',
    updatedAt: '2026-10-04',
};
