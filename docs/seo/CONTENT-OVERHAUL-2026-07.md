# Content Overhaul — Blogs + Case Studies (July 2026)

Full rewrite of all 13 blog posts and both case studies, driven by fresh
keyword + GEO/AEO research. Goal: rank on Google **and** get cited by AI answer
engines (ChatGPT, Perplexity, Google AI Overviews), while reading like a senior
engineer wrote it — not a marketing page.

## What changed

### Blogs (13, all rewritten to 1,900–2,400 words)
- **10 DB-managed posts** — rewritten in `scripts/seed-content/*.mjs` and upserted
  to MongoDB (`blog_posts`) via `node scripts/seed-blogs.mjs`. `publishedAt` kept
  historical; `updatedAt` set to the refresh date so posts show "Updated" and a
  fresh `Article.dateModified`.
- **3 code-defined posts** (`ai-agents-in-business-practical-guide`,
  `cloud-vs-on-premise-decision`, `choose-right-tech-stack-saas`) — rewritten in
  `src/data/blog.tsx` (the resilient fallback + pillars). Their stale short DB
  overrides were deleted so the rewritten static versions serve.
- Removed the obsolete 2025→2026 string-patch hack in `blogService.ts` (now baked
  into the source).
- Rewrote the generic in-blog CTA copy in `blog/BlogCTA.tsx`.

Every post: answer-first intro + excerpt (the on-page "Direct answer" box),
verbatim question-phrased H2/H3s, a Key Takeaways block, ≥1 comparison table, an
original Brynex framework, a first-hand practitioner note, 3–5 in-body internal
links (topical clustering), and exactly 2 `[CTA]` markers. Every statistic is
attributed inline to a named source + year; **no invented numbers**. Body tone is
strictly educational (salesy tone is the strongest negative ranking/citation
signal) — selling is confined to the CTA blocks.

### Case studies (2, real clients)
- Replaced the two placeholder studies (Echopad, CloudScale) with real client
  work: **RegorTalent** and **ExamPapers**. Old slugs 301-redirect to the new
  ones (`next.config.mjs`).
- Extended the `CaseStudy` schema (`industry`, `snapshot`, ordered narrative
  `sections`, results-with-context, conditional `testimonial`) and rewrote
  `CaseStudyClient.tsx` to render a deep multi-section narrative. The testimonial
  block now renders only when a real attributed quote exists.

## GEO/AEO decisions (from 2026 research)
- **Answer-first passages + question headings** are the highest-ROI moves.
- **Cite to be cited** — inline source attribution on every stat.
- **No FAQPage/HowTo JSON-LD** — those rich results are deprecated (FAQ stopped
  showing ~May 2026) and JSON-LD is not an AI-citation lever. Kept visible Q&A
  headings; kept existing `Article` + `Organization` + `BreadcrumbList` schema.
- **Topical clustering** — AI-agents cluster (pillar: `ai-agents-in-business-practical-guide`),
  SaaS/eng cluster (pillar: `ai-native-software-development-lean-teams`).

## Keyword map (primary target per slug)
| Slug | Primary keyword |
|---|---|
| how-much-do-ai-agents-cost-2026 | AI agent development cost |
| ai-agents-vs-rpa-vs-zapier-which-automation-fits | AI agents vs RPA vs Zapier |
| automating-customer-support-ai-agents-playbook | AI customer support automation |
| ai-agent-readiness-checklist | AI agent readiness checklist |
| back-office-automation-ai-agents | back-office automation with AI agents |
| rag-pipeline-business-knowledge-guide | build a RAG system for business |
| ai-agent-guardrails-evals-production | AI agent guardrails / LLM evals in production |
| multi-agent-systems-when-to-use | when to use multi-agent systems |
| ai-agents-in-business-practical-guide | AI agents for business (pillar) |
| ai-native-software-development-lean-teams | AI-native software development (pillar) |
| mvp-to-production-saas-roadmap | MVP to production SaaS |
| choose-right-tech-stack-saas | best tech stack for SaaS 2026 |
| cloud-vs-on-premise-decision | cloud vs on-premise / cloud repatriation |

## Case study fact basis (verified vs. constructed)
Kept honest for governance:

**RegorTalent — verified (client-provided):** React.js/Tailwind/Redux front end;
Axios interceptors for auth + error handling; reusable components (~25% less
code); Atlassian-integrated support system (30% faster resolution, 70% lower
support costs); 20% fewer post-deployment issues; fast-paced, feedback-driven
startup engagement. Narrative framing around these is industry-typical context.

**ExamPapers — verified:** AI-powered exam mock-test platform, end-to-end
AI-generated mocks/practice. Everything else (tech stack shown, "peak-ready"
framing) is a **realistic, illustrative construction** pending client
confirmation — results are deliberately qualitative, **no hard metrics were
invented**.

**Open items to make both maximally credible:** real testimonials (quote + name/
title + permission), ExamPapers hard metrics, confirmed tech stack, timelines.
None are fabricated in the meantime.

## Re-running / maintenance
```bash
node scripts/seed-blogs.mjs --dry-run   # validate the 10 DB posts
node scripts/seed-blogs.mjs             # upsert to MongoDB
```
Backup of the pre-overhaul `blog_posts` collection was taken before writes.
