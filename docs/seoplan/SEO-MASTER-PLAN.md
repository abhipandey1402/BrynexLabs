# Brynex Labs — SEO Master Plan

> Owner: Growth/Founder · Canonical host: `https://brynex.in` (apex) · Markets: USA (primary), India (secondary, `/in/*`)
> Companion docs: [`../seo/KEYWORD-STRATEGY.md`](../seo/KEYWORD-STRATEGY.md) · [`../seo/OFF-PAGE-SEO-PLAYBOOK.md`](../seo/OFF-PAGE-SEO-PLAYBOOK.md)

This is the single source of truth that sequences everything: what's already shipped, what to do next, and how to measure it. Written from an SEO-lead POV for a young, technically-sound domain whose remaining gap is **authority + time**, not technical hygiene.

---

## 0. Where we are today (baseline)

**Technical SEO — DONE (verified live):**
- ✅ **Host canonicalization fixed.** Apex `brynex.in` serves directly (200); `www` → `308` → apex. All canonicals, sitemap, OG, robots, and JSON-LD use the apex — served host now matches declared host (was the #1 indexing blocker).
- ✅ **Sitemap** at `/sitemap.xml` (dynamic) — 32 URLs incl. services, India variants, case studies, blog. Submitted to Google Search Console + Bing.
- ✅ **robots.txt** allows all crawlers (incl. AI crawlers: GPTBot, ClaudeBot, PerplexityBot, etc.); only `/api`, `/admin`, `/super-admin`, `/private` disallowed. `admin.` subdomain is `noindex` (correct).
- ✅ **Meta descriptions** — all trimmed to 140–160 chars (was 17 over-length; cleared Bing's flag + Google truncation).
- ✅ **Internal linking** — homepage now has an always-rendered “View all services” link to `/services` (was only in a hover menu invisible to crawlers).
- ✅ **Structured data** — Organization/ProfessionalService, Service, BreadcrumbList, FAQPage JSON-LD across pages.
- ✅ **hreflang** — en-US / en-IN pairs for service pages.
- ✅ **Rendering** — all public pages SSG/ISR (server-rendered HTML, not client-fetched); content visible to crawlers. CMS edits revalidate on-demand.
- ✅ **Speed Insights** (Vercel) live for Core Web Vitals monitoring.
- ✅ **IndexNow** — key file hosted + auto-ping on every blog/service edit (instant Bing/Yandex re-crawl). First batch of 32 URLs submitted (HTTP 200).

**The remaining levers:** off-page authority (backlinks), content depth/freshness, and crawl/index maturation time. This plan attacks those.

**Realistic timeline:** homepage + key pages index within days; full sitemap coverage in 1–3 weeks; meaningful rankings for competitive money terms in 3–6 months with consistent execution.

---

## 1. Strategic positioning (the SEO thesis)

Brynex sells three pillars; SEO must win all three independently while reinforcing one brand entity:

| Pillar | Primary money intent | Target page |
|---|---|---|
| AI Agents & Automation | "AI agent development company", "build AI agents" | `/services/ai-agents-automation` |
| AI-Native Software / SaaS | "custom software development company", "SaaS development" | `/services/ai-native-software-engineering` |
| SaaS SEO | "SaaS SEO agency", "B2B SaaS SEO services" | `/services/saas-seo` |

Differentiators to weave into copy, titles, and outreach: **senior-only engineers, production-first (evals/guardrails), 40–60% below US agency rates, USA + India delivery, 100% IP ownership.** Full keyword map lives in [`KEYWORD-STRATEGY.md`](../seo/KEYWORD-STRATEGY.md).

---

## 2. On-page & content engine

### 2.1 Conventions (already applied — keep enforcing)
- **Title:** `Primary Keyword | Brynex Labs`, ≤ 60 chars.
- **Meta description:** 140–160 chars, includes primary keyword + a differentiator + light CTA.
- **One `<h1>` per page**, keyword-led; `<h2>`/`<h3>` cover semantic sub-topics & question phrasings.
- **Canonical** self-referencing (apex); India variants hreflang-paired.
- **Internal links:** every blog post links to its pillar service page; service pages cross-link related posts.

### 2.2 Content cadence (the compounding asset)
- **2 substantive posts / month** minimum (1,500–2,500 words, genuinely useful, BOFU/MOFU-leaning). Topics from the cluster lists in the keyword doc.
- Each post: targets one primary + 2–3 secondary keywords, answers the question directly in the first 100 words (for featured snippets + AI answers), includes one original element (data, framework, checklist, code) that earns links.
- **Refresh** top posts every ~6 months (update stats, re-date) — cheap ranking gains.
- **Programmatic opportunity (later):** templated comparison/location pages once authority supports it.

### 2.3 Quick on-page wins to schedule
- Add FAQ blocks (FAQPage schema) to each service page targeting "people also ask" queries.
- Ensure every image has descriptive `alt` text (accessibility + image search).
- Add a few contextual internal links from high-traffic pages → money pages with varied anchor text.

---

## 3. Off-page / backlink plan (the core growth lever)

Goal: **acquire relevant, authoritative links at a natural pace** (a few quality links/week). Relevance (AI/dev/SaaS) and authority beat volume. Detailed tactics in [`OFF-PAGE-SEO-PLAYBOOK.md`](../seo/OFF-PAGE-SEO-PLAYBOOK.md); this is the prioritized source list + cadence.

### Tier 1 — Foundational profiles & citations (Week 1, free, ~2–3 hrs)
Establish the brand entity with **identical NAP** (see §5 for copy).

| Source | Notes |
|---|---|
| Google Business Profile | Entity + Maps + knowledge panel. |
| Bing Places | Powers Bing/Copilot/ChatGPT-search. |
| LinkedIn Company Page | High DA; website in About + Featured. |
| Crunchbase | Trusted company-entity source. |
| GitHub Organization | Ideal for a dev shop; website on org profile (dofollow). |
| Product Hunt | Launch site/tool; referral + branded-search spike. |

### Tier 2 — B2B agency directories (Weeks 1–3; links **and** leads)
Free listings; review count drives ranking *within* them.
- **Clutch.co** (top priority) · **GoodFirms** · **The Manifest** · **DesignRush** · **TechBehemoths** · **Techreviewer** · **SoftwareWorld** · **Sortlist** · **UpCity** (US).
- **Action:** request 3–5 client reviews on Clutch + GoodFirms in week 1 — reviews are the lead/ranking multiplier here.

### Tier 3 — AI-niche directories (Weeks 2–4; topical relevance)
- **There's An AI For That** · **Futurepedia** · **TopAI.tools** · **Toolify** · **AICyclopedia**.
- **Vendor ecosystem pages** (highest relevance): LangChain/LangGraph community showcases, vector-DB (Pinecone/Qdrant/Weaviate) partner or "built with" lists, OpenAI/Anthropic showcase where eligible.

### Tier 4 — Community & content distribution (ongoing)
- **Dev.to / Hashnode / Medium** — cross-post best posts with canonical → brynex.in.
- **Hacker News, Reddit** (r/SaaS, r/artificial, r/devops) — share genuinely useful content (referral + branded search even when nofollow).
- **Stack Overflow / Stack Exchange / Quora** — profile + authentic answers in-domain.
- **YouTube** — short demos/walkthroughs; description links.

### Tier 5 — Digital PR & guest posting (Months 2–3; highest ranking impact)
- **Connectively (HARO) / Featured.com / Qwoted** — answer journalist queries on AI/software → links on real news/industry sites.
- **Guest posts** (2/month) on AI/SaaS/dev blogs — search `"write for us" AI`, `"guest post" SaaS development`.
- **Podcasts** — guest spots; show-note links + E-E-A-T.
- **Linkable assets (10x play):** publish original research/benchmarks (e.g., "Cost of AI agents in 2026", "AI-agent reliability benchmark"). These earn passive links far better than generic posts.

### Tier 6 — India-market authority (for `/in/*` + local trust)
- **Justdial · Sulekha · IndiaMART · Clutch India.**
- **Startup India / MSME** registration listing (if registered).
- Regional startup/tech directories.

### Anchor-text & link-target policy
- ~50% branded ("Brynex Labs", "brynex.in"), ~30% generic ("this AI agency", "their guide"), ~20% partial/exact ("AI agent development company") — never over-optimize one exact phrase.
- Most links → homepage; distribute the rest to `/services`, the 3 service pages, and top blog posts.

---

## 4. Generative Engine Optimization (GEO / AI search)

ChatGPT/Copilot (Bing index), Perplexity, Gemini, and Google AI Overviews increasingly drive discovery. To get **cited**:
- Keep AI crawlers allowed (done) and content server-rendered (done).
- Write **answer-first** content: lead with a direct, quotable answer; use clear H2 questions; include comparison tables, definitions, and stats AI engines like to extract.
- Maintain strong **entity consistency** (NAP + schema) so engines confidently attribute facts to Brynex.
- Earn mentions on sources these models trust (Bing-indexed industry sites, Wikipedia-adjacent directories, GitHub, Reddit).
- IndexNow (done) gets new content into Bing fast → faster ChatGPT/Copilot visibility.

---

## 5. Brand entity & NAP consistency (paste-identical everywhere)

**Name:** Brynex Labs
**URL:** https://brynex.in
**Email:** hello@brynex.in
**Category:** Software / AI development company

**Bio — 50 chars:**
`AI agents, custom software & SaaS SEO. USA & India.`

**Bio — 150 chars:**
`Brynex Labs builds AI agents, intelligent automation, custom software & revenue-driving SaaS SEO for startups and enterprises across the USA & India.`

**Bio — 300 chars:**
`Brynex Labs is a senior-led software company building production-grade AI agents, intelligent automation, custom software, and SaaS platforms — plus revenue-focused SaaS SEO. We serve startups and enterprises across the USA and India with 100% code & IP ownership, at 40–60% below US agency rates.`

> Use the **same** name, URL, and a bio of the appropriate length on every profile. Inconsistency dilutes the entity signal.

---

## 6. Measurement & KPIs

**Tools:** Google Search Console, Bing Webmaster Tools, Vercel Speed Insights, GA4. (Optional: Ahrefs/Semrush for backlink + rank tracking.)

| Metric | Source | 30-day target | 90-day target |
|---|---|---|---|
| Pages indexed | GSC Pages | 25+/32 | 32/32 |
| Impressions | GSC Performance | first impressions | steady growth |
| Avg. position (money terms) | GSC / rank tracker | tracked | top 30 → climbing |
| Referring domains | Ahrefs/GSC Links | 10–15 | 30–50 |
| Core Web Vitals | Speed Insights | all "Good" | maintain |
| Organic leads (form fills) | GA4 + CRM | baseline | first organic leads |

**Operating rhythm:**
- **Weekly (30 min):** GSC Performance + Pages report; request indexing for new/updated pages; check Speed Insights; ship/queue content.
- **Monthly:** backlink audit (new referring domains, disavow spam if any), competitor gap check, refresh one old post, KPI review.
- **Quarterly:** content-cluster expansion, one linkable asset, one open-source repo.

---

## 7. 90-day phased roadmap

**Phase 1 — Foundation (Weeks 1–4):**
Claim Tier 1 profiles → list on Tier 2 directories + start review requests → submit Tier 3 AI directories → confirm GSC/Bing indexing, request indexing on all key pages → publish 2 posts.

**Phase 2 — Authority (Months 2–3):**
2 guest posts/month → first linkable asset (data/benchmark) → HARO/Connectively answers (3–5/week) → 1–2 podcasts → continue 2 posts/month → cross-post to Dev.to/Medium.

**Phase 3 — Scale & GEO (Months 3–6+):**
Scale content clusters → link reclamation + competitor-gap outreach (monthly) → India local authority push → 1 open-source repo/quarter → optimize for AI-answer citations → double down on whatever pillar shows traction.

---

## 8. Guardrails — what NOT to do
- ❌ No PBNs, paid link farms, "1000 backlinks for $5", or link-exchange schemes (penalty risk).
- ❌ No exact-match anchor spam.
- ❌ No sudden link bursts — pace it naturally.
- ❌ No thin/duplicate/AI-spun pages at scale.
- ❌ Don't edit content directly in the DB (bypasses revalidation/IndexNow) — always edit via the super-admin so re-crawl fires.
- ❌ Don't change the canonical host or reintroduce a www↔apex mismatch.

---

## 9. Immediate next 7 days (checklist)
1. [ ] Google Business Profile + Bing Places
2. [ ] LinkedIn company page + Crunchbase + GitHub org (use §5 bios)
3. [ ] List on Clutch + GoodFirms; request 3 client reviews
4. [ ] Submit to There's An AI For That + Futurepedia
5. [ ] GSC: confirm sitemap success; Request Indexing for homepage, /services, 3 service pages, top 5 posts
6. [ ] Bing: confirm IndexNow submissions appear; submit URL list
7. [ ] Cross-post top blog article to Dev.to/Medium (canonical → brynex.in)
8. [ ] Publish 1 new BOFU post from the keyword cluster

---

*Last updated: 2026-06-16. This plan complements the keyword strategy and off-page playbook in `docs/seo/`. Update KPIs monthly.*
