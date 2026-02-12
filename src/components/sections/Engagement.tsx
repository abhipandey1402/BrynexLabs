import SectionWrapper from '../SectionWrapper';

const models = [
    {
        title: 'One-time projects and small changes',
        description: 'Scoped work with clear deliverables, timelines and fixed pricing.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.50091C5.79935 3.86551 7.69279 2.7296 9.79619 2.26143C11.8996 1.79326 14.1003 2.01819 16.07 2.9" />
                <path d="M22 4L12 14.01L9 11.01" />
            </svg>
        ),
    },
    {
        title: 'Ongoing development and support',
        description: 'Continuous engineering capacity with flexible monthly engagement.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21" />
                <path d="M12 7V12L15 15" />
                <path d="M18 18L22 22" />
                <path d="M20 18L18 18L18 20" />
            </svg>
        ),
    },
    {
        title: 'Full product and platform delivery',
        description: 'End-to-end product builds from research and design to launch and growth.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
            </svg>
        ),
    },
];

export default function Engagement() {
    return (
        <SectionWrapper id="engagement" ariaLabel="Engagement models" stagger>
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Engagement</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    How you can work with us
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
                {models.map((model) => (
                    <div
                        key={model.title}
                        className="
              group relative
              bg-background-card rounded-card p-6 md:p-8
              border border-border hover:border-border-hover
              transition-all duration-300
              hover:bg-background-card-hover hover:-translate-y-0.5
              text-center
            "
                    >
                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-gradient-subtle pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light mx-auto mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                                {model.icon}
                            </div>
                            <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                                {model.title}
                            </h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                {model.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
