import SectionWrapper from '../SectionWrapper';

export default function Comparison() {
    return (
        <SectionWrapper id="comparison" ariaLabel="Comparison">
            <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">The Alternative</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    Why choose Brynex Labs?
                </h2>
                <p className="text-foreground-secondary text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                    A side-by-side look at how our elite engineering collective outperforms the industry standards.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center pb-12">

                {/* 1. Average Freelancer Card */}
                <div className="p-8 rounded-3xl bg-background-secondary/30 border border-border/60 hover:border-border transition-colors duration-300">
                    <h3 className="text-xl font-bold text-foreground mb-2">Average Freelancer</h3>
                    <p className="text-sm text-foreground-muted mb-8 pb-8 border-b border-border/50">
                        Often unpredictable, scaling is difficult, and quality varies wildly.
                    </p>
                    <ul className="space-y-5">
                        {[
                            'Unpredictable delivery speeds',
                            'Inconsistent code architecture',
                            'Rarely native AI/LLM engineers',
                            'Hourly billing (Bloated tracking)',
                            'High risk of ghosting'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-500/70 mt-0.5 flex-shrink-0">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. Brynex Labs (Center Highlighted Card) */}
                <div className="relative p-8 md:p-10 bg-background-card rounded-3xl text-foreground shadow-[0_20px_60px_rgba(194,65,12,0.15)] overflow-hidden border-2 border-accent transform lg:-translate-y-4 hover:lg:-translate-y-6 transition-transform duration-500 z-10">
                    {/* Subtle glow behind the card */}
                    <div className="absolute inset-0 bg-accent/[0.03] pointer-events-none" />
                    
                    {/* Upper corner splash */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/10 blur-[50px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-accent/10 text-accent backdrop-blur-md rounded-full text-xs font-bold tracking-wider mb-4 border border-accent/20">
                            THE STANDARD
                        </div>
                        <h3 className="text-2xl font-extrabold mb-2">Brynex Labs</h3>
                        <p className="text-sm text-foreground-secondary mb-8 pb-8 border-b border-border/60">
                            Enterprise-grade systems engineered directly by senior experts.
                        </p>
                        <ul className="space-y-5">
                            {[
                                'Extremely fast (Direct access)',
                                'Enterprise-grade architecture',
                                'Native AI & LLM integration experts',
                                'Transparent, flat-rate pricing',
                                'Direct line to your Senior Devs'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                                    <div className="bg-accent/10 rounded-full p-0.5 mt-0.5 flex-shrink-0 text-accent">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 3. Traditional Agency Card */}
                <div className="p-8 rounded-3xl bg-background-secondary/30 border border-border/60 hover:border-border transition-colors duration-300">
                    <h3 className="text-xl font-bold text-foreground mb-2">Traditional Agency</h3>
                    <p className="text-sm text-foreground-muted mb-8 pb-8 border-b border-border/50">
                        Layered management, high retainers, and slow execution.
                    </p>
                    <ul className="space-y-5">
                        {[
                            'Slow speeds (Paced by layers)',
                            'Standard/Legacy codebase levels',
                            'High learning curve for modern AI',
                            'Massive upfront retainers',
                            'Filtered via Account Managers'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-500/70 mt-0.5 flex-shrink-0">
                                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </SectionWrapper>
    );
}
