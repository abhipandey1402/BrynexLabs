# Brynex Labs — Keyword Strategy (USA + India)

> Companion to `OFF-PAGE-SEO-PLAYBOOK.md`. This maps every target keyword to a page,
> intent stage, and market. Review quarterly; refresh volumes/difficulty in Ahrefs or Semrush.
> Last updated: June 2026.

## Positioning summary

Brynex Labs sells three things. Every keyword below ladders up to one of them:

1. **Agentic AI & Intelligent Automation** → `/services/ai-agents-automation`
2. **AI-Native Software Engineering (custom software / SaaS)** → `/services/ai-native-software-engineering`
3. **SaaS SEO for B2B companies** → `/services/saas-seo`

Strategic insight from research: in 2026, **buyer-intent ("hire", "company", "services",
"pricing", "cost") keywords beat high-volume head terms** for lead generation, and AI-search
(Google AI Overviews, ChatGPT, Perplexity) citations convert ~5x better than classic organic.
Structured, specific, commercially useful pages win both.

---

## Primary money keywords (BOFU — these generate leads)

### Pillar 1 — AI Agents & Automation

| Keyword | Market | Intent | Target page |
|---|---|---|---|
| AI agent development company | US + IN | BOFU | /services/ai-agents-automation |
| AI agent development services | US + IN | BOFU | /services/ai-agents-automation |
| agentic AI development | US | BOFU | /services/ai-agents-automation |
| AI automation agency | US + IN | BOFU | /services/ai-agents-automation |
| custom AI agent development | US | BOFU | /services/ai-agents-automation |
| RAG development services | US | BOFU | /services/ai-agents-automation |
| LLM development company | US + IN | BOFU | /services/ai-agents-automation |
| enterprise AI automation services | US | BOFU | /services/ai-agents-automation |
| hire AI developers | US + IN | BOFU | /hire-ai-developers |
| hire AI engineers India | US + IN | BOFU | /hire-ai-developers |
| dedicated AI development team | US | BOFU | /hire-ai-developers |
| AI agent development cost | US + IN | BOFU/MOFU | service FAQ (answered) |

### Pillar 2 — Custom Software / SaaS Engineering

| Keyword | Market | Intent | Target page |
|---|---|---|---|
| custom software development company | US + IN | BOFU | /services/ai-native-software-engineering |
| SaaS development company | US + IN | BOFU | /services/ai-native-software-engineering |
| offshore software development company India | US | BOFU | /ai-development-company-in-india |
| AI development company in India | US + IN | BOFU | /ai-development-company-in-india |
| software development company in India | US + IN | BOFU | /ai-development-company-in-india |
| web application development services | US + IN | BOFU | /services/ai-native-software-engineering |
| MVP development company | US + IN | BOFU | /services/ai-native-software-engineering |
| application modernization services | US | BOFU | /services/ai-native-software-engineering |
| custom software development cost | US + IN | MOFU | service FAQ (answered) |

### Pillar 3 — SaaS SEO

| Keyword | Market | Intent | Target page |
|---|---|---|---|
| SaaS SEO agency | US + IN | BOFU | /services/saas-seo |
| B2B SaaS SEO services | US | BOFU | /services/saas-seo |
| SEO for SaaS companies | US + IN | BOFU/MOFU | /services/saas-seo |
| SaaS SEO consultant | US | BOFU | /services/saas-seo |
| programmatic SEO services | US | BOFU | /services/saas-seo |
| SaaS SEO agency India | IN | BOFU | /services/saas-seo |

---

## Supporting keywords (MOFU/TOFU — blog content engine)

Publish via the Super Admin CMS (`/super-admin`). Each post must link to its money page
and end with a service CTA. Target cadence: **2 posts/month minimum.**

### AI pillar cluster (link to /services/ai-agents-automation)
- "AI agents vs chatbots: what businesses actually need" (comparison — high AI-Overview citation potential)
- "How much does it cost to build an AI agent in 2026" (pricing content ranks + converts)
- "LangChain vs LangGraph vs CrewAI: production comparison"
- "RAG architecture guide: vector databases compared (Pinecone vs Qdrant vs pgvector)"
- "AI agent ROI: how to measure automation savings"
- "AI customer support automation: implementation guide"

### Software pillar cluster (link to /services/ai-native-software-engineering)
- "In-house vs outsourced software development: 2026 cost analysis"
- "How to choose a custom software development company (checklist)"
- "Offshore development to India: complete guide for US founders"
- "MVP development timeline: what 8–12 weeks actually looks like"
- "Multi-tenant SaaS architecture: a practical guide"

### SaaS SEO pillar cluster (link to /services/saas-seo)
- "BOFU keywords for SaaS: how to find them"
- "Programmatic SEO for SaaS: templates and pitfalls"
- "SaaS SEO vs paid ads: CAC comparison"
- "How B2B SaaS gets cited in AI Overviews / ChatGPT (GEO guide)"

---

## Title/meta conventions (applied on-page)

- Titles ≤ 60 chars, primary keyword **first**, brand last: `AI Agent Development Company | …`
- Descriptions 140–160 chars, include keyword + geo (USA & India) + a concrete hook (price, speed, outcome).
- One H1 per page containing the primary keyword. H2s carry secondary keywords.
- Every service/landing page carries: `Service` + `BreadcrumbList` + `FAQPage` JSON-LD.
- FAQs must answer **price and geography questions verbatim** — these are the queries AI engines cite.

## Geo strategy

- **USA (revenue market):** lead with outcomes + cost advantage ("40–60% below US rates"), US-style trust signals (NDA, IP transfer, timezone overlap). USD pricing on pages.
- **India (volume + local market):** `/ai-development-company-in-india` is the geo hub. Footer states "Based in India · Working Globally". Add city pages (Bangalore, Pune, Delhi NCR) ONLY if/when a physical presence or GBP listing exists — never fake locations.
- `Organization.areaServed` schema lists US, IN, UK, AU, CA on the homepage.

## Measurement

- GSC: track query → page mapping monthly; flag any money keyword stuck on page 2 (those get the off-page push first).
- GA4: organic sessions → contact-form conversions per landing page (events already wired via `src/lib/tracking.ts`).
- Rank tracking: set up the BOFU tables above in Ahrefs/Semrush with US and IN locations separately.
