'use client';

import { useState, useEffect } from 'react';
import { ServiceDetail } from '@/data/services';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import ContactModal from './ContactModal';
import TechMarquee from './TechMarquee';
import { trackConversion_StartProjectClick, trackConversion_ServiceView } from '@/lib/tracking';

interface SaaSSEOClientProps {
    service: ServiceDetail;
}

function SectionBadge({ label }: { label: string }) {
    return (
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
    );
}

export default function SaaSSEOClient({ service }: SaaSSEOClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (service?.title) {
            trackConversion_ServiceView(service.title);
        }
    }, [service?.title]);

    const openModal = () => {
        trackConversion_StartProjectClick(`Service CTA - ${service.title}`);
        setIsModalOpen(true);
    };

    return (
        <div className="pt-24 pb-16">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-8 pt-16 pb-16 overflow-hidden">
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
                    <SectionBadge label="Revenue-Focused SEO" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight leading-[1.1] animate-fade-in-up">
                        SaaS SEO Services for{' '}
                        <span className="text-accent">B2B Companies</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        Turn Organic Traffic into Pipeline, Demo Requests &amp; Revenue. We help B2B SaaS companies turn SEO into a predictable revenue channel—not just a traffic source.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <Button onClick={openModal} variant="primary" size="lg">
                            Get a Custom Growth Plan
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <SectionWrapper className="bg-background-secondary/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="The Problem" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            The Problem with Most SaaS SEO Agencies
                        </h2>
                        <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
                            Most agencies optimize for what&apos;s easy to measure—not what actually matters:
                        </p>
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
                    <div className="text-center p-6 rounded-2xl border border-border bg-background-card/80 backdrop-blur-sm">
                        <p className="text-foreground-secondary text-lg">
                            <span className="font-semibold text-foreground">Result:</span> more visitors, but no meaningful increase in pipeline
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Our Approach: Revenue-Led SaaS SEO Framework */}
            {service.process && (
                <SectionWrapper className="bg-background-secondary/30 !mt-[-1rem]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionBadge label="Our Framework" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Our Approach: Revenue-Led SaaS SEO Framework
                            </h2>
                            <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
                                We don&apos;t treat SEO as content or rankings. We treat it as a system that drives revenue.
                            </p>
                        </div>
                        <p className="text-foreground font-semibold text-lg mb-10">Our Revenue-Led SaaS SEO Framework:</p>
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
                        <div className="text-center mt-14 p-8 rounded-2xl bg-accent/5 border border-accent/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-accent-glow opacity-30 pointer-events-none" />
                            <p className="text-foreground font-semibold text-lg relative z-10">
                                This is how SEO becomes a pipeline engine, not a content activity.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Who This Is For */}
            {service.targetAudience && (
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <SectionBadge label="Ideal Client" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who This Is For</h2>
                        <p className="text-foreground-secondary text-lg">This SaaS SEO service is built for:</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgba(34,197,94,0.08)] transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500/20 text-green-500">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
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
                            <p className="mt-6 pt-4 border-t border-red-500/10 text-sm text-foreground-muted italic">
                                If you&apos;re still experimenting, validating your idea, or looking for basic SEO → this is not the right fit.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Our SaaS SEO Services */}
            <SectionWrapper id="services-grid" className="bg-background-secondary/10">
                <div className="text-center mb-12">
                    <SectionBadge label="What We Offer" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our SaaS SEO Services</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Keyword Research & Strategy */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            Keyword Research &amp; Strategy
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We map keywords to buyer intent and funnel stages:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>High-intent (BOFU) keyword targeting</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Competitor gap analysis</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Revenue-driven prioritization</span></li>
                        </ul>
                    </div>

                    {/* SaaS Content Marketing & Blog Strategy */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            SaaS Content Marketing &amp; Blog Strategy
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We build a content engine, not random blogs:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Topic clusters for authority</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>MOFU + BOFU content mix</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Product-led SEO content</span></li>
                        </ul>
                    </div>

                    {/* Conversion-Focused Landing Pages */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            Conversion-Focused Landing Pages
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">Traffic without conversion is wasted. We build pages that:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Rank for high-intent queries</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Convert visitors into demo requests</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Align with your funnel</span></li>
                        </ul>
                    </div>

                    {/* Technical SEO for SaaS Platforms */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            Technical SEO for SaaS Platforms
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We remove growth bottlenecks:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Crawl &amp; index optimization</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Site structure improvements</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Core Web Vitals</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Scalable SEO architecture</span></li>
                        </ul>
                    </div>

                    {/* Link Building */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            Link Building
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We build authority where it matters:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>High-quality backlinks</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>SaaS-relevant placements</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Scalable link acquisition</span></li>
                        </ul>
                    </div>

                    {/* Programmatic SEO */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            Programmatic SEO
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We help you scale beyond manual SEO:</p>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Data-driven page creation</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Template-based SEO systems</span></li>
                            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>100s–1000s of scalable pages</span></li>
                        </ul>
                    </div>

                    {/* SEO + CRO */}
                    <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group md:col-span-2 lg:col-span-3">
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            SEO + CRO (Conversion Optimization)
                        </h3>
                        <p className="text-foreground-secondary text-sm mb-4">We optimize for outcomes:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Demo conversion rates</span></div>
                            <div className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>Funnel drop-offs</span></div>
                            <div className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>CTA performance</span></div>
                            <div className="flex items-start gap-2 text-sm text-foreground-secondary"><span className="text-accent mt-0.5 flex-shrink-0 font-bold">›</span><span>More traffic → more revenue (not just visits)</span></div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SaaS SEO Pricing */}
            <SectionWrapper>
                <div className="max-w-4xl mx-auto text-center">
                    <SectionBadge label="Pricing" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        SaaS SEO Pricing (Monthly Retainer)
                    </h2>
                    <p className="text-foreground-secondary text-lg mb-10">
                        We work on a monthly retainer model designed for growth-stage SaaS:
                    </p>
                    <div className="relative rounded-3xl border-2 border-border bg-background-card p-8 md:p-12 shadow-card hover:border-accent/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient" />
                        <ul className="space-y-5 text-left max-w-md mx-auto mb-10">
                            {[
                                'Custom scope based on your stage & goals',
                                'Focus on ROI, not deliverables',
                                'Long-term growth partnership',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-foreground-secondary">
                                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-accent"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-border pt-8">
                            <p className="text-foreground-muted text-xs uppercase tracking-[0.2em] mb-3">Plans start from</p>
                            <p className="text-5xl md:text-6xl font-extrabold text-foreground mb-1">
                                ₹50K<span className="text-base font-medium text-foreground-secondary">/Month</span>
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button onClick={openModal} variant="primary" size="lg">
                                Discuss Your Plan
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Why Choose Us */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="Why Us" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Why Choose Us Over Typical SaaS SEO Agencies
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Revenue Focus */}
                        <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">We Focus on Revenue, Not Just Traffic</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">Everything we do is tied to demo generation and pipeline growth</p>
                        </div>
                        {/* Built for SaaS */}
                        <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">Built for SaaS (Not Generic SEO)</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed mb-3">We understand:</p>
                            <ul className="space-y-1.5 text-sm text-foreground-secondary">
                                <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>SaaS funnels</li>
                                <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>Product-led growth</li>
                                <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>High-consideration buying journeys</li>
                            </ul>
                        </div>
                        {/* Programmatic */}
                        <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">Programmatic + Scalable SEO</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">We build systems that scale—not just manual execution</p>
                        </div>
                        {/* SEO + CRO */}
                        <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">🔁 SEO + CRO Combined</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">We don&apos;t stop at traffic—we optimize conversions</p>
                        </div>
                        {/* Strategic Partner */}
                        <div className="rounded-2xl border border-border bg-background-card p-6 hover:border-accent/40 hover:shadow-card-hover transition-all duration-300 group">
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">🧠 Strategic Growth Partner</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">We don&apos;t just execute—we help you build a growth engine</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Tools & Stack */}
            <SectionWrapper>
                <div className="text-center mb-12">
                    <SectionBadge label="Tools & Stack" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The SEO Stack Behind the Results</h2>
                    <p className="text-foreground-secondary max-w-2xl mx-auto">Industry-leading tools for research, technical audits, analytics, and conversion optimization.</p>
                </div>
                <TechMarquee items={service.techStack} />
            </SectionWrapper>

            {/* Comparison Table */}
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="The Difference" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            How We&apos;re Different from Other SaaS SEO Agencies
                        </h2>
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
                        {[
                            { typical: 'Traffic-focused', ours: 'Revenue-focused' },
                            { typical: 'Blog-heavy SEO', ours: 'BOFU + product-led SEO' },
                            { typical: 'Generic keyword targeting', ours: 'ICP + funnel-driven strategy' },
                            { typical: 'SEO in isolation', ours: 'SEO integrated with funnel & CRO' },
                            { typical: 'Manual scaling', ours: 'Programmatic SEO systems' },
                        ].map((row, i, arr) => (
                            <div key={i} className={`grid grid-cols-2 group hover:bg-background-secondary/20 transition-colors ${i !== arr.length - 1 ? 'border-b border-border' : ''}`}>
                                <div className="p-4 md:p-5 border-r border-border text-foreground-secondary text-sm md:text-base flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-500/50 flex-shrink-0 hidden md:block"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                    {row.typical}
                                </div>
                                <div className="p-4 md:p-5 text-foreground text-sm md:text-base font-medium flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent flex-shrink-0 hidden md:block"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    {row.ours}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* When SaaS SEO Doesn't Work */}
            <SectionWrapper className="bg-background-secondary/10">
                <div className="max-w-4xl mx-auto text-center">
                    <SectionBadge label="Transparency" />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        When SaaS SEO Doesn&apos;t Work
                    </h2>
                    <p className="text-foreground-secondary mb-8 text-lg">We&apos;re not the right fit if:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        {service.targetAudience?.notFor.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-red-500/15 bg-red-500/5 hover:border-red-500/30 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500 mt-0.5 flex-shrink-0"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                                <span className="text-foreground-secondary text-sm leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 text-foreground font-semibold text-lg">
                        We work best with companies serious about scaling
                    </p>
                </div>
            </SectionWrapper>

            {/* FAQs */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionBadge label="FAQ" />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">FAQs</h2>
                    </div>
                    <div className="space-y-5">
                        {/* FAQ 1 */}
                        <div className="bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 group">
                            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                                How long does SaaS SEO take?
                            </h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                You can expect initial traction in ~3 months. Meaningful growth compounds over 6–12 months.
                            </p>
                        </div>
                        {/* FAQ 2 */}
                        <div className="bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 group">
                            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                                How is SaaS SEO different from regular SEO?
                            </h3>
                            <div className="text-foreground-secondary text-sm leading-relaxed">
                                <p className="mb-2">SaaS SEO focuses on:</p>
                                <ul className="space-y-1.5 mb-2">
                                    <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>Buyer intent</li>
                                    <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>Product alignment</li>
                                    <li className="flex items-start gap-2"><span className="text-accent flex-shrink-0">›</span>Demo conversion</li>
                                </ul>
                                <p>— not just traffic</p>
                            </div>
                        </div>
                        {/* FAQ 3 */}
                        <div className="bg-background rounded-2xl p-6 md:p-8 border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300 group">
                            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                                What makes your approach different?
                            </h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                We connect SEO directly to pipeline and revenue, not just rankings.
                            </p>
                        </div>
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
                            Ready to Turn SEO into a Revenue Channel?
                        </h2>
                        <p className="text-white text-lg mb-4 max-w-xl mx-auto">
                            If you want:
                        </p>
                        <ul className="text-white text-left max-w-md mx-auto mb-8 space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                <span>More demo requests (not just traffic)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                <span>A scalable organic growth engine</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                <span>SEO aligned with your product and funnel</span>
                            </li>
                        </ul>
                        <Button
                            onClick={openModal}
                            variant="primary"
                            size="lg"
                            className="!bg-neutral-950 !text-white !bg-none hover:!bg-black border border-white/10 hover:border-white/20 shadow-2xl transition-all font-bold group"
                        >
                            Get a Custom Growth Plan
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
