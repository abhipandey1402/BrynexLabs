import type { CaseStudy, CaseStudyProduct } from './case-studies';
import type { BlueprintDeepDive } from './blueprint-types';

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

/** Quarter in which a roadmap item's Rollout begins: when a new agent counts as in production. */
const totalAgents = liveAgents + proposedAgents;

const blueprint: BlueprintDeepDive = {
    roadmapHeading: 'The 24-month roadmap',
    roadmapIntro:
        'Eight quarters, five products and one shared layer. Each new agent moves through design, a pilot and a staged rollout, and the order follows how easy each one is to check, not how impressive it is. These are planning assumptions, not promises.',
    roadmap: {
        quarters: 8,
        baselineAgents: liveAgents,
        lanes: [
            {
                name: 'Shared agent layer',
                icon: 'layers',
                items: [
                    { label: 'Guardrails, bounded tools, audit, evals, metering', segments: [{ stage: 'Build', from: 1, to: 2 }, { stage: 'Operate', from: 3, to: 8 }] },
                    { label: 'Model portability and cost tuning', segments: [{ stage: 'Design', from: 4, to: 5 }, { stage: 'Rollout', from: 6, to: 8 }] },
                ],
            },
            {
                name: 'Note Studio',
                icon: 'file',
                items: [
                    { label: 'Evals and audit around live agents', segments: [{ stage: 'Harden', from: 1, to: 2 }, { stage: 'Operate', from: 3, to: 8 }] },
                ],
            },
            {
                name: 'Voice Desk',
                icon: 'mic',
                items: [
                    { label: 'Measure speech accuracy on real recordings', segments: [{ stage: 'Harden', from: 1, to: 2 }] },
                    { label: 'Note-structuring agent', agent: true, segments: [{ stage: 'Design', from: 3, to: 4 }, { stage: 'Pilot', from: 5, to: 5 }, { stage: 'Rollout', from: 6, to: 8 }] },
                ],
            },
            {
                name: 'Handoff',
                icon: 'network',
                items: [
                    { label: 'Intake agent', agent: true, segments: [{ stage: 'Design', from: 2, to: 3 }, { stage: 'Pilot', from: 4, to: 4 }, { stage: 'Rollout', from: 5, to: 8 }] },
                    { label: 'Chase agent', agent: true, segments: [{ stage: 'Design', from: 6, to: 6 }, { stage: 'Pilot', from: 7, to: 7 }, { stage: 'Rollout', from: 8, to: 8 }] },
                ],
            },
            {
                name: 'Nudge',
                icon: 'message',
                items: [
                    { label: 'Reply-understanding agent', agent: true, segments: [{ stage: 'Design', from: 3, to: 3 }, { stage: 'Pilot', from: 4, to: 5 }, { stage: 'Rollout', from: 6, to: 8 }] },
                    { label: 'Template-drafting agent', agent: true, segments: [{ stage: 'Design', from: 6, to: 6 }, { stage: 'Pilot', from: 7, to: 7 }, { stage: 'Rollout', from: 8, to: 8 }] },
                ],
            },
            {
                name: 'Rate Lens',
                icon: 'chart',
                items: [
                    { label: 'Ask-the-data agent', agent: true, segments: [{ stage: 'Design', from: 4, to: 5 }, { stage: 'Pilot', from: 6, to: 6 }, { stage: 'Rollout', from: 7, to: 8 }] },
                    { label: 'Contract-reader agent', agent: true, segments: [{ stage: 'Design', from: 6, to: 6 }, { stage: 'Pilot', from: 7, to: 7 }, { stage: 'Rollout', from: 8, to: 8 }] },
                ],
            },
            {
                name: 'Across the suite',
                icon: 'workflow',
                items: [
                    { label: 'Referral-to-visit loop', segments: [{ stage: 'Design', from: 5, to: 6 }, { stage: 'Pilot', from: 7, to: 7 }, { stage: 'Rollout', from: 8, to: 8 }] },
                ],
            },
        ],
    },
    flowHeading: 'How one referral travels through the suite',
    flowIntro:
        'The suite earns its complexity when products hand work to each other. This is the journey of a single referral, and which steps are an agent, an engine or a person.',
    flow: [
        { title: 'A referral arrives', owner: 'Handoff', actor: 'Agent', status: 'Roadmap', icon: 'inbox', detail: 'The intake agent reads the email or document and proposes the structured fields, quoting the source text behind each one.' },
        { title: 'A coordinator confirms', owner: 'A person', actor: 'Person', status: 'Human', icon: 'review', detail: 'Every field is checked against its quote before a referral is created. Nothing enters the queue unreviewed.' },
        { title: 'Rules route it', owner: 'Handoff', actor: 'Engine', status: 'Live', icon: 'workflow', detail: 'Screening and priority rules the practice configures send the referral to the right queue, the same way every time.' },
        { title: 'The patient is reached', owner: 'Nudge', actor: 'Engine', status: 'Live', icon: 'message', detail: 'The workflow engine sends an approved message and handles yes, no and stop. A reply-understanding agent (proposed) will read free-text answers and hand unsure ones to staff.' },
        { title: 'The visit is captured', owner: 'Voice Desk', actor: 'Engine', status: 'Live', icon: 'mic', detail: 'The speech engine transcribes the visit with speaker labels. A note-structuring agent (proposed) will draft a structured note from it, citing the lines it used.' },
        { title: 'The note is drafted and signed', owner: 'Note Studio', actor: 'Agent', status: 'Live', icon: 'file', detail: 'The drafting agent writes only what was said, the code-check agent verifies codes, and the clinician reviews and signs.' },
        { title: 'Rates are read against the market', owner: 'Rate Lens', actor: 'Engine', status: 'Live', icon: 'chart', detail: 'Separately, leaders compare contracted rates with peer and market averages. An ask-the-data agent (proposed) will let them question the data in plain language.' },
    ],
    autonomyHeading: 'How much each agent may do on its own',
    autonomyIntro:
        'Every agent gets an explicit ceiling, agreed before it is built. The rule: nothing that touches a patient or a payer goes beyond drafting for a person to approve. Only read-only or refuse-only agents may act alone.',
    autonomy: [
        { agent: 'Input guardrail', product: 'Note Studio', ceiling: 3, status: 'Live', note: 'Blocks out-of-scope input on its own. It only refuses; it never acts on a record.' },
        { agent: 'Drafting agent', product: 'Note Studio', ceiling: 2, status: 'Live', note: 'Streams a draft. The clinician reviews and signs.' },
        { agent: 'Code-check agent', product: 'Note Studio', ceiling: 2, status: 'Live', note: 'Verifies codes against reference lookups and shows them in the draft.' },
        { agent: 'Template builder', product: 'Note Studio', ceiling: 2, status: 'Live', note: 'Previews a template. The user confirms it.' },
        { agent: 'Note-structuring agent', product: 'Voice Desk', ceiling: 2, status: 'Roadmap', note: 'Drafts from the transcript with line citations. Nothing is pasted until approved.' },
        { agent: 'Intake agent', product: 'Handoff', ceiling: 2, status: 'Roadmap', note: 'Proposes fields with source quotes. A coordinator confirms.' },
        { agent: 'Chase agent', product: 'Handoff', ceiling: 2, status: 'Roadmap', note: 'Drafts the nudge. A person sends it.' },
        { agent: 'Reply-understanding agent', product: 'Nudge', ceiling: 2, status: 'Roadmap', note: 'Proposes the next step. Unsure or clinical replies go to staff untouched.' },
        { agent: 'Template-drafting agent', product: 'Nudge', ceiling: 2, status: 'Roadmap', note: 'An administrator approves every template before it is used.' },
        { agent: 'Ask-the-data agent', product: 'Rate Lens', ceiling: 3, status: 'Roadmap', note: 'Read-only. Chooses from approved queries and shows the result; it cannot change anything.' },
        { agent: 'Contract-reader agent', product: 'Rate Lens', ceiling: 2, status: 'Roadmap', note: 'Proposes terms with clause quotes for a person to verify.' },
    ],
    evalHeading: 'Keeping eleven agents honest',
    evalIntro:
        'Shipping an agent is the start. Over two years the work is staying right while models, prompts, customers and inputs all change. One evaluation loop runs for every agent, for the life of the product.',
    evalLoop: [
        { title: 'Golden sets', detail: 'Curated, reviewed examples for every agent, written with the people who do the job.', icon: 'checklist' },
        { title: 'Offline evals', detail: 'Every prompt, model or tool change is scored against the golden sets before it can ship.', icon: 'chart' },
        { title: 'Shadow mode', detail: 'The agent runs on real work with its output hidden, so we can compare it with what people did.', icon: 'search' },
        { title: 'Pilot', detail: 'A few willing customers use it with the review step on and the kill switch ready.', icon: 'users' },
        { title: 'Production sampling', detail: 'A sample of live outputs is reviewed on a schedule, with permission, to catch drift early.', icon: 'radar' },
        { title: 'Fix and re-baseline', detail: 'Failures become new golden examples, and the bar moves up for the next change.', icon: 'sparkles' },
    ],
    riskHeading: 'What can go wrong, and what stops it',
    riskIntro:
        'A long-lived agent programme fails in predictable ways. Each risk has a named control, and each control is one of three kinds: it prevents the failure, detects it early, or contains the damage.',
    risks: [
        { risk: 'Invented details', scenario: 'An agent writes a plausible field, code or term that was never in the source.', control: 'Quote the source for every extracted value, leave gaps visibly empty, and require a person to confirm.', kind: 'Prevent' },
        { risk: 'Instructions hidden in documents', scenario: 'A referral email or contract contains text that tries to give the agent orders.', control: 'Treat inbound content as data, never as instructions. Agents get bounded tools and no path from document text to action.', kind: 'Prevent' },
        { risk: 'Patient data in the wrong place', scenario: 'Identifiers leak into logs, traces or a model request that did not need them.', control: 'Minimum necessary data, redaction in logs and telemetry, and provider agreements in place before any protected data is sent.', kind: 'Prevent' },
        { risk: 'Over-trust', scenario: 'People stop checking because the agent is usually right.', control: 'Review screens that force a decision, spot checks of approved work, and an autonomy ceiling that keeps a person in charge.', kind: 'Detect' },
        { risk: 'Quiet quality drift', scenario: 'Accuracy slides over months as inputs, prompts or models change.', control: 'Continuous evaluation on golden sets and reviewed production samples, with alerts when scores fall.', kind: 'Detect' },
        { risk: 'A provider change', scenario: 'A model is retired or its behaviour shifts, and an agent starts failing.', control: 'A thin model abstraction, versioned prompts and evaluation gates, so changes are tested and reversible.', kind: 'Contain' },
        { risk: 'Runaway cost', scenario: 'Usage spikes for one customer and costs follow.', control: 'Per-customer metering and caps, with a graceful fall-back to the deterministic path.', kind: 'Contain' },
        { risk: 'A bad day', scenario: 'An agent misbehaves in production.', control: 'A kill switch per agent and per customer, and a rehearsed incident playbook.', kind: 'Contain' },
    ],
};

