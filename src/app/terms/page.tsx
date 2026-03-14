import SectionWrapper from '@/components/SectionWrapper';

export const metadata = {
    title: 'Terms of Service | Brynex Labs',
    description: 'The legal agreement governing your use of Brynex Labs website and services. Read our terms, conditions, and service standards.',
};

export default function TermsPage() {
    return (
        <div className="pt-32 pb-24">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 border-b border-border pb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            Terms of Service
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                            <span>Last Updated: March 14, 2024</span>
                            <span className="hidden md:block">•</span>
                            <span>Effective Date: Immediate</span>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <section className="mb-12">
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                Please read these Terms of Service (&quot;Terms,&quot; &quot;Terms of Service&quot;) carefully before using the [brynex.in](https://brynex.in) website (the &quot;Service&quot;) operated by Brynex Labs (&quot;us,&quot; &quot;we,&quot; or &quot;our&quot;).
                            </p>
                            <p className="text-foreground-secondary leading-relaxed">
                                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                            </p>
                        </section>

                        <section className="mb-12 p-8 bg-background-secondary border border-border rounded-3xl">
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Scope of Services</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-4">
                                Brynex Labs provides consultative engineering services, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground-secondary">
                                <li>AI Agents & Automation Strategy</li>
                                <li>SaaS Product Engineering</li>
                                <li>Cloud Infrastructure Design</li>
                                <li>High-Performance Web Platform Development</li>
                                <li>Technical Architecture Consulting</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Intellectual Property</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Brynex Labs and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
                            </p>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h4 className="font-bold text-foreground mb-2">Service Deliverables</h4>
                                <p className="text-sm text-foreground-secondary">
                                    Unless otherwise specified in a signed Master Service Agreement (MSA), ownership of custom code and technical deliverables created for clients specifically remains subject to the contractual terms agreed upon during project engagement.
                                </p>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Links To Other Web Sites</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                Our Service may contain links to third-party web sites or services that are not owned or controlled by Brynex Labs.
                            </p>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                Brynex Labs has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Brynex Labs shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation Of Liability</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                In no event shall Brynex Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Governing Law</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </section>

                        <section className="mb-12 border-t border-border pt-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-8">
                                If you have any questions about these Terms, please contact our legal team:
                            </p>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 p-6 bg-white/[0.02] border border-border rounded-2xl hover:border-accent/40 transition-colors group">
                                    <p className="text-sm text-foreground-muted mb-2">Legal Inquiries</p>
                                    <a href="mailto:legal@brynex.in" className="text-lg font-bold text-foreground group-hover:text-accent">legal@brynex.in</a>
                                </div>
                                <div className="flex-1 p-6 bg-white/[0.02] border border-border rounded-2xl hover:border-accent/40 transition-colors group">
                                    <p className="text-sm text-foreground-muted mb-2">General Support</p>
                                    <a href="mailto:hello@brynex.in" className="text-lg font-bold text-foreground group-hover:text-accent">hello@brynex.in</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
