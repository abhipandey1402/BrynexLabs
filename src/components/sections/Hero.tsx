'use client';

import React, { useState } from 'react';
import Button from '../Button';
import ContactModal from '../ContactModal';
import TrustBadges from '../TrustBadges';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section
            id="hero"
            aria-label="Hero"
            className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-8 pt-24 pb-16 overflow-hidden"
        >
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Background glow effect — replicating the Framer site's radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                {/* Large central glow */}
                <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow animate-glow-pulse" />
                {/* Subtle secondary glow — wider and dimmer */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(194,65,12,0.06)_0%,transparent_60%)]" />
                {/* Subtle grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] invert dark:invert-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-container text-center">
                {/* H1 — only h1 on the page */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto animate-fade-in-up">
                    AI-Powered Engineering. <span className="text-accent">Real Business Results.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-foreground-secondary text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    Helping startups and enterprises ship production-grade SaaS, AI solutions, and cloud-native platforms — on time, every time.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button onClick={() => setIsModalOpen(true)} variant="primary" size="lg">
                        Start a project
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                    <Button href="#services" variant="secondary" size="lg">
                        View Services
                    </Button>
                </div>
                
                {/* Embedded Trust Badges */}
                <div className="mb-16">
                    <TrustBadges />
                </div>

                {/* Trust Indicators */}
                <div className="relative max-w-3xl mx-auto pt-8 animate-fade-in" style={{ animationDelay: '0.45s' }}>
                    {/* Enhanced divider line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                        <div className="flex flex-col items-center">
                            <span className="text-xl md:text-2xl font-bold text-foreground">50+</span>
                            <span className="text-[13px] text-foreground-secondary mt-1 tracking-tight">Projects Delivered</span>
                        </div>
                        <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-x border-border/30 py-6 sm:py-0">
                            <span className="text-xl md:text-2xl font-bold text-foreground">98%</span>
                            <span className="text-[13px] text-foreground-secondary mt-1 tracking-tight">Client Retention</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl md:text-2xl font-bold text-foreground">3x Faster</span>
                            <span className="text-[13px] text-foreground-secondary mt-1 tracking-tight">Avg. Delivery Speed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade to content */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
                aria-hidden="true"
            />
        </section>
    );
}
