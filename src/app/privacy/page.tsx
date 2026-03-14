import SectionWrapper from '@/components/SectionWrapper';

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto py-20 prose prose-invert">
                    <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
                    <p className="text-foreground-secondary mb-6">Last Updated: March 2024</p>
                    
                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Overview</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        At Brynex Labs, we take your privacy seriously. This policy outlines how we handle data collected through our website and service inquiries.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Data Collection</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        We only collect information that you voluntarily provide through our contact forms, such as your name, email address, and project details. This data is used solely to respond to your request and improve our consultative services.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Data Usage</h2>
                    <p className="text-foreground-secondary leading-relaxed mb-6">
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We use industry-standard security measures to ensure your data remains confidential.
                    </p>

                    <div className="mt-16 p-8 border border-border rounded-2xl bg-background-secondary">
                        <p className="text-sm text-foreground-muted">
                            For specific concerns regarding your data privacy, please contact <a href="mailto:privacy@brynex.in" className="text-accent hover:underline">privacy@brynex.in</a>.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
