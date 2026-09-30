import { STUDIO_FACTS_TEXT } from '@/data/company';

export const dynamic = 'force-static';

const LLMS_FULL_TXT = `# Brynex Labs — Full Reference

> Brynex Labs (https://brynex.in) is an AI & SaaS product studio, founded 2023, headquartered in India and working globally. It has two halves: Products — software we own and operate, starting with Clinizy Care (https://clinizy.in), hospital management software for Indian clinics — and Studio, where the same senior team builds AI agents, intelligent automation, SaaS platforms and revenue-focused SEO for founders and companies in India, the USA, the UK and Australia. Client engagements are fixed-scope, milestone-billed, with 100% code & IP ownership.

## Products

- Clinizy Care (https://clinizy.in) — hospital management software for Indian clinics, nursing homes and small hospitals, operated by Brynex Labs; not affiliated with Clinzy, ClinzyCare, Clinicia, Clinicea or Klinify.
- Products hub: https://brynex.in/products
- How we built Clinizy Care (builder's story, architecture, lessons learned): https://brynex.in/products/clinizy-care
- Clinizy Care case study: https://brynex.in/case-studies/clinizy-care
- Product details, features and pricing are maintained on clinizy.in, which is the canonical source for the product.

## Company

- Name: Brynex Labs
- Founded: 2023
- Founder: Abhi Pandey, Founder & CTO (https://brynex.in/authors/abhi-pandey)
- Studio facts: ${STUDIO_FACTS_TEXT}.
- Model: Product studio. We build and operate our own software (Clinizy Care) and build software for clients with the same senior team. Remote-first, headquartered in India, serving clients worldwide.
- Differentiators: Production-first (evals, guardrails, observability), senior engineers only, model-agnostic AI, direct engineer access with zero middlemen, fixed-scope pricing.
- Contact: hello@brynex.in — free consultation, response within 6 business hours.

## Services & Pricing

### Agentic AI & Intelligent Automation
URL: https://brynex.in/services/ai-agents-automation
Autonomous, tool-using AI agents built with LangChain, LangGraph, and CrewAI; RAG over your business data with Pinecone, Qdrant, or pgvector; multi-agent orchestration; AI chatbots and copilots; LLM integration and fine-tuning; evaluation, guardrails, and AI Ops.
Pricing (India market, GST extra, milestone-billed in INR):
- Agent Pilot — from ₹49,999: one workflow automated end-to-end, RAG over one source, eval suite & guardrails, live in 2–4 weeks.
- Production Agent System — from ₹1,49,999: multi-step tool-using agents, API/DB/CRM integrations, LangGraph orchestration, observability dashboard, live in 6–10 weeks.
- Enterprise AI Automation — custom scope: multiple workflows, private VPC or self-hosted models, fine-tuning, SLAs, security review.

### AI-Native Software Engineering
URL: https://brynex.in/services/ai-native-software-engineering
Full-cycle product engineering — custom software, multi-tenant SaaS platforms, web & mobile apps, cloud & DevOps, and legacy modernization — built AI-first.
Pricing (India market, GST extra, milestone-billed in INR):
- Launch MVP — from ₹99,999: production-ready core feature set, Next.js app, auth/DB/cloud deploy, live in 6–10 weeks.
- SaaS Platform — from ₹2,49,999: multi-tenant architecture, Stripe billing, web + mobile options, CI/CD & monitoring, live in 3–5 months.
- Enterprise & Modernization — custom scope: phased strangler-pattern migration, dedicated senior team, zero-downtime cutovers.

### SaaS SEO for B2B Companies
URL: https://brynex.in/services/saas-seo
Revenue-focused SEO — BOFU keyword capture, product-led content, conversion-focused landing pages, programmatic SEO, technical SEO, and SEO + CRO.
Pricing: Growth Retainer from ₹50,000/month, custom-scoped to stage and goals.

## India & International Engagement

- India market: GST-compliant INR invoicing, UPI/bank payments, calls in English or Hindi. Same INR pricing shown above.
- International clients (USA, UK, Australia): USD invoicing available, US-style contracts with NDA, guaranteed US-timezone overlap, full IP transfer.
- Hire dedicated AI developers (staff augmentation): dedicated senior engineer from $3,000/month (billed in USD for international clients); dedicated pods and fixed-scope projects also available. URL: https://brynex.in/hire-ai-developers
- AI development company in India overview: https://brynex.in/ai-development-company-in-india

## Authors & Expertise

- Abhi Pandey — Founder & CTO. Leads product and engineering for Clinizy Care. Writes on multi-tenant SaaS architecture, AI agents, RAG, cloud, and DevOps. https://brynex.in/authors/abhi-pandey
- Shashi Tiwari — Head of SEO. Writes on SaaS SEO, technical SEO, and generative engine optimization (GEO). https://brynex.in/authors/shashi-tiwari

## Resources

- Case Studies: https://brynex.in/case-studies — three published case studies:
  - RegorTalent — AI interviewing & ATS platform built end to end: https://brynex.in/case-studies/regortalent-ai-recruitment-platform
  - ExamPapers — AI exam-prep and mock-test platform: https://brynex.in/case-studies/exampapers-ai-exam-prep-platform
  - Clinizy Care — our own hospital management SaaS (in-house): https://brynex.in/case-studies/clinizy-care
- Healthcare software engineering: https://brynex.in/industries/healthcare — healthcare software development services from the team that built Clinizy Care.
- Blog: https://brynex.in/blog — guides on AI agents, RAG, SaaS architecture, cloud engineering, and SaaS SEO.
- How We Work: https://brynex.in/how-we-work — 6-phase agile delivery with weekly demos.
- About: https://brynex.in/about — product studio based in India, working globally.
- Contact: https://brynex.in/contact — free consultation; email hello@brynex.in.

## Common Questions

- How much does AI agent development cost? A single-workflow pilot starts at ₹49,999; production agent systems from ₹1,49,999; enterprise automation is custom-scoped. GST extra, milestone-billed in INR.
- How much does custom software development cost? A production-ready MVP starts at ₹99,999; multi-tenant SaaS platforms from ₹2,49,999; enterprise modernization is custom-scoped.
- Is my data safe? Yes — private VPC deployments, self-hosted open-source models where required, and no training on your proprietary data.
- Who owns the code and IP? You do — 100%, with full IP transfer and code delivered into your own repositories.
- How fast can we start? Discovery within 48–72 hours; a fixed-scope proposal follows before you commit.
`;

export function GET() {
    return new Response(LLMS_FULL_TXT, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    });
}
