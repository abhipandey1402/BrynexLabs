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
                    {service.hook ? (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl text-foreground-secondary leading-relaxed font-medium">
                                {service.hook}
                            </h2>
                        </div>
                    ) : (
                        <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
                            {service.description}
                        </p>
                    )}
                </div>

                {service.metrics && service.metrics.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 pb-8 border-b border-border/50">
                        {service.metrics.map((metric, i) => (
                            <div key={i} className="text-center group p-6 rounded-2xl hover:bg-background-secondary/30 transition-colors">
                                <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:text-accent">{metric.value}</div>
                                <div className="text-sm font-bold text-foreground-secondary uppercase tracking-[0.2em]">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </SectionWrapper>

            {/* Problem & Solution */}
            <SectionWrapper className="bg-background-secondary/10">
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

            {/* Target Audience */}
            {service.targetAudience && (
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Who This Is For</h2>
                        <p className="text-foreground-secondary">We exclusively partner where we can guarantee massive ROI.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-500 text-sm">✓</span>
                                Ideal Fit
                            </h3>
                            <ul className="space-y-4">
                                {service.targetAudience.for.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground-secondary">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-500 text-sm">✕</span>
                                Not a Fit
                            </h3>
                            <ul className="space-y-4">
                                {service.targetAudience.notFor.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground-secondary">
                                        <span className="text-red-500 mt-0.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Methodology / Process */}
            {service.process && (
                <SectionWrapper className="bg-background-secondary/30">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Methodology</h2>
                            <p className="text-foreground-secondary">A proven, engineered approach to scaling results.</p>
                        </div>
                        <div className="space-y-12">
                            {service.process.map((step, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start relative group">
                                    {/* Timeline line */}
                                    {i !== service.process!.length - 1 && (
                                        <div className="absolute left-8 md:left-10 top-16 bottom-[-3rem] w-px bg-border group-hover:bg-accent/50 transition-colors hidden md:block" />
                                    )}
                                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-background border border-border flex items-center justify-center text-accent text-2xl font-black shadow-sm group-hover:border-accent transition-colors z-10 relative">
                                        0{i + 1}
                                    </div>
                                    <div className="pt-2 md:pt-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                                        <p className="text-foreground-secondary leading-relaxed text-lg">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Testimonial Section */}
            {service.testimonial && (
                <div className="max-w-container mx-auto px-6 md:px-8 mt-16 mb-16 md:mb-24">
                    <div className="max-w-4xl mx-auto bg-background-secondary/30 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-accent/30 mb-6"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm10 0h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zM10 15v-2a4 4 0 0 0-4-4H4a6 6 0 0 1 6 6zm10 0v-2a4 4 0 0 0-4-4h-2a6 6 0 0 1 6 6z" fill="currentColor"/></svg>
                            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed italic mb-6">&quot;{service.testimonial.quote}&quot;</p>
                            <div>
                                <div className="font-bold text-foreground text-lg">{service.testimonial.author}</div>
                                <div className="text-accent font-medium tracking-wide uppercase mt-1 text-xs">{service.testimonial.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {service.customCta ? service.customCta.title : 'Ready to transform your business?'}
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                            {service.customCta ? service.customCta.subtitle : `Let's discuss how we can build your next ${service.title.toLowerCase()}.`}
                        </p>
                        <Button 
                            onClick={() => {
                                trackConversion_StartProjectClick(`Service CTA - ${service.title}`);
                                setIsModalOpen(true);
                            }} 
                            variant="primary" 
                            size="lg" 
                            className="!bg-neutral-950 !text-white !bg-none hover:!bg-black border border-white/10 hover:border-white/20 shadow-2xl transition-all font-bold group"
                        >
                            {service.customCta ? service.customCta.buttonText : 'Start a project'}
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
