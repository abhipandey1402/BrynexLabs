'use client';

import { useState } from 'react';
import { CaseStudy } from '@/data/case-studies';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import ContactModal from './ContactModal';
import Link from 'next/link';

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
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 tracking-tighter leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                    </div>

                    {/* Simple placeholder for hero image since we don't have real ones yet */}
                    <div className="aspect-[21/9] w-full bg-background-secondary rounded-3xl border border-border overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-foreground-secondary/40 font-bold text-lg italic tracking-widest uppercase">
                                Visual Representation: {project.clientName}
                            </span>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Results Grid */}
            <SectionWrapper className="bg-background-secondary/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {project.results.map((result) => (
                        <div key={result.label} className="text-center">
                            <div className="text-3xl md:text-5xl font-bold text-accent mb-2">{result.value}</div>
                            <div className="text-sm font-medium text-foreground-secondary uppercase tracking-wider">
                                {result.label}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Problem & Solution */}
            <SectionWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-mono text-sm italic">
                                    01
                                </span>
                                The Challenge
                            </h2>
                            <p className="text-lg text-foreground-secondary leading-relaxed">
                                {project.problem}
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-2xl bg-background-card border border-border italic relative">
                            <div className="text-5xl text-accent opacity-20 absolute -top-2 left-6 leading-none">"</div>
                            <p className="text-foreground relative z-10 mb-4">
                                {project.testimonial?.quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent-gradient" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">{project.testimonial?.author}</div>
                                    <div className="text-xs text-foreground-secondary">{project.testimonial?.role}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-mono text-sm italic">
                                    02
                                </span>
                                The Solution
                            </h2>
                            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
                                {project.solution}
                            </p>
                            
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">Technologies Used</h3>
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
                            Let's discuss how we can engineer a custom solution tailored to your business goals.
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
