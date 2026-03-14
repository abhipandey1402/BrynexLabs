'use client';

import SectionWrapper from '@/components/SectionWrapper';

export default function BlogPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto text-center py-20">
                    <h1 className="text-5xl font-bold text-foreground mb-6">Insights & Updates</h1>
                    <p className="text-xl text-foreground-secondary mb-12">
                        Our engineering blog is under construction. We&apos;ll be sharing deep dives into AI agents, SaaS scaling, and high-performance cloud architecture soon.
                    </p>
                    <div className="p-8 bg-background-secondary border border-border rounded-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-4">Want to be notified when we launch?</h3>
                        <p className="text-foreground-secondary mb-6 italic">Stay ahead with technical insights from the Brynex team.</p>
                        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="work@company.com" 
                                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-accent text-foreground"
                                required
                            />
                            <button className="px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-colors">
                                Notify Me
                            </button>
                        </form>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
