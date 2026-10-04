import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import StudioFacts from '../StudioFacts';

export default function Positioning() {
    return (
        <SectionWrapper id="about" ariaLabel="Brief About Us">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Headline, Manifesto & Call to Action */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Who we are</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter mb-8 leading-[0.95]">
                            A product studio.<br />
                            <span className="text-foreground-secondary">Two halves, one team.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-foreground-secondary leading-relaxed mb-10">
                            <p>
                                <strong className="text-foreground">Products:</strong> software we own and run ourselves. <Link href="/products/clinizy-care" className="text-foreground font-semibold hover:text-accent transition-colors">Clinizy Care</Link> is the first.
                            </p>
                            <p>
                                <strong className="text-foreground">Studio:</strong> the same senior engineers build AI agents, SaaS platforms and SEO for clients. Built in India, to the standard we hold our own product to.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Link 
                                href="/about"
                                className="group inline-flex items-center gap-2 text-foreground font-bold hover:text-accent transition-colors py-2"
                            >
                                Learn more about our story
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
                            </Link>
                        </div>
                        <StudioFacts className="mt-10 border-t border-border pt-8" />
                    </div>

                    {/* Right Column: Philosophy Card (Simplified) */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/5 rounded-[2rem] blur-2xl -z-10" />

                        <div className="bg-background-card border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-accent/30 transition-colors">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-6 tracking-tight italic underline decoration-accent/30 underline-offset-8">Our Philosophy</h3>
                            <ul className="space-y-4">
                                {[
                                    "Code is a liability, functionality is an asset.",
                                    "Ship fast, but never break production.",
                                    "Direct access to engineers, no middlemen.",
                                    "We run a live product, so we build like owners, not hour-billers."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                        <span className="text-foreground-secondary font-medium tracking-tight leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
