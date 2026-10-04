'use client';

import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';

export interface FAQItem {
    q: string;
    a: string;
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <SectionWrapper id="faq" ariaLabel="Frequently Asked Questions">
            <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-border bg-background-secondary">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    <span className="text-foreground-muted text-[10px] font-black uppercase tracking-[0.2em] pt-px">FAQ</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                    Everything you need to know
                </h2>
                <p className="text-foreground-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Have questions before we start engineering? We&apos;ve got answers.
                </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className={`border rounded-[1.5rem] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                                ? 'bg-background-card border-accent/30 shadow-[0_10px_40px_rgba(194,65,12,0.06)]'
                                : 'bg-background-secondary border-border/50 hover:border-border hover:bg-background-card'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full text-left p-6 sm:px-8 flex items-center justify-between focus:outline-none group"
                            >
                                <span className={`font-semibold text-base sm:text-lg pr-4 md:pr-8 transition-colors duration-300 ${isOpen ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'}`}>
                                    {faq.q}
                                </span>

                                {/* Animated Plus/Minus Container */}
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isOpen
                                    ? 'bg-accent/10 border border-accent/20 text-accent rotate-180'
                                    : 'bg-background-secondary/50 border border-border/50 text-foreground-muted group-hover:bg-border/60 group-hover:text-foreground'
                                    }`}>
                                    {isOpen ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="rotate-180 transition-transform duration-500">
                                            <path d="M5 12h14" />
                                        </svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="transition-transform duration-500">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            {/* 0fr to 1fr internal grid transition for flawless height animation */}
                            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}>
                                <div className="overflow-hidden">
                                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-foreground-secondary leading-relaxed text-sm sm:text-base opacity-90 relative">
                                        {/* Subtle top divider line */}
                                        <div className="absolute top-0 left-8 right-8 h-px bg-border/40" />
                                        <div className="pt-5 sm:pt-6">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
