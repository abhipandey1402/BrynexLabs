import SectionWrapper from '../SectionWrapper';
import FeatureList from '../FeatureList';

const features = [
    'Senior engineers on every project',
    'Clear scope, transparent delivery',
    'Secure and production-ready solutions',
    'Built to scale as your business grows',
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

                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Why us</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                            Why Brynex Labs
                        </h2>
                    </div>

                    <div className="bg-background-card rounded-card border border-border p-8 md:p-10">
                        <FeatureList items={features} />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
