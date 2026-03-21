'use client';

import { useState, useEffect } from 'react';
import { ServiceDetail } from '@/data/services';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import ContactModal from './ContactModal';
import { trackConversion_StartProjectClick, trackConversion_ServiceView } from '@/lib/tracking';

interface ServicePageClientProps {
    service: ServiceDetail;
}

export default function ServicePageClient({ service }: ServicePageClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (service?.title) {
            trackConversion_ServiceView(service.title);
        }
    }, [service?.title]);

    return (
        <div className="pt-24 pb-16">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Hero Section */}
            <SectionWrapper className="relative overflow-hidden mb-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight">
                        {service.title.split(' ').map((word, i) => (
                            <span key={word} className={i >= service.title.split(' ').length - 2 ? 'text-accent' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </SectionWrapper>

            {/* Problem & Solution */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Challenges You Face</h2>
                        <ul className="space-y-4">
                            {service.challenges.map((challenge, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0" />
                                    <span className="text-foreground-secondary">{challenge}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">How We Solve It</h2>
                        <ul className="space-y-4">
                            {service.solutions.map((solution, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
                                    <span className="text-foreground-secondary">{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* Tech Stack */}
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">The Tech Stack</h2>
                    <p className="text-foreground-secondary">Modern tools for robust, scalable results.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {service.techStack.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center p-6 rounded-xl border border-border bg-background-card hover:border-accent transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center mb-3 text-accent font-bold text-xs">
                                {tech.icon}
                            </div>
                            <span className="text-sm font-medium text-foreground">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* FAQs */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {service.faqs.map((faq, i) => (
                            <div key={i} className="bg-background rounded-xl p-6 border border-border">
                                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <SectionWrapper className="text-center">
                <div className="max-w-2xl mx-auto py-12 px-8 rounded-3xl bg-accent-gradient shadow-glow relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your business?</h2>
                        <p className="text-white/80 text-lg mb-8">Let&apos;s discuss how we can build your next {service.title.toLowerCase()}.</p>
                        <Button 
                            onClick={() => {
                                trackConversion_StartProjectClick(`Service CTA - ${service.title}`);
                                setIsModalOpen(true);
                            }} 

                            variant="primary" 
                            size="lg" 
                            className="!bg-neutral-950 !text-white !bg-none hover:!bg-black border border-white/10 hover:border-white/20 shadow-2xl transition-all font-bold"
                        >
                            Start a project
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
