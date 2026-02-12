import SectionWrapper from '../SectionWrapper';

const models = [
    {
        title: 'Project Delivery',
        description: 'Fixed scope, clear deliverables. Perfect for MVPs, specific feature builds, or defined modernization tasks.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        title: 'Dedicated Teams',
        description: 'Your own engineering squad. We provide the talent, management, and velocity for long-term product growth.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Staff Augmentation',
        description: 'Fill skill gaps instantly. Senior React, Node.js, and AI engineers that plug directly into your existing workflow.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
                    Partnership Models
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-container mx-auto">
                {models.map((model) => (
                    <div
                        key={model.title}
                        className="
              group relative flex flex-col
              bg-background-card rounded-card p-8
              border border-border hover:border-border-hover
              transition-all duration-300
              hover:bg-background-card-hover hover:-translate-y-1
            "
                    >
                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-gradient-subtle pointer-events-none" />

                        <div className="relative z-10 flex flex-col flex-grow">
                            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                {model.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                                {model.title}
                            </h3>
                            <p className="text-foreground-secondary text-base leading-relaxed flex-grow">
                                {model.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
