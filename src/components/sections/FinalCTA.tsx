import SectionWrapper from '../SectionWrapper';
import CTABlock from '../CTABlock';

export default function FinalCTA() {
    return (
        <SectionWrapper id="contact" ariaLabel="Contact us">
            <div className="relative">
                {/* Background glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-glow-strong pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative z-10 py-8 md:py-12">
                    <CTABlock
                        title="Let's improve your software — or build your next product."
                        body="From business websites and system upgrades to SaaS platforms and AI solutions, Brynex Labs delivers dependable software at every stage."
                        buttonText="Start a project"
                        buttonHref="#contact"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}
