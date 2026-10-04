export const dynamic = 'force-static';

const LLMS_TXT = `# Brynex Labs

> Brynex Labs (https://brynex.in) is an AI & SaaS product studio from India. We build and run our own software — Clinizy Care, hospital management software for Indian clinics — and the same senior team builds AI agents, intelligent automation, SaaS platforms and revenue-focused SEO for founders and companies in India, the USA, the UK and Australia. Founded 2023 by Abhi Pandey (Founder & CTO). 5+ senior engineers with 4+ years average experience; fixed-scope pricing; 100% code & IP ownership.

## Products

- [Clinizy Care](https://clinizy.in): Clinizy Care (https://clinizy.in) — hospital management software for Indian clinics, nursing homes and small hospitals, operated by Brynex Labs; not affiliated with Clinzy, ClinzyCare, Clinicia, Clinicea or Klinify.
- [Products at Brynex Labs](https://brynex.in/products): The software we own and operate, and why we build our own products.
- [How we built Clinizy Care](https://brynex.in/products/clinizy-care): The builder's story — the problem, architecture, and lessons from running a live multi-tenant SaaS.

## Services

- [Agentic AI & Intelligent Automation](https://brynex.in/services/ai-agents-automation): Autonomous AI agents built with LangChain, LangGraph, CrewAI, and RAG over business data. Pilots from ₹49,999; production agent systems from ₹1,49,999.
- [AI-Native Software Engineering](https://brynex.in/services/ai-native-software-engineering): Custom software, multi-tenant SaaS platforms, web & mobile apps, cloud & DevOps, legacy modernization. MVPs from ₹99,999; SaaS platforms from ₹2,49,999.
- [SaaS SEO for B2B Companies](https://brynex.in/services/saas-seo): Revenue-focused SEO — BOFU keywords, programmatic SEO, and CRO that turn organic traffic into demos and pipeline.

## India

- [AI Agent Development in India](https://brynex.in/services/ai-agents-automation): Indian-market pricing — pilots from ₹49,999, production systems from ₹1,49,999. GST invoicing.
- [Custom Software Development in India](https://brynex.in/services/ai-native-software-engineering): MVPs from ₹99,999, SaaS platforms from ₹2,49,999. GST invoicing.
- [AI Development Company in India](https://brynex.in/ai-development-company-in-india): Overview of services for the Indian market and offshore clients.

## Hiring & Engagement

- [Hire AI Developers](https://brynex.in/hire-ai-developers): Dedicated senior AI engineers from $3,000/month — 40–60% below US agency rates, US-timezone overlap, NDA & full IP transfer.
- [How We Work](https://brynex.in/how-we-work): 6-phase agile delivery process with weekly demos.
- [Contact](https://brynex.in/contact): Free consultation; response within 6 business hours. Email: hello@brynex.in

## Resources

- [Case Studies](https://brynex.in/case-studies): Four published case studies, each built around AI agents — Clinizy Care (our own hospital management SaaS, with six AI agents), a two-year AI agent roadmap for a five-product healthcare platform (design study, name withheld), RegorTalent (AI interviewing & ATS platform), and ExamPapers (AI exam-prep platform).
- [Two-year AI agent roadmap for a healthcare platform](https://brynex.in/case-studies/healthcare-ai-platform-agent-blueprint): A 24-month design study of where AI agents belong across a five-product healthcare platform (documentation, dictation, referrals, patient texting, rate benchmarking): quarterly roadmap, autonomy ceilings, evaluation loop and risk register. A design, not a delivery report; no results are claimed.
- [Clinizy Care case study](https://brynex.in/case-studies/clinizy-care): In-house case study of building and operating Clinizy Care.
- [Healthcare software engineering](https://brynex.in/industries/healthcare): Healthcare software development services from the team that built Clinizy Care.
- [Blog](https://brynex.in/blog): Guides on AI agents, RAG, SaaS architecture, cloud engineering, and SaaS SEO.
- [About](https://brynex.in/about): A product studio based in India, working globally.

## Authors

- [Abhi Pandey](https://brynex.in/authors/abhi-pandey): Founder & CTO — leads product and engineering for Clinizy Care; writes on multi-tenant SaaS architecture, AI agents, RAG, cloud and DevOps.
- [Shashi Tiwari](https://brynex.in/authors/shashi-tiwari): Head of SEO — SaaS SEO, technical SEO, and generative engine optimization (GEO).

## Full reference

- [llms-full.txt](https://brynex.in/llms-full.txt): Expanded company, service, pricing, and FAQ reference for AI grounding.
`;

export function GET() {
    return new Response(LLMS_TXT, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    });
}
