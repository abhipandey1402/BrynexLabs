import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import Engagement from '@/components/sections/Engagement';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How We Work | Our 6-Phase Engineering Methodology',
    description: 'Explore the Brynex Labs delivery process. From discovery and architecture to deployment and scaling, see how we build high-performance software.',
};

const phases = [
    {
        number: '01',
        title: 'Discovery & Research',
        description: 'We start with a deep-dive into your business goals, user needs, and technical constraints. This isn&apos;t just a meeting; it&apos;s a strategic audit of your product roadmap.',
        items: ['Stakeholder Interviews', 'User Persona Mapping', 'Competitive Analysis', 'Technical Debt Review'],
    },
    {
        number: '02',
        title: 'Planning & Architecture',
        description: 'Before a single line of code is written, we map the system. We select the tech stack that serves your long-term goals and define a clear, timeline-driven execution plan.',
        items: ['System Design Diagrams', 'Database Schema Design', 'API Contract Definitions', 'Resource Allocation'],
    },
    {
        number: '03',
        title: 'High-Velocity Development',
        description: 'Our senior engineers work in agile sprints, delivering functional increments every week. We emphasize code quality, peer reviews, and early integration.',
        items: ['Weekly Demo Cycles', 'Automated CI/CD Pipelines', 'Clean Code Standards', 'Real-time Progress Tracking'],
    },
    {
        number: '04',
        title: 'Testing & Security QA',
        description: 'Software is a liability until it&apos;s proven stable. We perform rigorous automated testing, security audits, and performance profiling to ensure production readiness.',
        items: ['End-to-End Testing', 'Security Vulnerability Scans', 'Load & Stress Testing', 'UX Edge-Case Validation'],
    },
    {
        number: '05',
        title: 'Deployment & Launch',
        description: 'Zero-downtime deployments are our standard. We handle the complexities of cloud infrastructure, monitoring setup, and database migrations for a smooth go-live.',
        items: ['Blue-Green Deployments', 'Monitoring & Alerting', 'Performance Benchmarking', 'Rollback Strategy'],
    },
    {
        number: '06',
        title: 'Maintenance & Scaling',
        description: 'Launch is just the beginning. We provide ongoing support, data-driven optimizations, and the foundational scaling required as your user base grows.',
        items: ['24/7 Error Monitoring', 'Feature Iteration', 'Cost Optimization', 'Strategic Scaling'],
    },
];

export default function HowWeWorkPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-24 text-center">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">The Methodology</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
                            Engineering <span className="text-accent italic">Precision.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-3xl mx-auto">
                            We&apos;ve refined a 6-phase process that balances rapid iteration with rigorous architectural integrity. 
                        </p>
                    </div>

                    {/* Timeline / Phases */}
                    <div className="relative mb-32">
                        {/* Vertical line for desktop */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2" />

                        <div className="space-y-12 lg:space-y-0">
                            {phases.map((phase, index) => (
                                <div key={phase.number} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Content Card */}
                                    <div className="flex-1 w-full">
                                        <div className={`
                                            p-8 md:p-10 bg-background-card border border-border rounded-[40px]
                                            hover:border-accent/30 transition-all duration-300 relative group
                                        `}>
                                            <div className="absolute top-8 right-8 text-4xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                                                {phase.number}
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                                                {phase.title}
                                            </h3>
                                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                                {phase.description}
                                            </p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {phase.items.map((item) => (
                                                    <div key={item} className="flex items-center gap-2 text-sm text-foreground-muted">
                                                        <div className="w-1 h-1 rounded-full bg-accent/60" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle Circle */}
                                    <div className="hidden lg:flex w-12 h-12 rounded-full bg-background border-2 border-border items-center justify-center relative z-10 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                    </div>

                                    {/* Empty space for grid alignment */}
                                    <div className="hidden lg:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How we engage header */}
                    <div id="engagement-models" className="pt-24 border-t border-border">
                        <Engagement />
                    </div>

                    {/* Final CTA */}
                    <div className="mt-32 text-center py-20 bg-background-secondary border border-border rounded-[48px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight px-4">
                            Ready to build something <span className="text-accent underline decoration-accent/20 underline-offset-8">extraordinary?</span>
                        </h2>
                        <Link 
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 text-lg"
                        >
                            Start the discovery phase
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
