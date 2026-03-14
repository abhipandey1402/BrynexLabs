import SectionWrapper from '@/components/SectionWrapper';

export default function TermsPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto py-20 prose prose-invert">
                    <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
                    <p className="text-foreground-secondary mb-6">Last Updated: March 2024</p>
                    
                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        By accessing the Brynex Labs website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Intellectual Property</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        All content on this website, including text, designs, and logos, is the exclusive property of Brynex Labs or its content suppliers and is protected by intellectual property laws.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Limitation of Liability</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        Brynex Labs shall not be liable for any damages arising out of the use or inability to use the materials on our website, even if we have been notified of the possibility of such damages.
                    </p>

                    <div className="mt-16 p-8 border border-border rounded-2xl bg-background-secondary">
                        <p className="text-sm text-foreground-muted">
                            Questions regarding our terms? Send an inquiry to <a href="mailto:legal@brynex.in" className="text-accent hover:underline">legal@brynex.in</a>.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
