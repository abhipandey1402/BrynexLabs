'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../Button';
import ContactModal from '../ContactModal';
import { trackConversion_StartProjectClick } from '@/lib/tracking';
import TrustBadges from '../TrustBadges';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section
            id="hero"
            aria-label="Hero"
            className="relative min-h-[82vh] flex items-center justify-center px-6 md:px-8 pt-28 pb-16 overflow-hidden"
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
                {/* AI-first lead-in */}
                <div className="mb-7 flex justify-center animate-fade-in-up">
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-background-card/70 py-1.5 pl-2 pr-4 text-sm font-medium text-foreground-secondary backdrop-blur transition-colors hover:border-accent/60 hover:text-foreground"
                    >
                        <span className="rounded-full bg-accent-gradient px-2.5 py-0.5 text-xs font-bold text-white">AI</span>
                        AI-native product studio · Makers of Clinizy Care
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* H1 — only h1 on the page */}
                <h1 className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-7 max-w-5xl mx-auto animate-fade-in-up">
                    We build our own products.
                    <br className="hidden sm:block" />{' '}
                    Then we build yours.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground-secondary text-base md:text-lg lg:text-xl max-w-[46rem] mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    Brynex Labs is the team behind{' '}
                    <Link href="/products/clinizy-care" className="text-foreground font-semibold underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors">
                        Clinizy Care
                    </Link>
                    , hospital management software built for India&apos;s clinics and nursing homes. The same senior engineers ship AI agents, SaaS platforms and SEO for founders worldwide.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button
                        onClick={() => {
                            trackConversion_StartProjectClick('Hero Primary Button');
                            setIsModalOpen(true);
                        }}
                        variant="primary" size="lg"
                    >
                        Start a project
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                    <Link
                        href="/products/clinizy-care"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-button bg-transparent text-foreground font-medium border border-border hover:border-border-hover hover:bg-background-tertiary transition-all duration-200 whitespace-nowrap"
                    >
                        See Clinizy Care <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>

                {/* Embedded Trust Badges */}
                <div>
                    <TrustBadges />
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
