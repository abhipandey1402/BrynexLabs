import SectionWrapper from '../SectionWrapper';

const steps = [
    {
        number: '01',
        title: 'Plan',
        description: 'We scope the work, clarify goals and define deliverables.',
    },
    {
        number: '02',
        title: 'Design',
        description: 'Architecture and UX decisions come before a line of code.',
    },
    {
        number: '03',
        title: 'Build',
        description: 'Clean, tested code delivered in short, focused sprints.',
    },
    {
        number: '04',
        title: 'Improve',
        description: 'Ongoing iteration, support and performance optimisation.',
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
                    How we work
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

            {/* Caption */}
            <p className="text-center text-foreground-muted text-sm mt-10 md:mt-12">
                Simple delivery, fast feedback and long-term support.
            </p>
        </SectionWrapper>
    );
}
