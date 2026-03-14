import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Brynex Labs | Precision Engineering & Product Strategy',
    description: 'Learn about Brynex Labs, our mission to bridge technical complexity with business outcomes, and the founder story behind our senior-led engineering collective.',
};

const values = [
    {
        title: "Code is a Liability",
        description: "We believe functionality is an asset, but code is a liability. We aim for the simplest, most maintainable architecture that solves the problem.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        title: "Ship with Integrity",
        description: "We ship fast, but we never break production. Our reputation is built on stable, production-grade systems that scale from day one.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        )
    },
    {
        title: "Zero Middlemen",
        description: "You get direct access to the engineers building your product. No bloated management layers, just clear, technical communication.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        title: "Budget Respect",
        description: "We treat your budget like our own capital. We optimize for high-impact features and avoid over-engineering unnecessary complexity.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        )
    }
];

const stats = [
    { label: 'Avg. Experience', value: '7+ Years' },
    { label: 'Project Success', value: '100%' },
    { label: 'Senior Engineers', value: '10+' },
    { label: 'Global Clients', value: '25+' },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24 overflow-hidden">
            <SectionWrapper>
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-32 relative">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
                        <div className="relative z-10 max-w-4xl">
                            <h1 className="text-5xl md:text-8xl font-bold text-foreground mb-8 tracking-tighter leading-[0.9]">
                                We build software that <span className="text-accent">moves mountains.</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-foreground-secondary leading-relaxed max-w-3xl">
                                Brynex Labs is a high-performance engineering collective. We bridge the gap between complex technical hurdles and massive business outcomes.
                            </p>
                        </div>
                    </div>

                    {/* Founder Story / Manifesto */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-start">
                        <div className="sticky top-32">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                                <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">The Genesis</span>
                            </div>
                            <h2 className="text-4xl font-bold text-foreground mb-8 tracking-tight">The Brynex Story</h2>
                            <div className="space-y-6 text-lg text-foreground-secondary leading-relaxed">
                                <p>
                                    Brynex Labs didn&apos;t start in a boardroom. It started from a frustration with the status quo of software outsourcing. 
                                </p>
                                <p>
                                    We saw a world where big agencies over-promised with senior sales reps and under-delivered with junior developers. We saw bloated contracts, missed deadlines, and architectures that crumbled under pressure.
                                </p>
                                <p className="font-medium text-foreground italic border-l-2 border-accent pl-6">
                                    &quot;We wanted to build the antidote. A lean, senior-only collective where engineering excellence and product strategy live in the same room.&quot;
                                </p>
                                <p>
                                    Today, Brynex exists for the ambitious founder and the forward-thinking CTO. We treat your product like our own, ensuring that every architectural decision drives your bottom line.
                                </p>
                            </div>
                        </div>
                        <div className="relative pt-12 lg:pt-0">
                            <div className="absolute inset-0 bg-accent/5 rounded-[40px] -rotate-3" />
                            <div className="relative bg-background-card border border-border rounded-[40px] p-10 md:p-14 shadow-2xl">
                                <div className="space-y-12">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                                        <p className="text-foreground-secondary leading-relaxed">
                                            To empower high-growth teams with production-grade engineering that transforms technological complexity into sustainable competitive advantage.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                                        <p className="text-foreground-secondary leading-relaxed">
                                            To be the world&apos;s most trusted partner for intelligent software, known for setting the global standard in AI-driven automation and scalable system design.
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-border grid grid-cols-2 gap-8">
                                        {stats.map((stat) => (
                                            <div key={stat.label}>
                                                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                                <div className="text-xs uppercase tracking-widest text-foreground-muted font-bold">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Values Grid */}
                    <div className="mb-32">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Core Values & DNA</h2>
                            <p className="text-foreground-secondary text-lg">The principles that guide every commit we make.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {values.map((v) => (
                                <div key={v.title} className="p-8 md:p-10 rounded-3xl bg-background-secondary border border-border hover:border-accent/40 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {v.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">{v.title}</h3>
                                    <p className="text-foreground-secondary leading-relaxed">{v.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Methodology Section */}
                    <div className="bg-accent-gradient rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden mb-32">
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6 tracking-tight">The Delivery Methodology</h2>
                                <p className="text-white/80 text-xl leading-relaxed mb-10">
                                    We combine Agile speed with Enterprise precision. Our methodology is designed for rapid iteration without sacrificing architectural integrity.
                                </p>
                                <div className="space-y-4 mb-10">
                                    {[
                                        "Phase 1: Deep Discovery & Technical Audit",
                                        "Phase 2: Architectural Mapping & PoC",
                                        "Phase 3: High-Velocity Parallel Development",
                                        "Phase 4: Production Hardening & CI/CD"
                                    ].map((step) => (
                                        <div key={step} className="flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="font-semibold">{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link 
                                    href="/services"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-2xl hover:bg-white/90 transition-all"
                                >
                                    Learn How We Work
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="hidden lg:block relative">
                                <div className="aspect-square border-4 border-white/20 rounded-full animate-pulse-slow" />
                                <div className="absolute inset-12 border-4 border-white/40 rounded-full animate-spin-slow" />
                                <div className="absolute inset-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                                    <span className="text-5xl font-black italic tracking-tighter">B·L</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center py-20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">
                                Start your <span className="text-accent">new chapter</span> today.
                            </h2>
                            <p className="text-foreground-secondary text-xl mb-12 max-w-2xl mx-auto">
                                Let&apos;s discuss how Brynex Labs can turn your biggest technical obstacles into your greatest market advantages.
                            </p>
                            <Link 
                                href="/contact"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-2xl shadow-accent/40 text-lg"
                            >
                                Get in touch
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
