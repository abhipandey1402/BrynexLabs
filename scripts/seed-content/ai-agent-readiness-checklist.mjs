export default {
    slug: 'ai-agent-readiness-checklist',
    title: 'Is Your Business Ready for AI Agents? A 12-Point Readiness Checklist',
    excerpt: 'Most failed agent projects were doomed before a line of code was written. Score your business against 12 concrete checks — data, systems, people, and economics — and find out exactly what to fix before you build.',
    author: 'Brynex Labs Engineering',
    category: 'AI',
    seoDescription: 'AI agent readiness checklist: 12 concrete checks across data, systems, people, and economics — score yourself and know exactly what to fix before building.',
    relatedServices: ['ai-agents-automation', 'ai-native-software-engineering'],
    techTags: ['LangChain', 'n8n', 'PostgreSQL', 'MCP', 'Python'],
    content: `
        <p>The pressure to "do something with AI agents" is now coming from every direction — your board, your competitors' press releases, your own engineers. 34% of CEOs name AI their top strategic theme according to Gartner's 2026 CEO survey, and 88% of organizations plan budget increases for agentic capabilities. The money is moving whether you're ready or not.</p>
        <p>Here's the uncomfortable part: most agent projects that fail were doomed before anyone wrote a prompt. The agent didn't hallucinate its way to failure — it was handed undocumented processes, systems with no APIs, no owner, and no baseline to measure against. The technology took the blame for a readiness problem.</p>
        <p>This checklist is the assessment we wish every prospective client ran before calling us. Twelve checks across four areas: Data, Systems, People, and Economics. Score one point for every check you pass, be honest, and you'll know in twenty minutes whether to build now or fix foundations first.</p>

        <h2>How to Score Yourself</h2>
        <p>For each of the 12 checks below, give yourself one point only if the "what good looks like" description is true today — not after the project you've been meaning to do. Half-credit is self-deception; round down. Pick one specific workflow you'd want to automate (a real one, like refund processing or lead qualification) and score against that workflow, not your company in the abstract.</p>

        <h2>Data: Can an Agent Learn Your Business?</h2>
        <p>Agents are only as good as the knowledge and process definitions they're grounded in. This is where most low scores come from.</p>
        <h3>1. The process is documented — actually written down</h3>
        <p>An agent automating a workflow needs the workflow defined: steps, decision rules, exceptions, and what "done" means. If the process lives in two senior employees' heads, you'll spend the first month of any engagement extracting it.</p>
        <ul>
            <li><strong>What good looks like:</strong> a current SOP or runbook a new hire could follow without asking questions, including the edge cases.</li>
            <li><strong>Red flag:</strong> "Sarah handles those — she just knows." If Sarah's judgment can't be articulated, it can't be automated.</li>
        </ul>
        <h3>2. Your knowledge is accessible, not trapped</h3>
        <p>Retrieval-augmented agents answer from your documents — policies, past tickets, product specs. That only works if the documents exist somewhere a pipeline can reach: a wiki, a drive, a ticketing system with an export, not a graveyard of email threads and screenshots.</p>
        <ul>
            <li><strong>What good looks like:</strong> the answers your team gives customers can be traced to a source document that's reasonably current.</li>
            <li><strong>Red flag:</strong> three conflicting versions of the pricing policy, and nobody is sure which one is real.</li>
        </ul>
        <h3>3. Your structured data is clean enough to act on</h3>
        <p>If the agent will look up orders, customers, or invoices, those records need consistent identifiers and tolerable hygiene. Perfect data isn't required — agents handle ambiguity better than scripts do — but an agent acting on records where 30% of fields are stale will confidently do the wrong thing.</p>
        <ul>
            <li><strong>What good looks like:</strong> one system of record per entity, and your team trusts it enough to make decisions from it.</li>
            <li><strong>Red flag:</strong> customer data lives in four tools and reconciliation means a quarterly spreadsheet ritual.</li>
        </ul>

        <h2>Systems: Can an Agent Actually Act?</h2>
        <p>An agent that can't reach your tools is a chatbot. These three checks determine whether the "act" half of agentic automation is even possible.</p>
        <h3>4. Your core tools expose APIs</h3>
        <p>Agents take action by calling APIs — creating tickets, updating records, sending messages. Modern SaaS tools nearly all have them; legacy and on-premise systems often don't. Screen-scraping and browser automation exist as fallbacks, but they're brittle and should be a bridge, not a plan.</p>
        <ul>
            <li><strong>What good looks like:</strong> the three systems in your chosen workflow all have documented REST or GraphQL APIs, or support standard connectors (MCP servers, n8n nodes, native integrations).</li>
            <li><strong>Red flag:</strong> the critical step happens inside a desktop application from 2009 with no API and no export.</li>
        </ul>
        <h3>5. Your auth model can give an agent its own identity</h3>
        <p>An agent should act as a service account with scoped, revocable permissions — not as a borrowed copy of an admin's credentials. This is both a security requirement and an audit one: when something goes wrong, you need to know it was the agent, and you need to be able to shut it off in one place.</p>
        <ul>
            <li><strong>What good looks like:</strong> you can issue API keys or OAuth clients per integration, scope them to least privilege, and revoke them centrally.</li>
            <li><strong>Red flag:</strong> shared logins in a password spreadsheet, and the plan is to give the agent one of those.</li>
        </ul>
        <h3>6. You have somewhere safe to test</h3>
        <p>Agents in development will do unexpected things — that's what development is for. They need a sandbox: a staging environment, test accounts, or at minimum a dry-run mode where actions are logged instead of executed. Teams without one either test in production (dangerous) or never grant write access (useless).</p>
        <ul>
            <li><strong>What good looks like:</strong> a staging instance or sandbox tenant for each system the agent touches, with realistic test data.</li>
            <li><strong>Red flag:</strong> "we only have production." That's solvable, but it must be solved before an agent gets write permissions.</li>
        </ul>
        [CTA]
        <h2>People: Will Anyone Own It?</h2>
        <p>Agents are software that behaves probabilistically, which means they need ongoing human ownership more than traditional automation does — not less.</p>
        <h3>7. One named internal owner</h3>
        <p>Not a committee, not "the ops team" — a person whose job includes the agent's performance. They review transcripts weekly, triage failures, decide when the agent's scope expands, and act as the bridge between the business and whoever built it.</p>
        <ul>
            <li><strong>What good looks like:</strong> you can name the owner right now, they have hours allocated, and they're enthusiastic rather than assigned.</li>
            <li><strong>Red flag:</strong> "we'll figure out ownership after launch." Unowned agents degrade quietly until an incident makes them owned.</li>
        </ul>
        <h3>8. The team it affects is bought in</h3>
        <p>The people who run the workflow today are your best source of edge cases and your fastest path to failure if they see the agent as a replacement threat. Position it honestly: the agent takes the repetitive 60%, humans keep the judgment calls, and the team helps define which is which.</p>
        <ul>
            <li><strong>What good looks like:</strong> frontline staff have been told what's being automated and why, and at least one of them is actively contributing edge cases.</li>
            <li><strong>Red flag:</strong> the project is a secret from the team it affects, or framed internally as headcount reduction.</li>
        </ul>
        <h3>9. Defined escalation paths</h3>
        <p>Every production agent needs a clear answer to "what happens when it's unsure?" — a confidence threshold, a human queue, and a response-time expectation for that queue. Escalation isn't an admission of weakness; it's the mechanism that lets you launch at 80% coverage instead of waiting forever for 100%.</p>
        <ul>
            <li><strong>What good looks like:</strong> you can describe which cases go to humans, who receives them, and how fast they'll respond.</li>
            <li><strong>Red flag:</strong> the implicit plan is "the agent should just handle everything."</li>
        </ul>

        <h2>Economics: Will It Pay?</h2>
        <p>61% of CFOs say AI agents are changing how they evaluate tech ROI, per Deloitte. That's good news if you have numbers — and a fast "no" if you don't.</p>
        <h3>10. A workflow with real, measurable volume</h3>
        <p>Agents earn their keep on repetition. A task done 40 times a day is a candidate; a task done 4 times a month is a hobby. Take a hypothetical 12-person support team handling 8,000 tickets a month at roughly 8 minutes each — automating even 40% of those well is over 425 hours back every month, which is real money. The verified-ROI deployments cluster in exactly these high-volume lanes: customer service automation, contract review, supply chain orchestration, fraud detection.</p>
        <ul>
            <li><strong>What good looks like:</strong> your chosen workflow runs hundreds of times a month, and you know the number.</li>
            <li><strong>Red flag:</strong> the candidate workflow was chosen because it's impressive, not because it's frequent.</li>
        </ul>
        <h3>11. Baseline metrics you already track</h3>
        <p>You can't prove an agent saved 30% of handle time if you never measured handle time. The baseline must exist before launch: volume, time per item, error or rework rate, cost per item. Average reported ROI on agentic deployments runs around 171% per Landbase research — but the organizations reporting it can do so only because they measured the before.</p>
        <ul>
            <li><strong>What good looks like:</strong> you can state today's cost-per-ticket or hours-per-contract from a dashboard, not a guess.</li>
            <li><strong>Red flag:</strong> the business case is built entirely on vibes and a vendor's calculator.</li>
        </ul>
        <h3>12. Budget for iteration, not just the build</h3>
        <p>Agents are not fire-and-forget software. The first month in production surfaces edge cases no spec anticipated, and the teams seeing the strongest returns — 66% of adopters report measurable productivity gains, and 62% expect ROI above 100% — get there through post-launch tuning. A realistic budget reserves 25-40% of the build cost for the first quarter of iteration, plus ongoing inference costs.</p>
        <ul>
            <li><strong>What good looks like:</strong> the budget line says "build and improve," with monitoring and model costs forecast past launch.</li>
            <li><strong>Red flag:</strong> the project is funded like a one-time website build, ending the day it ships.</li>
        </ul>

        <h2>Your Score: What It Means</h2>
        <table>
            <thead>
                <tr><th>Score</th><th>Verdict</th><th>What to do</th></tr>
            </thead>
            <tbody>
                <tr><td>0-4</td><td>Fix foundations first</td><td>An agent project now would stall in discovery. Spend 4-8 weeks on process documentation and API access before spending anything on AI.</td></tr>
                <tr><td>5-8</td><td>Start with one pilot workflow</td><td>You're ready for a scoped pilot on your strongest workflow — one agent, narrow scope, human review on every action — while you close the remaining gaps in parallel.</td></tr>
                <tr><td>9-12</td><td>Ready for production agents</td><td>Your constraint is prioritization, not readiness. Pick the highest-volume workflow, set baselines, and build toward autonomous operation with escalation paths.</td></tr>
            </tbody>
        </table>
        <p>One caution for high scorers: 9-12 means ready, not finished. Production agents still need evaluation suites, guardrails, and observability — readiness gets you to the starting line in good shape, not across the finish.</p>

        <h2>Scored Low? Fix These Two Things First</h2>
        <p>Low scores cluster on the same two checks almost every time, and they happen to be the two cheapest to fix.</p>
        <p><strong>First, process documentation (check 1).</strong> Have the person who runs the workflow record themselves doing it for a week — screen recordings plus a running commentary of decisions. Turn that into a draft SOP, then have a second person follow it and note where they got stuck. Two weeks, near-zero cost, and it pays off even if you never build an agent.</p>
        <p><strong>Second, API access (check 4).</strong> Inventory the systems in your target workflow and check each one's API documentation, plan tier (APIs are often gated behind higher tiers), and rate limits. Where a system has no API, decide now: upgrade, replace, or bridge it with an automation layer like n8n. This is procurement and configuration work, not engineering — but it gates everything downstream.</p>
        <p>Notice that neither fix requires AI expertise, a data science hire, or a platform decision. Readiness is mostly unglamorous operational hygiene — which is exactly why teams that have it move so much faster than teams that skipped it.</p>
        <blockquote>
            <p>Agent projects don't fail because the AI isn't good enough. They fail because the business wasn't ready — and readiness is checkable in an afternoon and fixable in a quarter.</p>
        </blockquote>
        [CTA]
        <h2>From Checklist to First Agent</h2>
        <p>If you scored 5 or above, your gaps map directly onto what a competent first engagement does anyway. At Brynex Labs, every <a href="/services/ai-agents-automation">agentic AI engagement</a> starts with use-case and ROI mapping — which forces checks 10 and 11 — followed by a data and retrieval foundation phase that resolves checks 1-3, and an agent design phase that formalizes escalation paths and sandboxed testing. A good partner doesn't demand a perfect score; they sequence the first phase to close your specific gaps while the build progresses. If the gaps are deeper on the systems side — missing APIs, legacy tools that need modernizing first — that's an <a href="/services/ai-native-software-engineering">engineering problem with a known playbook</a>, not a dead end.</p>
        <p>Your next step is simple: pick your one workflow, run the 12 checks with the people who actually do the work, and write the score down. If it's 5+, bring that scored checklist to a conversation with us — it's the single most useful document you can show up with, and it turns a generic discovery call into a concrete plan with a number attached.</p>
    `,
};
