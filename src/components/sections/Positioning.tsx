import SectionWrapper from '../SectionWrapper';

export default function Positioning() {
    return (
        <SectionWrapper id="positioning" ariaLabel="Positioning">
            <div className="max-w-3xl mx-auto text-center">
                {/* Section label */}
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">About us</span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-6">
                    A trusted engineering partner for everyday business needs and long-term products.
                </h2>
                <p className="text-foreground-secondary text-base md:text-lg leading-relaxed">
                    From business websites and internal tools to complex SaaS platforms and AI systems, Brynex Labs delivers clean, scalable software with senior-level engineering and product thinking.
                </p>
            </div>
        </SectionWrapper>
    );
}
