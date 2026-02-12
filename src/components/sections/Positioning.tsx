import SectionWrapper from '../SectionWrapper';

const stats = [
    { label: 'Avg. Experience', value: '3+ Years' },
    { label: 'Project Success', value: '100%' },
    { label: 'Time Zone Aligned', value: 'US/EU' },
];

export default function Positioning() {
    return (
        <SectionWrapper id="about" ariaLabel="About Us">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Centered Label */}
                <div className="flex justify-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Who we are</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Headline, Manifesto, Stats */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
                            Not an Agency.<br />
                            <span className="text-foreground-secondary">A Software Partner.</span>
                        </h2>

                        <div className="space-y-6 text-base md:text-lg text-foreground-secondary leading-relaxed mb-10">
                            <p>
                                We tired of big agencies over-promising and under-delivering. We built Brynex Labs to be the antidote to bloated contracts and junior-heavy teams.
                            </p>
                            <p>
                                We are a collective of senior systems architects, product engineers, and designers who exist to build software that actually works, scales, and drives revenue.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-8 md:gap-12 border-t border-border pt-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Philosophy Card */}
                    <div className="relative">
                        {/* Decorative gradient blob */}
                        <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl -z-10" />

                        <div className="bg-background-card border border-border rounded-xl p-8 md:p-10 relative overflow-hidden">
                            {/* Subtle background pattern */}
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-semibold text-foreground mb-6">Our Philosophy</h3>
                            <ul className="space-y-4">
                                {[
                                    "Code is a liability, functionality is an asset.",
                                    "Ship fast, but never break production.",
                                    "Direct access to engineers, no middlemen.",
                                    "We treat your budget like our own money."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span className="text-foreground-secondary leading-relaxed">{item}</span>
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
