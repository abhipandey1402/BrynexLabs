import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';

export const metadata: Metadata = {
    title: 'About Brynex Labs | Consultative Engineering for Modern Teams',
    description: 'Learn about Brynex Labs, our mission to build high-performance software, and our philosophy of consultative engineering that moves the needle for startups and enterprises.',
};

export default function AboutPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-24 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
                            Engineering that <span className="text-accent italic">moves the needle.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
                            Brynex Labs was founded to bridge the gap between complex technical challenges and real-world business outcomes. We don&apos;t just write code; we architect solutions that scale.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                            <p className="text-foreground-secondary leading-relaxed text-lg mb-6">
                                At Brynex Labs, our mission is to empower innovative teams with production-grade engineering. We believe that software should be an asset, not a bottleneck.
                            </p>
                            <p className="text-foreground-secondary leading-relaxed text-lg">
                                By combining deep expertise in AI, Cloud, and SaaS, we help our partners navigate the rapidly evolving digital landscape with confidence and speed.
                            </p>
                        </div>
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-3xl" />
                            <div className="relative h-full w-full bg-background-card border border-border rounded-3xl p-8 flex flex-col justify-center">
                                <div className="space-y-6">
                                    {[
                                        { label: 'Precision', value: 'Pixel-perfect UI and robust backends.' },
                                        { label: 'Scale', value: 'Architectures that grow with your user base.' },
                                        { label: 'Speed', value: 'Faster time-to-market without compromising quality.' },
                                    ].map((item) => (
                                        <div key={item.label} className="border-l-2 border-accent pl-6">
                                            <h4 className="font-bold text-foreground tracking-wide uppercase text-sm mb-1">{item.label}</h4>
                                            <p className="text-foreground-secondary text-base">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy Section */}
                    <div className="bg-background-secondary border border-border rounded-[40px] p-12 md:p-16 mb-24 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M0 100 Q100 0 200 100 T400 100" />
                                <path d="M0 120 Q100 20 200 120 T400 120" />
                                <path d="M0 140 Q100 40 200 140 T400 140" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-foreground mb-12">The Brynex Philosophy</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-4 italic underline decoration-accent/30 underline-offset-8">Consultative Engineering</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        We are not order-takers. We are partners in your product journey. We challenge assumptions, offer technical perspective, and help you make decisions that prevent future technical debt.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-4 italic underline decoration-accent/30 underline-offset-8">Outcome Driven</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Every line of code we write is focused on a business goal. Whether it&apos;s improving retention, lowering churn, or increasing processing speed, we measure our success by your success.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team/CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-8">Ready to work with us?</h2>
                        <p className="text-foreground-secondary text-lg mb-10 max-w-2xl mx-auto">
                            Join the growing list of startups and enterprises that trust Brynex Labs to build their future.
                        </p>
                        <a 
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-all shadow-xl shadow-accent/20"
                        >
                            Start a project
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
