'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceDetail } from '@/data/services';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import ContactModal from './ContactModal';
import TechMarquee from './TechMarquee';
import { trackConversion_StartProjectClick, trackConversion_ServiceView } from '@/lib/tracking';

interface ServicePageClientProps {
    service: ServiceDetail;
    /** Which market variant this (static, crawlable) page renders. */
    market?: 'GLOBAL' | 'IN';
    /** URL of the other market's version of this page, rendered as a toggle link. */
    alternateUrl?: string;
}

function SectionBadge({ label }: { label: string }) {
    return (
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
    );
}

export default function ServicePageClient({ service, market = 'GLOBAL', alternateUrl }: ServicePageClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // India-market overrides — resolved at build time per route variant, so
    // both versions are fully static and independently crawlable.
    const inV = market === 'IN' ? service.marketIN : undefined;
    const faqs = (market === 'IN' && service.marketIN?.faqs) ? service.marketIN.faqs : service.faqs;

    useEffect(() => {
        if (service?.title) {
            trackConversion_ServiceView(service.title);
        }
    }, [service?.title]);

    const openModal = (source: string) => {
        trackConversion_StartProjectClick(`Service CTA - ${service.title} - ${source} [${market}]`);
        setIsModalOpen(true);
    };

    return (
        <div className="pt-24 pb-16">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Hero Section */}
            <section className="relative flex items-center justify-center px-6 md:px-8 pt-16 pb-8 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow animate-glow-pulse" />
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(194,65,12,0.06)_0%,transparent_60%)]" />
                    <div
                        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] invert dark:invert-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {service.badge && <SectionBadge label={service.badge} />}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] animate-fade-in-up">
                        {service.title.split(' ').map((word, i) => (
                            <span key={`${word}-${i}`} className={i >= service.title.split(' ').length - 2 ? 'text-accent' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        {inV?.hook ?? service.hook ?? service.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <Button onClick={() => openModal('Hero')} variant="primary" size="lg">
                            {service.customCta?.buttonText ?? 'Start a project'}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            {service.metrics && service.metrics.length > 0 && (
                <SectionWrapper className="!py-0 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-8 border-b border-border/50">
                        {service.metrics.map((metric, i) => (
                            <div key={i} className="text-center group p-6 rounded-2xl hover:bg-background-secondary/30 transition-colors">
                                <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:text-accent">{metric.value}</div>
                                <div className="text-sm font-bold text-foreground-secondary uppercase tracking-[0.2em]">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            )}

            {/* The Problem */}
            <SectionWrapper className="bg-background-secondary/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="The Problem" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {service.problemHeading ?? 'Challenges You Face'}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                        {service.challenges.map((challenge, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background-card hover:border-red-500/30 hover:shadow-card transition-all duration-300 group">
                                <span className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-500/70">
                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <span className="text-foreground-secondary leading-relaxed">{challenge}</span>
                            </div>
                        ))}
                    </div>
                    {service.problemSummary && (
                        <div className="text-center p-6 rounded-2xl border border-border bg-background-card">
                            <p className="text-foreground-secondary text-lg">
                                <span className="font-semibold text-foreground">Result:</span> {service.problemSummary.replace(/^Result:\s*/i, '')}
                            </p>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* How We Solve It */}
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="The Solution" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Solve It</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {service.solutions.map((solution, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background-card hover:border-accent/40 hover:shadow-card transition-all duration-300 group">
                                <span className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="text-foreground-secondary leading-relaxed">{solution}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Sub-Services Grid */}
            {service.subServices && (
                <SectionWrapper className="bg-background-secondary/10">
                    <div className="text-center mb-12">
                        <SectionBadge label="What We Offer" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{service.subServices.heading}</h2>
                        {service.subServices.subheading && (
                            <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">{service.subServices.subheading}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {service.subServices.items.map((item, i) => (
                            <div key={i} className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                {item.intro && <p className="text-foreground-secondary text-sm mb-4">{item.intro}</p>}
                                <ul className="space-y-2.5">
                                    {item.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                            <span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            )}

            {/* Methodology / Process */}
            {service.process && (
                <SectionWrapper className="bg-background-secondary/30">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionBadge label="Our Framework" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {service.processHeading ?? 'Our Methodology'}
                            </h2>
                            <p className="text-foreground-secondary text-lg">A proven, engineered approach to scaling results.</p>
                        </div>
                        <div className="space-y-0">
                            {service.process.map((step, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative group py-8 first:pt-0 last:pb-0">
                                    {i !== service.process!.length - 1 && (
                                        <div className="absolute left-8 md:left-10 top-[5.5rem] bottom-0 w-px bg-gradient-to-b from-border to-transparent group-hover:from-accent/40 transition-colors hidden md:block" />
                                    )}
                                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-background border-2 border-border flex items-center justify-center text-accent text-2xl font-black shadow-sm group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(194,65,12,0.15)] transition-all duration-300 z-10 relative">
                                        0{i + 1}
                                    </div>
                                    <div className="pt-2 md:pt-4 flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                        <p className="text-foreground-secondary leading-relaxed text-lg">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {service.processSummary && (
                            <div className="text-center mt-14 p-8 rounded-2xl bg-accent/5 border border-accent/20 relative overflow-hidden">
                                <div className="absolute inset-0 bg-accent-glow opacity-30 pointer-events-none" />
                                <p className="text-foreground font-semibold text-lg relative z-10">{service.processSummary}</p>
                            </div>
                        )}
                    </div>
                </SectionWrapper>
            )}

            {/* Target Audience */}
            {service.targetAudience && (
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <SectionBadge label="Ideal Client" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who This Is For</h2>
                        <p className="text-foreground-secondary text-lg">We exclusively partner where we can guarantee massive ROI.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgba(34,197,94,0.08)] transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500/20 text-green-500">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                Ideal Fit
                            </h3>
                            <ul className="space-y-4">
                                {service.targetAudience.for.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground-secondary">
                                        <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgba(239,68,68,0.08)] transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/20 text-red-500">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                                </span>
                                Not a Fit
                            </h3>
                            <ul className="space-y-4">
                                {service.targetAudience.notFor.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground-secondary">
                                        <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Pricing */}
            {service.pricing && (
                <SectionWrapper>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <SectionBadge label="Pricing" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{service.pricing.heading}</h2>
                            {(inV?.pricingSubheading ?? service.pricing.subheading) && (
                                <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">{inV?.pricingSubheading ?? service.pricing.subheading}</p>
                            )}
                            {alternateUrl && (
                                <div className="mt-7 inline-flex items-center rounded-full border border-border bg-background-secondary/60 p-1" role="group" aria-label="Pricing region">
                                    {market === 'GLOBAL' ? (
                                        <>
                                            <span className="px-5 py-2 rounded-full text-sm font-bold bg-accent text-white shadow-button">
                                                🌎 Global · USD
                                            </span>
                                            <Link
                                                href={alternateUrl}
                                                scroll={false}
                                                onClick={() => {
                                                    // Choosing India re-enables auto geo-routing.
                                                    document.cookie = 'bx-geo-optout=; path=/; max-age=0; samesite=lax';
                                                }}
                                                className="px-5 py-2 rounded-full text-sm font-bold text-foreground-secondary hover:text-foreground transition-all duration-300"
                                            >
                                                🇮🇳 India · INR
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={alternateUrl}
                                                scroll={false}
                                                onClick={() => {
                                                    // Remember the global choice so middleware doesn't bounce back.
                                                    document.cookie = `bx-geo-optout=1; path=/; max-age=${60 * 60 * 24 * 90}; samesite=lax`;
                                                }}
                                                className="px-5 py-2 rounded-full text-sm font-bold text-foreground-secondary hover:text-foreground transition-all duration-300"
                                            >
                                                🌎 Global · USD
                                            </Link>
                                            <span className="px-5 py-2 rounded-full text-sm font-bold bg-accent text-white shadow-button">
                                                🇮🇳 India · INR
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                            {service.pricing.tiers.map((tier, i) => (
                                <div
                                    key={i}
                                    className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 overflow-hidden ${tier.highlighted
                                        ? 'border-2 border-accent bg-background-card shadow-[0_12px_50px_rgba(194,65,12,0.15)] md:scale-[1.03] z-10'
                                        : 'border border-border bg-background-card shadow-card hover:border-accent/30 hover:shadow-card-hover'
                                        }`}
                                >
                                    {tier.highlighted && (
                                        <>
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient" />
                                            <span className="self-start mb-4 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-[0.15em]">
                                                Most Popular
                                            </span>
                                        </>
                                    )}
                                    <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                                    {tier.tagline && <p className="text-foreground-secondary text-sm mb-6">{tier.tagline}</p>}
                                    <div className="mb-7">
                                        {tier.priceLabel && (
                                            <p className="text-foreground-muted text-[10px] uppercase tracking-[0.2em] mb-2">{tier.priceLabel}</p>
                                        )}
                                        <p className="text-4xl md:text-[2.6rem] font-extrabold text-foreground leading-none transition-opacity duration-300">
                                            {market === 'IN' && tier.priceIN ? tier.priceIN : tier.price}
                                            {tier.period && <span className="text-sm font-medium text-foreground-secondary">{tier.period}</span>}
                                        </p>
                                    </div>
                                    <ul className="space-y-3.5 text-left mb-8 flex-1">
                                        {tier.features.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-foreground-secondary text-sm">
                                                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-accent"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={() => openModal(`Pricing - ${tier.name}`)}
                                        variant={tier.highlighted ? 'primary' : 'secondary'}
                                        size="md"
                                        className="w-full justify-center"
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {(inV?.assurances ?? service.pricing.assurances) && (
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 rounded-2xl border border-border bg-background-secondary/40">
                                {(inV?.assurances ?? service.pricing.assurances)!.map((item, i) => (
                                    <span key={i} className="flex items-center gap-2 text-foreground-secondary text-sm">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-accent flex-shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                        {market === 'IN' && inV?.pricingNote && (
                            <p className="mt-4 text-center text-foreground-muted text-xs tracking-wide">{inV.pricingNote}</p>
                        )}
                    </div>
                </SectionWrapper>
            )}

            {/* Why Us */}
            {service.whyUs && (
                <SectionWrapper className="bg-background-secondary/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <SectionBadge label="Why Us" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{service.whyUs.heading}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.whyUs.items.map((item, i) => (
                                <div key={i} className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                                    <p className="text-foreground-secondary text-sm leading-relaxed">{item.description}</p>
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
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-accent/30 mb-6"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm10 0h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zM10 15v-2a4 4 0 0 0-4-4H4a6 6 0 0 1 6 6zm10 0v-2a4 4 0 0 0-4-4h-2a6 6 0 0 1 6 6z" fill="currentColor" /></svg>
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
                    <SectionBadge label="Tools & Stack" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Tech Stack</h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto">Modern tools for robust, scalable results.</p>
                </div>
                <TechMarquee items={service.techStack} />
            </SectionWrapper>

            {/* Comparison Table */}
            {service.comparison && (
                <SectionWrapper>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <SectionBadge label="The Difference" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{service.comparison.heading}</h2>
                        </div>
                        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
                            <div className="grid grid-cols-2">
                                <div className="p-5 md:p-6 border-r border-border bg-red-500/5">
                                    <span className="font-bold text-foreground-secondary text-xs uppercase tracking-[0.15em]">Typical Agency</span>
                                </div>
                                <div className="p-5 md:p-6 bg-accent/5">
                                    <span className="font-bold text-accent text-xs uppercase tracking-[0.15em]">Our Approach</span>
                                </div>
                            </div>
                            {service.comparison.rows.map((row, i, arr) => (
                                <div key={i} className={`grid grid-cols-2 group hover:bg-background-secondary/20 transition-colors ${i !== arr.length - 1 ? 'border-b border-border' : ''}`}>
                                    <div className="p-4 md:p-5 border-r border-border text-foreground-secondary text-sm md:text-base flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-500/50 flex-shrink-0 hidden md:block"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                        {row.typical}
                                    </div>
                                    <div className="p-4 md:p-5 text-foreground text-sm md:text-base font-medium flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent flex-shrink-0 hidden md:block"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        {row.ours}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* FAQs */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="FAQ" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-5">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 group">
                                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">{faq.question}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <SectionWrapper className="text-center">
                <div className="max-w-3xl mx-auto py-14 px-8 rounded-3xl bg-accent-gradient shadow-glow relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {service.customCta ? service.customCta.title : 'Ready to transform your business?'}
                        </h2>
                        <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
                            {inV?.ctaSubtitle ?? (service.customCta ? service.customCta.subtitle : `Let's discuss how we can build your next ${service.title.toLowerCase()}.`)}
                        </p>
                        {service.customCta?.bullets && (
                            <ul className="text-white text-left max-w-md mx-auto mb-8 space-y-3">
                                {service.customCta.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Button
                            onClick={() => openModal('Final')}
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
