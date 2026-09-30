'use client';

import { useState } from 'react';
import { CaseStudy } from '@/data/case-studies';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import ContactModal from './ContactModal';
import Link from 'next/link';
import { BrowserFrame } from './DeviceFrame';

interface CaseStudyClientProps {
    project: CaseStudy;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pt-24 pb-16">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Hero Section */}
            <SectionWrapper className="relative overflow-hidden mb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4">
                            Case Study: {project.clientName}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tighter leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                    </div>

                    {project.heroShot ? (
                        /* Real product screen (demo data) */
                        <div className="rounded-3xl border border-border bg-background-secondary/60 p-3 sm:p-6 shadow-2xl">
                            <BrowserFrame shot={project.heroShot} address={project.heroShot.address} priority sizes="(min-width: 1024px) 64rem, 100vw" />
                        </div>
                    ) : (
                        /* Placeholder visual (no real imagery yet) */
                        <div className="aspect-[21/9] w-full bg-background-secondary rounded-3xl border border-border overflow-hidden relative shadow-2xl">
                            <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-foreground-secondary/40 font-bold text-lg italic tracking-widest uppercase">
                                    {project.clientName}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* At-a-glance snapshot */}
            <SectionWrapper className="mb-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
                        {project.snapshot.map((row) => (
                            <div key={row.label} className="bg-background-card p-6">
                                <div className="text-[11px] font-bold uppercase tracking-widest text-foreground-secondary mb-2">
                                    {row.label}
                                </div>
                                <div className="text-base font-semibold text-foreground leading-snug">{row.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Results Grid */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {project.results.map((result) => (
                        <div key={result.label} className="text-center">
                            <div className="text-3xl md:text-5xl font-bold text-accent mb-2 tracking-tight">{result.value}</div>
                            <div className="text-sm font-medium text-foreground-secondary uppercase tracking-wider">
                                {result.label}
                            </div>
                            {result.context && (
                                <div className="text-xs text-foreground-secondary/70 mt-1.5 normal-case tracking-normal">
                                    {result.context}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Narrative Sections */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto space-y-14">
                    {project.sections.map((section, index) => (
                        <div key={section.heading}>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3 tracking-tight">
                                <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono text-sm italic">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {section.heading}
                            </h2>
                            <div className="space-y-5">
                                {section.paragraphs.map((para, i) => (
                                    <p key={i} className="text-lg text-foreground-secondary leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>
                            {section.bullets && section.bullets.length > 0 && (
                                <ul className="mt-6 space-y-4">
                                    {section.bullets.map((bullet, i) => (
                                        <li key={i} className="flex gap-3 text-lg text-foreground-secondary leading-relaxed">
                                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {/* Testimonial — only when a real, attributed quote exists */}
                    {project.testimonial && (
                        <div className="p-8 rounded-2xl bg-background-card border border-border relative">
                            <div className="text-5xl text-accent opacity-20 absolute -top-2 left-6 leading-none" aria-hidden="true">
                                &quot;
                            </div>
                            <p className="text-foreground relative z-10 mb-5 text-lg italic leading-relaxed">
                                {project.testimonial.quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-gradient" aria-hidden="true" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">{project.testimonial.author}</div>
                                    <div className="text-xs text-foreground-secondary">{project.testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tech stack */}
                    <div className="pt-4">
                        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">Technologies Used</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech.name}
                                    className="px-4 py-2 rounded-full bg-background-secondary border border-border text-foreground-secondary text-sm font-medium hover:border-accent hover:text-accent transition-colors cursor-default"
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Footer CTA */}
            <SectionWrapper className="text-center pt-16">
                <div className="max-w-4xl mx-auto py-16 px-8 rounded-[40px] bg-neutral-950 border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-gradient opacity-0 lg:group-hover:opacity-[0.02] transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Build your own <span className="text-accent italic">success story.</span>
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-xl">
                            Let&apos;s discuss how we can engineer a custom solution tailored to your business goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                variant="primary"
                                size="lg"
                                className="!bg-accent !text-white !bg-none hover:!bg-accent-light border-none shadow-2xl transition-all font-bold"
                            >
                                Start a project
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                            <Link
                                href="/case-studies"
                                className="px-8 py-4 rounded-button text-lg font-bold text-white/80 hover:text-white transition-colors"
                            >
                                View more case studies
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
