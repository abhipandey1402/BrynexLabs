# Brynex Labs — SEO Audit Fix Implementation

Implementation log for the senior-SEO audit (snapshot 2026-07-15). Work done on branch
`seo/audit-fixes` and verified against a local production build (`next build` + `next start`).

## Decisions applied (from the site owner)

- **Pricing:** INR is the single source of truth. USD product prices were reconciled to the
  INR service-page prices. Genuinely separate dedicated-engineer (staff-aug) rates on
  `/hire-ai-developers` stay in USD, clearly labeled for international clients.
- **Testimonials:** anonymized honestly — role + client, **no invented names**.
- **Authors:** real, named people. Technical/AI/dev posts → **Abhi Pandey, Senior Software
  Engineer**; marketing/SEO posts → **Shashi Tiwari, Head of SEO**.
- **Stats:** reduced to realistic, defensible numbers.

## Reconciliation — audit vs. live code

The audit was a snapshot; several items had already been addressed or were never broken:

- IndexNow — already fully implemented (`src/lib/indexnow.ts` + key file in `/public`).
- Footer legal links — already correct (`/privacy`, `/terms`); the `-policy`/`-of-service`
  404s were not from the footer. Added defensive redirects anyway.
- Service-page pricing — already unified to INR with `priceCurrency:"INR"`.
- `prefers-reduced-motion` reveal fallback — already present.
- Service pages inherit the working root OG image, so they were never broken (only blog
  posts declared the 404ing image URL).

## Fixed & verified

| ID | Finding | Fix | Verification |
|----|---------|-----|--------------|
| C1 | Fabricated testimonials | Anonymized to role + client (`data/case-studies.ts`) | No `John Doe`/`Sarah Smith` in DOM |
| C2 | Self-contradicting pricing in schema | India-page FAQ + hire-page project price → INR; `$/hr` comparison reframed; invoicing copy clarified | No USD product prices; FAQ schema now INR |
| C3 | Nested `og:image` 404 | Replaced the `opengraph-image` **file convention** (served only at a hashed URL the hardcoded link couldn't match) with **plain route handlers** at stable paths `/blog/<slug>/og-image` and `/case-studies/<slug>/og-image` | Both return `200 image/png`; `og:image`, `twitter:image`, `BlogPosting.image`, `Article.image` all reference the served URL |
| H2 | No security headers | `next.config.mjs` `headers()` — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; HSTS upgraded to `includeSubDomains; preload`; `poweredByHeader:false` | Headers present; `x-powered-by` absent |
| H3 | Case-study `Article` schema thin | Added `image`, `datePublished`, `dateModified`, `BreadcrumbList` + per-case-study OG image | Rich Results-valid graph |
| H4 | No named authors | `data/authors.ts`, `Person` schema, real bylines, author bio cards, `/authors/<slug>` pages, named team on `/about` | Byline "Abhi Pandey"; `Person` schema; author pages 200 |
| H5 | AI-native title mismatch | Retitled to `Custom Software Development Company in India \| AI-Native` | Title matches URL/H1 intent |
| H6 | Scroll-reveal hides content for no-JS/headless | Content visible by default; hidden→reveal gated behind `html.js` + `prefers-reduced-motion:no-preference`; IO-unsupported fallback in `SectionWrapper` | Only `html.js`-gated `opacity:0` in built CSS |
| M1 | Hubs lack schema | `CollectionPage`+`ItemList` (`/services`), `AboutPage` (`/about`), `ContactPage` (`/contact`) | Valid JSON-LD on each |
| M2 | `/blog` uncached (dynamic) | Removed server-side `searchParams` read (client handles filtering) | `/blog` is `○ Static` in build |
| M3 | Contact DOM bloat | Dynamic-import the country/flag phone picker (`ssr:false`) | Picker code-split out of initial payload |
| M4 | India page schema incomplete | Added `WebPage` + `Service`; references canonical Org via `@id` | Valid `Service` node |
| M5 | Org schema depth | Added `contactPoint`, `foundingDate`, dedicated `/logo` (not the favicon); `BlogPosting` author now `Person` | `ContactPoint` + logo `ImageObject` present |
| M9 | `llms-full.txt` missing | Added `/llms-full.txt`; linked from `llms.txt` | 200 `text/plain` |
| Low | Broken legal URLs | 301 `/privacy-policy`→`/privacy`, `/terms-of-service`→`/terms` | 308 redirects confirmed |
| Low | Sitemap `lastmod` / coverage | Case-study dates from content; author pages added | Present in `sitemap.xml` |

### Note on CSP
The Content-Security-Policy allows `'unsafe-inline'`/`'unsafe-eval'` for scripts because
Next.js hydration, next-themes, and inline JSON-LD require it. It still locks down
`object-src`, `base-uri`, `form-action`, and `frame-ancestors`. A nonce-based strict CSP
(via middleware) is the recommended next hardening step.

---

## Off-page & content — owner action required (cannot be fixed in code)

These are the true ranking levers the audit identified. They need real-world action:

1. **H1 — External authority (highest lever, slowest to compound).** Claim & complete
   **Clutch, GoodFirms, DesignRush**; earn 3–5 verified client reviews; pursue founder
   presence and guest posts. Target: a branded search for "Brynex Labs" returns owned +
   directory results. When live profiles exist, add their URLs to `SITE_SOCIAL_PROFILES`
   in `src/lib/seo.ts` (feeds Organization `sameAs`) and to each author's `sameAs` in
   `src/data/authors.ts`.
2. **H3 (content) — Case-study depth.** Expand both case studies to 800–1,200 words with
   real, quantified before/after and real screenshots/diagrams; publish more to substantiate
   the "projects delivered" claim. (Schema + OG images are already wired.)
3. **M6 — Blog cadence.** Resume a regular publishing schedule; genuinely refresh top posts
   (and bump `updatedAt`) rather than leaving `dateModified == datePublished`.
4. **M7 — Real imagery.** Add product screenshots, architecture diagrams, and (optional) team
   photos with descriptive `alt`. Replace the "Visual Representation" placeholder on case
   studies with real visuals.
5. **M8 — Comparison/listicle asset.** Publish a genuinely useful "best AI dev companies" or
   "X vs Y" asset to compete for the directory/listicle SERP pocket. (A `seo-competitor-pages`
   skill exists to scaffold this.)
6. **Author profiles.** Provide LinkedIn (and other real profile) URLs for Abhi Pandey and
   Shashi Tiwari to populate `Person.sameAs` — a strong E-E-A-T/entity signal.

## Suggested verification once deployed
- Google Rich Results Test on a service page, blog post, case study, and `/about`.
- LinkedIn Post Inspector / X Card Validator on a blog post URL (og:image now renders).
- securityheaders.com → expect grade A.
- Connect Google Search Console + PageSpeed/CrUX for field data (CWV was lab/heuristic in the audit).
