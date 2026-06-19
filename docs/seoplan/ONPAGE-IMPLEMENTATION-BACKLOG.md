# Brynex Labs — On-Page SEO Implementation Backlog

> Concrete, codebase-specific engineering tasks to maximize on-page/technical SEO. Prioritized by impact/effort. Items reflect a scan of the current code — **what's already done is listed first so we don't redo it.**
>
> Related: [`COMPLETE-SEO-PLAYBOOK.md`](./COMPLETE-SEO-PLAYBOOK.md) · [`SEO-MASTER-PLAN.md`](./SEO-MASTER-PLAN.md)

---

## ✅ Already implemented (verified — do not redo)
- Apex canonicalization (`www` → 308 → `brynex.in`); all URLs apex-consistent.
- Dynamic `sitemap.xml` (services, India variants, case studies, blog) + `robots.ts` allowing AI crawlers, blocking private/admin.
- Self-referencing canonicals + **hreflang** (en-US/en-IN) on service pages.
- JSON-LD: Organization/ProfessionalService (home), Service + BreadcrumbList + FAQPage (service pages), **BlogPosting** (blog).
- Dynamic **OG images** (`app/opengraph-image.tsx`, `app/icon.tsx`, `blog/[slug]/opengraph-image.tsx`).
- Meta titles + descriptions (descriptions normalized to 140–160).
- SSG/ISR rendering (crawlable HTML) + on-demand revalidation.
- Homepage → `/services` crawlable internal link.
- Vercel Speed Insights (CWV) + Microsoft Clarity.
- IndexNow auto-ping on blog/service edits.

---

## P0 — High impact, low effort (do first)

### 1. Custom 404 page (`src/app/not-found.tsx`)
**Gap:** no custom not-found page. **Why:** avoids unhelpful dead-ends, keeps crawl equity, improves UX. **Do:** branded 404 with search + links to home, services, blog, contact.

### 2. Enrich `BlogPosting` schema (`src/app/(site)/blog/[slug]/page.tsx`)
**Gap:** schema lacks `image`, `dateModified`, `mainEntityOfPage`; `author` is `Organization`. **Do:**
- Add `image` (the post's OG image URL), `dateModified` (track `updatedAt`), `mainEntityOfPage` (the canonical URL).
- Move toward `author` as `Person` with a `url`/`sameAs` (LinkedIn) for E-E-A-T (see #6).
- Add `publisher` (Organization + logo).

### 3. Visible breadcrumbs on service + blog pages
**Gap:** BreadcrumbList JSON-LD exists but there's no **visible** breadcrumb UI on public pages. **Why:** UX + reinforces site structure + eligible for breadcrumb rich results. **Do:** a small `Breadcrumbs` component (Home › Services › {page}) rendered on service and blog templates; keep JSON-LD in sync.

### 4. Related-posts / "Read next" internal links on blog posts
**Gap:** blog post template has no related-content links. **Why:** internal linking distributes authority + lowers bounce. **Do:** render 2–3 related posts (same category/tags) + the post's related service(s) at the article end. (`relatedServices`/`techTags` already exist in the data model.)

### 5. Contextual internal links from posts → money pages
**Do:** in high-traffic posts, add in-body contextual links to the relevant service page using varied anchor text (editorially, or via a small "mention → link" helper). Biggest lever for pushing page-2 keywords to page 1.

---

## P1 — High impact, medium effort

### 6. E-E-A-T / author signals
**Gap:** no author bio/Person entity. **Do:**
- Author `Person` schema with bio, photo, and `sameAs` (LinkedIn/GitHub).
- A lightweight author byline/bio block on posts; optionally `/about` team detail with named senior engineers.
- Strengthens trust signals Google + AI engines weigh heavily for YMYL-adjacent B2B content.

### 7. FAQ schema coverage audit
**Do:** ensure every service page + key blog posts expose `FAQPage` JSON-LD for their on-page FAQs (targets "People Also Ask" + AI answers). Service pages have FAQs; confirm schema emitted for all and add to top blog posts.

### 8. Sitemap `lastmod` accuracy
**Gap:** static routes use `new Date()` (always "now"). **Do:** use real last-modified dates (e.g., a constant map or content timestamps) so crawlers trust change signals. Blog already uses `publishedAt` — extend to services (use DB `updatedAt` when a CMS copy exists).

### 9. Image optimization audit
**Do:** ensure all `<img>`/`next/image` usages have descriptive `alt`, correct `width/height` (CLS), and lazy-loading below the fold. Add alt text to any decorative-but-meaningful imagery.

### 10. Internal "hub" linking for India pages
**Do:** ensure `/in/services/*` and `/ai-development-company-in-india` are internally linked (footer/nav/related) so they're crawl-reachable beyond the sitemap.

---

## P2 — Compounding / later

### 11. `Review` / `AggregateRating` schema
**When:** after collecting Clutch/Google reviews. **Do:** add `aggregateRating` to Organization + service pages (eligible for star rich results — big CTR lift). Use only real, verifiable reviews.

### 12. Lead-magnet + conversion instrumentation
**Do:** add a gated asset (AI-readiness checklist / ROI calculator) capturing email; wire GA4 `generate_lead`/download events (extend `src/lib/tracking.ts`). Supports the CRO goals in the playbook.

### 13. Programmatic / listicle-ready templates
**When:** authority supports it. **Do:** templated comparison or use-case pages (avoid thin doorway pages — each must be genuinely useful).

### 14. Performance hardening (as CWV data arrives)
**Do:** act on Speed Insights — preconnect/font-display (font uses `swap` already), trim unused JS, ensure LCP image priority on hero, keep First Load JS lean (currently ~87 kB — good).

### 15. Breadcrumb + Service schema for India variants
**Do:** confirm `/in/services/*` emit Service + Breadcrumb + Offer (INR) schema (Offer already present); keep parity with global pages.

---

## Suggested sequencing
1. **Sprint 1 (P0):** 404 page, BlogPosting schema enrichment, breadcrumbs, related-posts, contextual internal links. *(Mostly template-level; high SEO return.)*
2. **Sprint 2 (P1):** author/E-E-A-T, FAQ schema audit, sitemap lastmod, image/alt audit, India internal linking.
3. **Ongoing (P2):** review schema (post-reviews), lead magnet + conversion events, performance, programmatic templates.

Each item is independent and shippable on its own small PR. None require data migrations.

---

*Last updated: 2026-06-16.*
