# Brynex Labs — Off-Page SEO Playbook

> The implementation guide for everything that happens **off** brynex.in: authority building,
> backlinks, directories, digital PR, and AI-search (GEO) visibility — for both the **USA** and
> **India** markets. Work through it top-to-bottom; Phase 1 items compound the longest.
> Companion doc: `KEYWORD-STRATEGY.md`. Last updated: June 2026.

---

## How to use this playbook

- Each task has a checkbox — track progress directly in this file via PRs.
- Cadence: **Phase 1 = weeks 1–4**, **Phase 2 = months 2–3**, **Phase 3 = months 3–6**, then ongoing.
- One owner per phase. Most tasks take < 2 hours; consistency beats intensity.
- Golden rule: **never buy bulk links, never use PBNs, never spin content.** One DR-60 editorial
  link from a relevant tech publication outranks 100 directory spam links and carries zero penalty risk.

---

## Phase 1 — Foundation (Weeks 1–4): claim every free authority signal

### 1.1 Google & Bing essentials
- [ ] **Google Business Profile** (critical for "AI development company in India" map-pack):
      create for the India registered address, category "Software Company", services list matching
      the 3 service pages, weekly posts, photos of team/workspace. Link to https://brynex.in.
- [ ] **Bing Places** + **Bing Webmaster Tools** (Bing powers ChatGPT browsing — this is a GEO play, not just Bing SEO).
- [ ] Verify GSC property is on the **domain level** (covers www + subdomains).

### 1.2 B2B service directories (highest-converting backlinks in this industry)
These rank on page 1 for almost every "best AI development company" query — being listed
**is** ranking. Complete profiles with case studies, exact service names, and pricing bands.

| Directory | Priority | Notes |
|---|---|---|
| [ ] Clutch.co | P0 | The single highest-ROI listing. Get 3–5 verified client reviews (Echopad, CloudScale). Target "AI Development — India" + "Custom Software — India" categories. |
| [ ] GoodFirms | P0 | Free listing, strong for India dev companies. |
| [ ] DesignRush | P1 | Free, accepts agency profiles, gives a followed link. |
| [ ] G2 (Services) | P1 | US buyer audience. |
| [ ] Wellfound (AngelList) | P1 | Startup-buyer audience + careers page synergy. |
| [ ] TechBehemoths | P2 | Free, EU/US traffic. |
| [ ] F6S, Crunchbase | P2 | Crunchbase profile also feeds AI/LLM knowledge graphs. |
| [ ] Upwork/Toptal agency profile | P2 | Optional lead channel; links are nofollow but profile ranks. |

### 1.3 Social & entity consistency (knowledge-graph hygiene)
Google and LLMs cross-reference entities. Identical NAP (name, description, services) everywhere:
- [ ] LinkedIn company page: keyword-rich tagline ("AI Agent Development & Custom Software Company"), services section filled, weekly posting.
- [ ] X/Twitter bio aligned; pin a case-study thread.
- [ ] GitHub org (brynexlabs): pin 2–3 real OSS repos (see §3.4) — engineers and LLMs both read GitHub.
- [ ] YouTube channel (even 3–4 videos: case study walkthroughs, "how we build agents") — video results rank for "AI agent development" queries.
- [ ] Add the same canonical company description (50 words) to every profile. Keep a copy in this repo: `docs/seo/boilerplate.md`.

### 1.4 Review generation engine
- [ ] Email the 25+ past clients; ask the 5 happiest for Clutch + Google reviews (offer a 15-min call to make it easy).
- [ ] Add a post-project step in the delivery process: "request review" (bake into how-we-work checklist).
- [ ] Display review badges on the site once ≥ 5 reviews exist (social proof → conversion lift).

---

## Phase 2 — Authority content & digital PR (Months 2–3)

### 2.1 Guest posting (quality over volume; 2/month)
Targets where Brynex's expertise is genuinely useful (pitch the **engineer's** byline, not "marketing"):
- Dev-audience: dev.to, Hashnode, freeCodeCamp News, The New Stack, InfoQ (editorial), DZone.
- Business-audience: HackerNoon, TechBullion, YourStory & Inc42 (India), SaaStr community posts.
- Pitch angles that get accepted: real production numbers ("what running 40 AI agents in prod taught us"),
  cost teardowns, postmortems, architecture deep-dives. Never "5 benefits of AI".
- Every post: 1 contextual link to a money page + author bio link to homepage.

### 2.2 Digital PR / data-led linkable assets (the 10x play)
Create one **original-data asset per quarter** on brynex.in, then pitch it:
- [ ] Q3 idea: "AI Agent Production Survey — what 50 companies actually pay to run agents" (survey clients + community; journalists link to original data).
- [ ] Q4 idea: "US vs India AI development rate card 2026" (update annually; evergreen citation magnet — this exact comparison is cited constantly with no authoritative source).
- Pitch via Connectively (ex-HARO), Featured.com, Qwoted, SourceBottle + direct to journalists covering AI outsourcing (TechCrunch, VentureBeat, Economic Times Tech, Mint).
- [ ] Respond to 3 journalist requests/week (15 min/day). Founder quotes land DR 70–90 links.

### 2.3 Podcast & community circuit (E-E-A-T + branded search)
- [ ] Founder pitches 2 podcasts/month: AI engineering pods, SaaS growth pods, India startup pods. Show-notes links are real backlinks; the bigger win is branded-search volume (a ranking factor and an AI-training signal).
- [ ] Answer 2 questions/week on relevant subreddits (r/SaaS, r/artificial, r/ExperiencedDevs), Indie Hackers, and relevant Slack/Discord communities. No link-dropping — name recognition; LLMs train on Reddit.
- [ ] Quora: claim topic authority on "AI agent development cost", "offshore development India" questions (Quora pages rank AND get cited by AI engines).

