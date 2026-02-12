import SectionWrapper from '../SectionWrapper';
import ServiceCard from '../ServiceCard';

const services = [
    {
        title: 'Custom Software Development',
        description: 'Architect and build bespoke applications that solve your specific business challenges.',
    },
    {
        title: 'High-Performance Web Platforms',
        description: 'Engage users with lightning-fast, SEO-optimized websites and portals.',
    },
    {
        title: 'SaaS Product Engineering',
        description: 'Launch your product with scalable, production-grade code and modern architecture.',
    },
    {
        title: 'AI Agents & Automation',
        description: 'Build autonomous AI agents to handle complex workflows, customer support, and data analysis 24/7.',
    },
    {
        title: 'Cloud & Infrastructure',
        description: 'Deploy with confidence using secure, scalable, and automated cloud solutions.',
    },
    {
        title: 'Application Modernization',
        description: 'Transform legacy systems into modern, efficient, and secure digital assets.',
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
                        index={index}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
