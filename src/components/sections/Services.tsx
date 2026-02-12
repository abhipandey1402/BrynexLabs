import SectionWrapper from '../SectionWrapper';
import ServiceCard from '../ServiceCard';

const services = [
    {
        title: 'Business websites & applications',
        description: 'High-quality company websites, portals and business tools.',
    },
    {
        title: 'Custom software & system development',
        description: 'Internal systems, integrations and operational platforms.',
    },
    {
        title: 'SaaS & product engineering',
        description: 'End-to-end product development for startups and growing companies.',
    },
    {
        title: 'AI & automation solutions',
        description: 'Intelligent features, AI agents and workflow automation.',
    },
    {
        title: 'Cloud, DevOps & platform support',
        description: 'Deployment, monitoring, scaling and infrastructure modernisation.',
    },
    {
        title: 'Enhancements, upgrades & maintenance',
        description: 'New features, redesigns, performance and security improvements.',
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
                    What we help you build
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