### 2.4 Strategic partnerships & ecosystem links
- [ ] Apply to partner directories of the tools already in the stack: **LangChain partner/experts list, Vercel agency partners, MongoDB partners, AWS Partner Network (Select tier), Pinecone/Qdrant partner pages.** These are DR-80+ followed links that also generate referral leads.
- [ ] Co-marketing with non-competing agencies (design studios, fractional CTO networks): mutual case studies, not link swaps.

---

## Phase 3 — Scale & GEO/AI-search dominance (Months 3–6, then ongoing)

### 3.1 Generative Engine Optimization (GEO)
AI answers (Google AI Overviews, ChatGPT, Perplexity, Gemini) now front-run classic rankings;
AI-referred visitors convert ~5x better. Off-page levers:
- [ ] Get listed in "best AI agent development companies" roundup posts — find every article ranking for that query (US + India variants) and pitch inclusion with case-study proof. These roundups are the #1 source LLMs cite for vendor recommendations.
- [ ] Wikipedia-adjacent presence: Wikidata entity for Brynex Labs (needs 2–3 independent press mentions first — Phase 2 PR feeds this).
- [ ] Keep Crunchbase, LinkedIn, Clutch descriptions verbatim-consistent (LLMs reconcile entities by string overlap).
- [ ] Monitor AI citations monthly: ask ChatGPT/Perplexity/Gemini "best AI agent development companies in India / for US startups" and log whether Brynex appears (tracking sheet: `docs/seo/geo-citation-log.md`).

### 3.2 Link reclamation & competitor gap (monthly, 1 hr)
- [ ] Ahrefs alert for unlinked "Brynex" mentions → request the link.
- [ ] Quarterly competitor backlink-gap run (vs 3 ranking competitors per pillar from KEYWORD-STRATEGY.md) → replicate their wins (directories, guest posts, roundups they're in and we're not).
- [ ] Broken-link building in AI/SaaS engineering content (find 404'd resources ranking pages link to; offer our guide as the replacement).

### 3.3 India-specific local authority
- [ ] NASSCOM membership (directory link + credibility badge that closes Indian enterprise deals).
- [ ] India press: YourStory, Inc42, Analytics India Magazine company profiles & founder bylines.
- [ ] Local citations: JustDial, Sulekha, IndiaMART (B2B searchers actually use these), TiE chapter membership.
- [ ] Startup-ecosystem listings: Startup India registration (DPIIT) → .gov.in backlink.

### 3.4 Open source as link infrastructure (engineer-led, 1 repo/quarter)
- [ ] Release small, genuinely useful OSS: e.g. a LangGraph agent-eval starter, an MCP server, a Next.js SEO schema helper. README links to brynex.in.
- [ ] Submit to awesome-lists (awesome-langchain, awesome-llm, awesome-nextjs) — followed links from DR-80+ GitHub repos, plus direct developer-buyer visibility.
- [ ] Write the launch post on the blog + dev.to (each repo = content + links + leads).

---

## What NOT to do (penalty & waste avoidance)

- ❌ Fiverr/marketplace "high DA backlink" packages — guaranteed-toxic.
- ❌ Mass directory submission tools (200 directories = 195 spam signals).
- ❌ Reciprocal link-exchange schemes and "link farms" disguised as guest-post networks.
- ❌ Exact-match anchor text everywhere — keep anchors natural (brand name ~60%, URL ~20%, keyword ~20%).
- ❌ City landing pages for cities with no real presence.
- ❌ AI-generated guest posts submitted at scale — publishers detect it; reputation damage outlasts any link.

---

## KPIs & operating rhythm

| Metric | Tool | Baseline (set now) | 6-month target |
|---|---|---|---|
| Referring domains | Ahrefs/Semrush | TBD | +60–80 quality RDs |
| DR / Authority Score | Ahrefs | TBD | +10–15 |
| BOFU keywords in top 10 (US) | GSC/rank tracker | 0–2 | 6–8 |
| BOFU keywords in top 10 (IN) | GSC/rank tracker | 0–2 | 10+ |
| Branded searches/month | GSC | TBD | 3x |
| Clutch reviews | Clutch | 0 | 8+ |
| AI-engine citations (monthly check) | manual log | 0 | cited in 2+ engines for 3+ queries |
| Organic → lead conversions/month | GA4 + leads DB | TBD | 15–25 |

**Weekly (2–3 hrs):** 3 journalist-request responses, 2 community answers, 1 outreach batch (5 emails).
**Monthly:** 2 guest posts/bylines, 1 podcast pitch round, link-reclamation pass, GEO citation log.
**Quarterly:** 1 data asset, 1 OSS release, competitor gap analysis, this doc reviewed & updated.

---

## Immediate next 7 days (do these first)

1. Create Clutch + GoodFirms + Google Business Profile (≈3 hrs total) and request first 3 client reviews.
2. Set Ahrefs/Semrush baseline numbers into the KPI table above.
3. Align LinkedIn/X/Crunchbase descriptions with the new on-page positioning ("AI Agent Development & Custom Software Company").
4. Apply to LangChain experts & Vercel partners directories.
5. Sign up for Connectively/Featured/Qwoted and answer the first journalist request.
