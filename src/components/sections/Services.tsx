import SectionWrapper from '../SectionWrapper';
import ServiceCard from '../ServiceCard';

const services = [
    {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description: 'Architect and build bespoke applications that solve your specific business challenges.',
    },
    {
        slug: 'web-mobile-development',
        title: 'Web & Mobile Development',
        description: 'Engage users with lightning-fast, SEO-optimized websites and high-performance mobile apps.',
    },
    {
        slug: 'saas-product-engineering',
        title: 'SaaS Product Engineering',
        description: 'Launch your product with scalable, production-grade code and modern architecture.',
    },
    {
        slug: 'ai-agents-automation',
        title: 'AI Agents & Automation',
        description: 'Build autonomous AI agents to handle complex workflows, customer support, and data analysis 24/7.',
    },
    {
        slug: 'cloud-infrastructure',
        title: 'Cloud & Infrastructure',
        description: 'Deploy with confidence using secure, scalable, and automated cloud solutions.',
    },
    {
        slug: 'application-modernization',
        title: 'Application Modernization',
        description: 'Transform legacy systems into modern, efficient, and secure digital assets.',
    },
    {
        slug: 'saas-seo',
        title: 'SaaS SEO & Organic Growth',
        description: 'Scale your MRR with sustainable, high-converting organic traffic strategies tailored for SaaS companies.',
    },
];

export default function Services() {
    return (
        <SectionWrapper id="services" ariaLabel="Our services" stagger>
            {/* Section label */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Our services</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Engineering for the modern web
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.title}
                        title={service.title}
                        description={service.description}
                        href={service.slug ? `/services/${service.slug}` : undefined}
                        index={index}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
