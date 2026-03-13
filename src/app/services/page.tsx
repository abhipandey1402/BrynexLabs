import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';

export const metadata: Metadata = {
    title: 'Expert Software Engineering Services | Brynex Labs',
    description: 'Explore our range of professional software engineering services, from custom app development and SaaS engineering to AI agents and cloud infrastructure.',
};

export default function ServicesIndex() {
    return (
        <div className="pt-24 pb-16">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        Our <span className="text-accent">Services</span>
                    </h1>
                    <p className="text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                        Comprehensive engineering solutions to help startups and enterprises ship production-grade software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.slug}
                            title={service.title}
                            description={service.description}
                            href={`/services/${service.slug}`}
                            index={index}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
