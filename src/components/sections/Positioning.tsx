import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';

const stats = [
    { label: 'Avg. Experience', value: '7+ Years' },
    { label: 'Project Success', value: '100%' },
    { label: 'Senior Engineers', value: '10+' },
];

export default function Positioning() {
    return (
        <SectionWrapper id="about" ariaLabel="Brief About Us">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Headline, Manifesto & Call to Action */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Who we are</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter mb-8 leading-[0.95]">
                            Not just another agency.<br />
                            <span className="text-foreground-secondary">Your engineering partners.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-foreground-secondary leading-relaxed mb-10">
                            <p>
                                We built Brynex Labs to be the antidote to bloated contracts and junior-heavy teams. We are a senior-only collective focused on building software that scales and drives revenue.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Link 
                                href="/about"
                                className="group inline-flex items-center gap-2 text-foreground font-bold hover:text-accent transition-colors py-2"
                            >
                                Learn more about our story
                                <svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="group-hover:translate-x-1 transition-transform"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <div className="hidden sm:block w-px h-8 bg-border" />

                            <div className="flex gap-8">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-xl font-bold text-foreground">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Philosophy Card (Simplified) */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl -z-10" />

                        <div className="bg-background-card border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-accent/30 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-6 tracking-tight italic underline decoration-accent/30 underline-offset-8">Our Philosophy</h3>
                            <ul className="space-y-4">
                                {[
                                    "Code is a liability, functionality is an asset.",
                                    "Ship fast, but never break production.",
                                    "Direct access to engineers, no middlemen.",
                                    "Outcome-driven over hours-billed."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span className="text-foreground-secondary font-medium tracking-tight leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
