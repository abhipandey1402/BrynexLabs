import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import ServiceCard from '../ServiceCard';
import { services } from '@/data/services';

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
                        key={service.slug}
                        title={service.shortTitle ?? service.title}
                        description={service.cardDescription ?? service.description}
                        href={`/services/${service.slug}`}
                        index={index}
                    />
                ))}
            </div>

            {/* Always-rendered link to the services hub — strengthens internal
                crawl path to /services (the nav link lives in a hover menu). */}
            <div className="mt-10 md:mt-12 text-center">
                <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-accent-dark transition-colors"
                >
                    View all services
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </SectionWrapper>
    );
}