export const platformStudy: CaseStudy = {
    slug: 'healthcare-ai-platform-agent-roadmap',
    title: 'A Two-Year AI Agent Roadmap for a Five-Product Healthcare Platform',
    clientName: 'Healthcare AI platform',
    industry: 'Healthcare AI · Multi-product platform',
    summary:
        'A healthcare software company sells five products on one platform: clinical documentation, dictation, referral tracking, patient texting and payer-rate benchmarking. This roadmap lays out a 24-month plan for AI agents across all five: where each belongs, how it rolls out quarter by quarter, how much it may do on its own, and the controls that keep eleven agents honest.',
    kicker: 'Healthcare AI · 24-month roadmap',
    tags: ['AI agents', 'Healthcare', 'Roadmap', 'Platform design'],
    kind: 'platform',
    art: 'suite',
    seo: {
        title: 'AI Agent Roadmap for a Healthcare Platform | Brynex Labs',
        metaDescription:
            'A 24-month plan: where AI agents belong across five healthcare products, how they roll out quarter by quarter, and the controls that keep them safe.',
    },
    snapshot: [
        { label: 'Industry', value: 'Healthcare AI · multi-product platform' },
        { label: 'Type', value: 'Roadmap and design, no results claimed' },
        { label: 'Horizon', value: '24 months, eight quarters' },
        { label: 'Scope', value: 'Five products and one shared agent layer' },
    ],
    takeaways: [
        { label: 'What it is', text: 'A 24-month plan for AI agents across five healthcare products on one platform. It is a plan, so no results are claimed.' },
        { label: 'The finding', text: 'One product already runs LLM agents, one runs speech models, and three run on deterministic engines with no AI at all.' },
        { label: 'The design', text: 'One shared agent layer with guardrails, bounded tools, provenance, audit and evals, and an autonomy ceiling so a person always decides.' },
        { label: 'The plan', text: 'Eight quarters, in order: the shared layer first, then referral intake and reply understanding, and last the strictest agents.' },
    ],
    architectureHeading: 'One agent layer, five products',
    architectureIntro: 'The products stay as they are. A shared agent layer sits between them and a deterministic core, so every agent follows the same rules.',
    architecture: [
        { layer: 'Products', caption: 'What customers buy', icon: 'layers', items: ['Note Studio', 'Voice Desk', 'Handoff', 'Nudge', 'Rate Lens'] },
        { layer: 'Shared agent layer', caption: 'The same rules everywhere', icon: 'bot', highlight: true, items: ['Guardrail at the door', 'Bounded toolsets', 'Provenance and quotes', 'Human review', 'Audit log', 'Evaluation sets', 'Usage metering', 'Kill switches'] },
        { layer: 'Deterministic core', caption: 'Where the facts live', icon: 'cpu', items: ['Rules and routing', 'Queries and reports', 'Workflow engine', 'Records'] },
        { layer: 'Platform', caption: 'What every product shares', icon: 'database', items: ['Sign-in and licensing', 'Billing', 'Tenant isolation', 'Cloud data and queues'] },
    ],
    blueprint,
    lessons: [
        { title: 'Not every product needs an agent', body: 'Three of the five run on deterministic engines, and that is the right answer. Add an agent only where it saves real time at acceptable risk.' },
        { title: 'One layer, not five chatbots', body: 'Shared guardrails, audit and metering make each new agent cheaper to ship and safer to run than the last.' },
        { title: 'Quote the source', body: 'Where an agent extracts or summarises, it shows the exact line it used. Checking takes seconds, and trust follows.' },
        { title: 'Sequence by how easy it is to verify', body: 'Start where outputs are easiest to check, then widen. The strictest agents come last.' },
        { title: 'Set the autonomy ceiling first', body: 'Agree how much each agent may do alone before it is built. Retrofitting limits onto a trusted agent is far harder than starting with them.' },
        { title: 'Count review time as a cost', body: 'An agent that saves ten minutes but needs eight to check has saved little. Measure the whole loop, not just the model.' },
    ],
    faqs: [
        { q: 'Has this plan been delivered?', a: 'No. This page describes a plan, not delivered work. Where the platform already has an AI capability we mark it Live, and everything else is a proposal marked Roadmap. We claim no results and make no delivery promises.' },
        { q: 'Which of these agents exist today?', a: `In the platform, ${liveAgents} AI agents exist today, all in the documentation product. The other ${proposedAgents} AI agents here are proposals marked Roadmap.` },
        { q: 'Why a two-year plan?', a: 'Each agent needs design, shadow mode, a pilot and a staged rollout, and several depend on each other. Spreading them over eight quarters earns customer trust one safe agent at a time, which lasts longer than shipping them all at once.' },
        { q: 'How would you keep patient data safe?', a: 'Send models only the minimum necessary data, keep patient details out of logs, isolate every customer on every query, and put provider agreements in place before protected health information reaches a model. Compliance claims belong to the platform owner and its auditors.' },
        { q: 'Can you design an agent roadmap for our platform?', a: 'Yes. We design and build AI agent layers with guardrails, audit and evaluation, and plan their rollout, for platforms of any size.' },
    ],
    productsHeading: 'Five products, five AI use cases',
    productsIntro:
        'Each product gets one clear job for AI, a bounded toolset and a human in the loop. Live means the capability exists in the platform today. Roadmap means we propose it and it is not built yet.',
    products,
    sections: [
        {
            heading: 'About this roadmap',
            paragraphs: [
                'A healthcare software company sells five products on one login, one bill and one audit trail: clinical documentation, dictation, referral tracking, patient texting and payer-rate benchmarking. Together they give an unusually clear picture of where AI agents belong, and where they do not.',
                'It lays out a 24-month plan for AI agents across all five: one clear job for AI in each product, the agents that do it, how each rolls out, and the safeguards around them. Where an AI capability already exists in the platform today we mark it Live. Where we propose one that does not exist yet we mark it Roadmap. We publish no results or performance figures: this page describes a plan, not an outcome.',
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
                'That is the right territory for AI agents, and also the risky one. The data is protected health information, the decisions affect patients, and a confident wrong answer costs more than a slow right one. So the question is not whether to add agents, but where, in what order and with what limits.',
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
            heading: 'Why Two Years',
            paragraphs: [
                'Each agent has to pass through design, shadow mode, a pilot with a few customers and a staged rollout. That takes a quarter or more per agent, even with a shared layer, and some depend on others: reply understanding needs the outreach engine, and the referral-to-visit loop needs intake, outreach and documentation all working.',
                'The second reason is trust. Healthcare customers adopt agents slowly and forgive them rarely. A plan that earns trust one safe agent at a time lasts longer than one that ships eleven at once.',
            ],
            bullets: [
                'Quarters 1 to 2, foundation: Build the shared layer and put evaluation and audit around the agents that already exist.',
                'Quarters 2 to 6, the first new agents: Referral intake and reply understanding, the two with the clearest payoff and the easiest checks.',
                'Quarters 3 to 7, widening: Note structuring for dictation, then ask-the-data for rate benchmarking.',
                'Quarters 6 to 8, the hardest and the joined-up: Contract reading, follow-up chasing, template drafting, and the loop that links referrals, outreach and documentation.',
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
            heading: 'Operating Model',
            paragraphs: ['A plan this long needs owners. We would organise around a small standing team that owns the shared layer, plus a named owner for each agent.'],
            bullets: [
                'AI product owner: Decides which agent ships next, owns each autonomy ceiling and signs off every rollout stage.',
                'Evaluation engineer: Owns the golden sets, the evaluation harness and the production-sampling process.',
                'Platform engineers: Own the guardrails, tool gateway, audit log, metering and model abstraction.',
                'Clinical and privacy reviewers: Review prompts, outputs and data flows before anything reaches a pilot.',
                'Change control for prompts and models: Prompts and model versions are versioned, evaluated and rolled out behind flags like code, with a quick rollback.',
                'A kill switch per agent and per customer: Any agent can be turned off for one customer or for all of them in minutes, without a deploy.',
            ],
        },
        {
            heading: 'Cost and Scale',
            paragraphs: ['Agents add a new kind of running cost: model calls, speech minutes and, above all, human review time. Cost has to be designed in, per customer, from the first agent.'],
            bullets: [
                'Meter everything: Every model call and speech minute is attributed to a customer and a product, so cost is visible before it is a surprise.',
                'Right-size the model: Small, fast models for classification and routing, larger ones only for drafting, and caching wherever inputs repeat.',
                'Cap and degrade gracefully: Per-customer limits with a clear fall-back to the deterministic path, so a cap never breaks a workflow.',
                'Count review time: An agent that saves ten minutes but needs eight to check has not saved much. Measure the whole loop.',
                'Plan for model change: Providers change models, prices and limits. A thin abstraction and a standing evaluation set make switching an evaluation exercise, not a rewrite.',
            ],
        },
        {
            heading: 'Decisions to Make First',
            paragraphs: ['Before the first new agent is built, five decisions shape everything after. Getting them wrong is expensive; getting them early is cheap.'],
            bullets: [
                'The autonomy ceiling: Agree in writing how much each agent may do alone. We propose that nothing that touches a patient or a payer goes beyond drafting for approval.',
                'The data boundary: Decide what protected health information may reach a model, which provider terms must exist first, and what stays inside the platform.',
                'The review experience: Design how people check agent work, because a slow or easy-to-rubber-stamp review screen quietly undoes every other control.',
                'The definition of done: Agree the evaluation bar an agent must clear to leave pilot, before the pilot begins.',
                'The shutdown rule: Agree in advance what level of error or complaint pauses an agent.',
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
        {
            heading: 'Scope and Limits',
            paragraphs: [
                'This is a plan. It does not include legal or regulatory advice, pricing, headcount or budget, vendor selection, or any claim about how the platform performs today. Compliance obligations belong to the platform’s owner and its advisers, and every date here is a planning assumption, not a promise.',
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
        { title: 'Operate and keep improving', body: 'Run the evaluation loop continuously, review production samples, and retire or retrain any agent that drifts.' },
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
        { name: 'Prompt and model versioning', icon: 'Ver' },
        { name: 'Feature flags & kill switches', icon: 'Flag' },
        { name: 'Audit log & observability', icon: 'Obs' },
    ],
    results: [
        { label: 'Products', value: '5', context: 'one AI use case each' },
        { label: 'AI agents by month 24', value: String(totalAgents), context: `${liveAgents} live today, ${proposedAgents} proposed` },
        { label: 'Quarters planned', value: '8', context: 'design, pilot, rollout for each agent' },
        { label: 'Deterministic engines', value: String(engines), context: 'the core the agents sit on' },
    ],
    relatedServices: ['ai-agents-automation', 'ai-native-software-engineering'],
    publishedAt: '2026-10-04',
    updatedAt: '2026-10-04',
};
