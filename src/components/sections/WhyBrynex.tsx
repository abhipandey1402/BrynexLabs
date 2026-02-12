import SectionWrapper from '../SectionWrapper';


const features = [
    {
        title: 'Elite Engineering Talent',
        description: 'We don\'t outsource quality. Your project is architected and built by senior engineers who understand complex systems.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: 'Transparent, Agile Delivery',
        description: 'Full visibility from day one. Weekly sprints, open code repositories, and direct lines of communication.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
    },
    {
        title: 'Enterprise-Grade Security',
        description: 'Security isn\'t an afterthought. We implement industry-standard protection and compliance measures by default.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: 'Scalable by Design',
        description: 'We build software that grows with you. Robust architecture that handles millions of users without rewriting.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
];

export default function WhyBrynex() {
    return (
        <SectionWrapper id="why-brynex" ariaLabel="Why Brynex Labs">
            <div className="relative">
                {/* Background glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-glow pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative z-10 max-w-container mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Why us</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                            Engineering you can trust
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="
                                    group relative overflow-hidden
                                    bg-background-card p-6 md:p-8 rounded-card border border-border
                                    hover:border-border-hover transition-colors duration-300
                                "
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="
                                        w-12 h-12 rounded-lg bg-accent/10 border border-accent/20
                                        flex items-center justify-center text-accent
                                        group-hover:scale-110 transition-transform duration-300
                                    ">
                                        {feature.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-foreground-secondary text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
