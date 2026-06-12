export const dynamic = 'force-static';

const LLMS_TXT = `# Brynex Labs

> Brynex Labs (https://brynex.in) is a software company building production-grade AI agents, intelligent automation, custom software & SaaS platforms, and revenue-focused SaaS SEO — for startups and enterprises in the USA, India, UK, and Australia. Senior engineers (4+ years average experience), fixed-scope pricing, 100% code & IP ownership.

## Services

- [Agentic AI & Intelligent Automation](https://brynex.in/services/ai-agents-automation): Autonomous AI agents built with LangChain, LangGraph, CrewAI, and RAG over business data. Pilots from $4,999; production agent systems from $12,999.
- [AI-Native Software Engineering](https://brynex.in/services/ai-native-software-engineering): Custom software, multi-tenant SaaS platforms, web & mobile apps, cloud & DevOps, legacy modernization. MVPs from $9,999; SaaS platforms from $24,999.
- [SaaS SEO for B2B Companies](https://brynex.in/services/saas-seo): Revenue-focused SEO — BOFU keywords, programmatic SEO, and CRO that turn organic traffic into demos and pipeline.

## India

- [AI Agent Development in India](https://brynex.in/in/services/ai-agents-automation): Indian-market pricing — pilots from ₹49,999, production systems from ₹1,49,999. GST invoicing.
- [Custom Software Development in India](https://brynex.in/in/services/ai-native-software-engineering): MVPs from ₹99,999, SaaS platforms from ₹2,49,999. GST invoicing.
- [AI Development Company in India](https://brynex.in/ai-development-company-in-india): Overview of services for the Indian market and offshore clients.

## Hiring & Engagement

- [Hire AI Developers](https://brynex.in/hire-ai-developers): Dedicated senior AI engineers from $3,000/month — 40–60% below US agency rates, US-timezone overlap, NDA & full IP transfer.
- [How We Work](https://brynex.in/how-we-work): 6-phase agile delivery process with weekly demos.
- [Contact](https://brynex.in/contact): Free consultation; response within 6 business hours. Email: hello@brynex.in

## Resources

- [Case Studies](https://brynex.in/case-studies): Real project outcomes, including 1M+ MAU SaaS scaling and healthcare data platforms.
- [Blog](https://brynex.in/blog): Guides on AI agents, RAG, SaaS architecture, cloud engineering, and SaaS SEO.
- [About](https://brynex.in/about): Senior-led engineering collective based in India, working globally.
`;

export function GET() {
    return new Response(LLMS_TXT, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    });
}
