import SectionWrapper from '../SectionWrapper';

const steps = [
    {
        number: '01',
        title: 'Plan',
        description: 'We dissect your goals to architect a roadmap for success.',
    },
    {
        number: '02',
        title: 'Design',
        description: 'We craft intuitive, user-centric interfaces that drive engagement.',
    },
    {
        number: '03',
        title: 'Build',
        description: 'We write clean, efficient code for robust and scalable solutions.',
    },
    {
        number: '04',
        title: 'Measure',
        description: 'We continuously optimize and iterate to keep you ahead of the curve.',
    },
];

export default function HowWeWork() {
    return (
        <SectionWrapper id="how-we-work" ariaLabel="How we work" stagger>
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Our process</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    From concept to launch
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className="
              group relative
              bg-background-card rounded-card p-6 md:p-8
              border border-border hover:border-border-hover
              transition-all duration-300
              hover:bg-background-card-hover
            "
                    >
                        {/* Step number with accent gradient */}
                        <div className="text-3xl md:text-4xl font-bold bg-accent-gradient bg-clip-text text-transparent mb-4">
                            {step.number}
                        </div>

                        {/* Connector line between steps (hidden on last, hidden on mobile single-col) */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border-accent to-transparent" aria-hidden="true" />
                        )}

                        <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                            {step.title}
                        </h3>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Link to Full Process */}
            <div className="text-center mt-12 md:mt-16">
                <a 
                    href="/how-we-work" 
                    className="group inline-flex items-center gap-2 text-foreground font-bold hover:text-accent transition-colors"
                >
                    See our full 6-phase process
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
                </a>
                <p className="text-foreground-muted text-sm mt-4">
                    Simple delivery, fast feedback and long-term support.
                </p>
            </div>
        </SectionWrapper>
    );
}
