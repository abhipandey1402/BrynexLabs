# Brynex Labs — Complete SEO Playbook (On-Page · Off-Page · GEO · Conversion)

> The end-to-end strategy an SEO lead would actually execute to take Brynex from a freshly-indexed site to **top-10–20 rankings on 20+ high-intent niche keywords**, and — crucially — to **convert that traffic into qualified leads.**
>
> Canonical host: `https://brynex.in` (apex) · Markets: USA (primary), India (`/in/*`)
> Related: [`SEO-MASTER-PLAN.md`](./SEO-MASTER-PLAN.md) · [`ONPAGE-IMPLEMENTATION-BACKLOG.md`](./ONPAGE-IMPLEMENTATION-BACKLOG.md) · [`../seo/KEYWORD-STRATEGY.md`](../seo/KEYWORD-STRATEGY.md) · [`../seo/OFF-PAGE-SEO-PLAYBOOK.md`](../seo/OFF-PAGE-SEO-PLAYBOOK.md)

---

## 0. The goal, stated precisely

**Primary objective:** rank in the **top 10** (top 20 minimum) for a portfolio of **20+ commercial-intent keywords** across our three pillars, in the USA and India.

**Real objective (don't lose sight of it):** rankings are a means; **booked discovery calls / qualified leads** are the end. Every page that ranks must be built to convert (see §6). A #3 ranking that converts 4% beats a #1 that converts 0.5%.

**Success = ** organic traffic on money keywords → service-page visits → contact-form submissions / calls booked.

---

## 1. Target keyword portfolio (the 20+ we will rank)

Tiered by intent. **BOFU** (bottom-of-funnel) keywords convert and are priority #1; **MOFU/TOFU** feed the funnel via the blog and build topical authority. Difficulty is relative — we win the long-tail and commercial modifiers first, then climb to the heads.

### Pillar 1 — AI Agents & Automation → `/services/ai-agents-automation`
| # | Keyword | Intent | Priority |
|---|---|---|---|
| 1 | ai agent development company | BOFU | P0 |
| 2 | ai agent development services | BOFU | P0 |
| 3 | build ai agents for business | BOFU | P1 |
| 4 | custom ai agent development | BOFU | P1 |
| 5 | langchain development company | BOFU | P1 |
| 6 | rag development services / rag pipeline company | BOFU | P2 |
| 7 | ai automation agency | BOFU | P2 |

### Pillar 2 — AI-Native Software / SaaS → `/services/ai-native-software-engineering`
| # | Keyword | Intent | Priority |
|---|---|---|---|
| 8 | custom software development company | BOFU | P0 |
| 9 | saas development company | BOFU | P0 |
| 10 | mvp development company | BOFU | P1 |
| 11 | hire ai developers | BOFU | P1 → `/hire-ai-developers` |
| 12 | ai software development company | BOFU | P1 |
| 13 | multi-tenant saas development | BOFU | P2 |

### Pillar 3 — SaaS SEO → `/services/saas-seo`
| # | Keyword | Intent | Priority |
|---|---|---|---|
| 14 | saas seo agency | BOFU | P0 |
| 15 | b2b saas seo services | BOFU | P0 |
| 16 | saas seo company | BOFU | P1 |
| 17 | programmatic seo agency | BOFU | P2 |

### India geo-modified → `/in/services/*` + `/ai-development-company-in-india`
| # | Keyword | Intent | Priority |
|---|---|---|---|
| 18 | ai development company in india | BOFU | P0 |
| 19 | ai agent development india | BOFU | P1 |
| 20 | custom software development company india | BOFU | P1 |
| 21 | saas development company india | BOFU | P2 |

### Brand & long-tail (fast wins, high convert)
| # | Keyword | Intent | Priority |
|---|---|---|---|
| 22 | brynex labs | Brand | P0 (must own) |
| 23 | how much does ai agent development cost | MOFU | P1 → blog |
| 24 | ai agents vs rpa vs zapier | MOFU | P2 → blog |
| 25+ | "...for startups", "...for B2B", "...with langgraph" long-tails | MOFU | ongoing |

> **Rank tracking:** load these into GSC (filter Performance by query) and/or Ahrefs/Semrush rank tracker. Review positions monthly; promote the ones sitting at #11–20 (page 2) with internal links + content refresh — that's the cheapest path to page 1.

---

## 2. On-page SEO (strategy)

> Concrete codebase tasks are itemized in [`ONPAGE-IMPLEMENTATION-BACKLOG.md`](./ONPAGE-IMPLEMENTATION-BACKLOG.md). This is the strategy layer.

**Already in place:** unique titles/meta (140–160), one H1/page, self-canonical + hreflang, Organization/Service/Breadcrumb/FAQ/BlogPosting JSON-LD, dynamic OG images, SSG/ISR rendering, clean internal link to `/services`, descriptive URLs.

**On-page principles to enforce on every money page:**
1. **Keyword-led H1** + the primary keyword in the first 100 words and the title.
2. **Search-intent match** — a "company/agency" query wants: what you do, proof, pricing signal, process, FAQs, CTA. Our service pages already follow this; keep it.
3. **Semantic depth** — cover sub-topics and question phrasings as H2/H3 (feeds featured snippets + AI answers).
4. **FAQ schema** on every service page targeting "People Also Ask".
5. **Internal links** — every blog post links to its pillar service page (exact + partial anchors); service pages link to 2–3 supporting posts; add visible breadcrumbs.
6. **Freshness** — show/refresh dates; re-publish top posts every ~6 months.
7. **Media** — descriptive alt text; compressed images; lazy-load below the fold.

---

## 3. Content engine (topical authority → rankings)

**Model:** pillar (service page) + cluster (blog posts) → each cluster post links up to its pillar, building topical authority that lifts the money page.

**Cadence:** **2–4 posts/month.** Quality over volume; each post ≥ 1,500 words, answers the query directly, includes one original asset (framework, data, checklist, code).

**Brief template (use for every post):**
- Primary keyword + 2–3 secondary; search intent in one line.
- The direct answer (for snippet/AI extraction) in the first paragraph.
- H2 outline mapped to "People Also Ask".
- Internal links: 1 to pillar service page, 1–2 to sibling posts.
- One linkable element (original data/diagram/checklist).
- CTA block → contact / relevant service.

**First 12 posts (from existing clusters + gaps):** cost guides, "X vs Y" comparisons, readiness checklists, implementation playbooks, "best/top" listicles where we can be included, and buyer-stage guides per pillar. (See `../seo/KEYWORD-STRATEGY.md` cluster lists.)

---

## 4. Off-page SEO (authority — the #1 ranking lever now)

Detailed tactics + the prioritized source list live in [`SEO-MASTER-PLAN.md` §3](./SEO-MASTER-PLAN.md) and [`../seo/OFF-PAGE-SEO-PLAYBOOK.md`](../seo/OFF-PAGE-SEO-PLAYBOOK.md). Summary of the program:

- **Tier 1 — Foundations:** GBP, Bing Places, LinkedIn, Crunchbase, GitHub org, Product Hunt.
- **Tier 2 — B2B directories (links + leads):** Clutch, GoodFirms, The Manifest, DesignRush, TechBehemoths, Sortlist, UpCity. **Reviews drive ranking within these — get 5+.**
- **Tier 3 — AI-niche:** There's An AI For That, Futurepedia, vendor ecosystem/"built-with" pages (LangChain, Pinecone, Qdrant).
- **Tier 4 — Community/distribution:** Dev.to, Hashnode, Medium (canonical back), Reddit, HN, Quora, Stack Overflow, YouTube.
- **Tier 5 — Digital PR (highest impact):** HARO/Connectively, guest posts (2/mo), podcasts, original-research linkable assets.
- **Tier 6 — India local:** Justdial, Sulekha, IndiaMART, Startup India/MSME.

**Link velocity:** a handful of quality links/week, paced naturally. **Anchor mix:** ~50% branded, ~30% generic, ~20% partial/exact.

### Outreach templates

**Guest-post pitch:**
> Subject: Guest post idea for {site}: {specific title}
> Hi {name} — I'm {you} at Brynex Labs (we build production AI agents). I noticed your piece on {topic}. I'd like to contribute an original, non-promotional piece: "{title}" — covering {3 bullets}. I'll include {data/example} you won't find elsewhere. Happy to send a draft outline. Cheers.

**HARO/Connectively answer:**
> {2–3 sentence direct, quotable expert answer with a specific number/example}. — {Name}, {Title}, Brynex Labs ({url}). {1 line on why you're credible}.

**Review request (to happy clients):**
> Hi {client} — we're building our profile on Clutch. A 2-minute review of working with us would mean a lot. Here's the link: {clutch url}. Thank you!

---

## 5. GEO / AI-search optimization (ChatGPT, Perplexity, Gemini, AI Overviews)

AI engines are a growing discovery channel; we want to be **cited**.
- **Access:** AI crawlers allowed in robots (done); content server-rendered (done); IndexNow pushes new content to Bing fast → faster ChatGPT/Copilot pickup (done).
- **Format for extraction:** answer-first paragraphs, clear H2 questions, definition + comparison tables, explicit numbers. AI models lift these verbatim.
- **Entity trust:** consistent NAP + schema so engines confidently attribute facts to Brynex; presence on sources LLMs trust (Reddit, GitHub, Wikipedia-adjacent directories, industry press).
- **Be listable:** target "best AI agent development companies" listicles — AI answers frequently synthesize these.
- **Measure:** watch for referral traffic from chatgpt.com, perplexity.ai, gemini; track branded-search lift (a proxy for AI mentions).

---

## 6. Conversion (rankings → leads) — the part most SEO plans skip

Traffic that doesn't convert is vanity. Every money page must be engineered to convert:
1. **Clear primary CTA above the fold** ("Book a free consultation / discovery call") + repeated mid-page and end.
2. **Trust signals near CTAs:** client logos, Clutch rating, testimonials, "100% IP ownership," "senior engineers," timezone/response-time promise.
3. **Pricing signal** — our pages already show starting prices; this pre-qualifies leads and increases form quality.
4. **Low-friction contact** — short form (name, email, message), fast response promise; offer a calendar/booking option.
5. **Lead magnets** for MOFU traffic that isn't ready to buy: downloadable checklist, ROI calculator, "AI readiness assessment" → capture email → nurture.
6. **Conversion tracking** (see §7) so we optimize for leads, not just clicks.
7. **CRO loop:** monitor page-level conversion in GA4; A/B test CTA copy/placement on the highest-traffic page first.

---

## 7. Measurement & tracking setup

**Stack:** Google Search Console, Bing Webmaster Tools, GA4, Vercel Speed Insights. Optional: Ahrefs/Semrush (rank + backlinks), Microsoft Clarity (already integrated) for session heatmaps.

**Tracking to configure:**
- GA4 **conversion events**: `generate_lead` on contact-form submit, `book_call` on calendar action, lead-magnet downloads. (Hooks already exist — see `trackConversion_*` in `src/lib/tracking.ts`.)
- GSC: track the §1 keyword portfolio; watch Pages report for index coverage; submit/monitor sitemap.
- Monthly backlink delta (referring domains) and disavow obvious spam.

**KPI targets**
| Metric | 30 days | 90 days | 6 months |
|---|---|---|---|
| Pages indexed | 25+/32 | 32/32 | all + new content |
| Keywords in top 20 | 2–4 | 6–10 | 15–20+ |
| Keywords in top 10 | 0–1 | 3–5 | 10+ |
| Referring domains | 10–15 | 30–50 | 80–120 |
| Organic leads/mo | first | 3–8 | 15–30+ |
| Core Web Vitals | all Good | maintain | maintain |

---

## 8. Local SEO (USA + India)
- **Google Business Profile** + **Bing Places** with accurate category, service areas (US + India), and the standard description.
- City/region pages only if we can make them genuinely useful (avoid thin doorway pages).
- India: `/in/*` pages are already hreflang-paired and INR-priced; reinforce with Indian directories + GST/MSME listings.
- Consistent NAP everywhere (see master-plan §5 bios).

---

## 9. 6-month roadmap (milestones)

**Month 1 — Foundation & indexing:** Tier-1 profiles; Clutch/GoodFirms + review requests; GSC/Bing indexing requests; on-page backlog P0 items; 2 posts. → *Most pages indexed; brand term owned.*

**Month 2 — Authority + content:** guest posts (2); first linkable asset; HARO answers; AI directories; on-page P1 items; 3 posts; configure GA4 conversion events + CRO baseline. → *First page-2 rankings; first organic leads.*

**Month 3 — Momentum:** scale links (digital PR); internal-link push to page-2 keywords; refresh early posts; 3 posts; first CRO A/B test. → *Several top-20 keywords; lead flow building.*

**Months 4–6 — Scale & convert:** double down on traction pillar; programmatic/listicle inclusion; partnerships/ecosystem links; continuous content + refresh; optimize conversion paths. → *10+ top-10 keywords, 15–30 organic leads/mo.*

---

## 10. Guardrails
- No PBNs / paid link farms / exact-match anchor spam / link bursts.
- No thin or AI-spun pages at scale; every page earns its place.
- Edit content only via the super-admin (fires revalidation + IndexNow); never raw-DB.
- Never reintroduce a www↔apex canonical mismatch.
- Don't chase volume over relevance — one AI/dev link > 50 generic ones.

---

*Last updated: 2026-06-16. Living document — review KPIs monthly, re-prioritize keywords quarterly.*
