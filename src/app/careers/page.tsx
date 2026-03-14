import SectionWrapper from '@/components/SectionWrapper';

export default function CareersPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto py-20">
                    <h1 className="text-5xl font-bold text-foreground mb-8">Join the Lab</h1>
                    <p className="text-xl text-foreground-secondary leading-relaxed mb-12">
                        We are a team of technical purists, architecting the next generation of SaaS and AI-powered infrastructure. If you thrive on solving high-impact engineering problems, we want to hear from you.
                    </p>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Active Roles</h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-background-secondary border border-border rounded-xl flex items-center justify-between group hover:border-accent transition-colors cursor-pointer">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">Senior Product Engineer</h3>
                                        <p className="text-foreground-secondary text-sm">Full-stack • Hybrid/Remote • India</p>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </div>
                                <div className="p-6 bg-background-secondary border border-border rounded-xl flex items-center justify-between group hover:border-accent transition-colors cursor-pointer opacity-70">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">AI Infrastructure Lead</h3>
                                        <p className="text-foreground-secondary text-sm">Machine Learning • Remote • India</p>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted px-3 py-1 bg-border rounded-full">Coming Soon</span>
                                </div>
                            </div>
                        </section>

                        <section className="p-10 bg-accent/5 rounded-3xl border border-accent/10">
                            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Don&apos;t see a perfect fit?</h2>
                            <p className="text-foreground-secondary text-center mb-8">
                                We&apos;re always looking for exceptional talent. Reach out to our engineering leads directly.
                            </p>
                            <div className="text-center">
                                <a href="mailto:careers@brynex.in" className="text-accent font-bold text-lg hover:underline underline-offset-8">
                                    careers@brynex.in
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
