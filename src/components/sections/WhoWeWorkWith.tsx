import SectionWrapper from '../SectionWrapper';

const audiences = [
    {
        title: 'Funded Startups',
        description: 'Accelerate your roadmap. We help you ship MVP fast, iterate on user feedback, and secure your next funding round.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-5.82 3.25L7.38 14.14 2.38 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
    {
        title: 'Enterprise Innovators',
        description: 'Modernize legacy tech. We bring startup agility to large-scale systems, ensuring security and compliance.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
    },
    {
        title: 'Scale-Ups',
        description: 'Handle hyper-growth. We build robust architecture that scales to millions of users without crashing.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
];

export default function WhoWeWorkWith() {
    return (
        <SectionWrapper id="who-we-work-with" ariaLabel="Who we work with" stagger>
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Our clients</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Built for Visionaries
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-container mx-auto">
                {audiences.map((item) => (
                    <div
                        key={item.title}
                        className="
              group flex flex-col
              p-8 rounded-card
              bg-background-card border border-border
              hover:border-border-hover hover:bg-background-card-hover
              transition-all duration-300
            "
                    >
                        <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">
                            {item.title}
                        </h3>
                        <p className="text-foreground-secondary text-sm md:text-base leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer line */}
            <p className="text-center text-foreground-muted text-sm mt-12 md:mt-16 italic opacity-80">
                From pre-seed startups to Fortune 500 enterprises.
            </p>
        </SectionWrapper>
    );
}
