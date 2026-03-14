import SectionWrapper from '@/components/SectionWrapper';

export const metadata = {
    title: 'Privacy Policy | Brynex Labs',
    description: 'Learn how Brynex Labs collects, uses, and protects your personal data. Our commitment to privacy and data security for our clients and visitors.',
};

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24">
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 border-b border-border pb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                            <span>Last Updated: March 14, 2024</span>
                            <span className="hidden md:block">•</span>
                            <span>Version 1.1</span>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                Brynex Labs (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ([brynex.in](https://brynex.in)) and through our consultative engineering services.
                            </p>
                            <p className="text-foreground-secondary leading-relaxed">
                                We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                            <p className="text-foreground-secondary mb-4">We collect several types of information from and about users of our Website, including:</p>
                            <ul className="list-disc pl-6 space-y-3 text-foreground-secondary mb-6">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, company name, and job title provided through contact forms.</li>
                                <li><strong>Project Specifications:</strong> Details about your business challenges, technical requirements, and budget ranges provided during inquiries.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs, and information about your interactions with our Website.</li>
                                <li><strong>Communication Records:</strong> Copies of your correspondence if you contact us.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                            <p className="text-foreground-secondary mb-4">We use the information we collect for various purposes, including:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="p-6 bg-background-secondary border border-border rounded-2xl">
                                    <h4 className="font-bold text-foreground mb-2">Service Delivery</h4>
                                    <p className="text-sm text-foreground-secondary">Providing our engineering services, managing projects, and fulfilling contractual obligations.</p>
                                </div>
                                <div className="p-6 bg-background-secondary border border-border rounded-2xl">
                                    <h4 className="font-bold text-foreground mb-2">Communication</h4>
                                    <p className="text-sm text-foreground-secondary">Responding to inquiries, sending service updates, and providing technical support.</p>
                                </div>
                                <div className="p-6 bg-background-secondary border border-border rounded-2xl">
                                    <h4 className="font-bold text-foreground mb-2">Internal Analytics</h4>
                                    <p className="text-sm text-foreground-secondary">Improving our website performance, analyzing user trends, and optimizing our service offerings.</p>
                                </div>
                                <div className="p-6 bg-background-secondary border border-border rounded-2xl">
                                    <h4 className="font-bold text-foreground mb-2">Security</h4>
                                    <p className="text-sm text-foreground-secondary">Protecting against unauthorized access and maintaining the integrity of our digital infrastructure.</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                We do not sell or rent your personal information to third parties. We may disclose personal information that we collect:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-foreground-secondary mb-6">
                                <li>To our subsidiaries and affiliates.</li>
                                <li>To contractors, service providers, and other third parties we use to support our tech stack (e.g., hosting providers, CRM tools).</li>
                                <li>To fulfill the purpose for which you provide it.</li>
                                <li>For any other purpose disclosed by us when you provide the information.</li>
                                <li>To comply with any court order, law, or legal process.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
                            </p>
                            <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl italic text-foreground-secondary text-sm">
                                Note: The safety and security of your information also depends on you. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website.
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
                            <p className="text-foreground-secondary mb-6">Depending on your location, you may have the following rights regarding your personal information:</p>
                            <div className="space-y-4">
                                {[
                                    { title: 'Access', desc: 'The right to request copies of your personal data.' },
                                    { title: 'Rectification', desc: 'The right to request that we correct any information you believe is inaccurate.' },
                                    { title: 'Erasure', desc: 'The right to request that we erase your personal data, under certain conditions.' },
                                    { title: 'Restriction', desc: 'The right to request that we restrict the processing of your personal data.' },
                                ].map((right) => (
                                    <div key={right.title} className="flex gap-4 p-4 border border-border rounded-xl bg-white/[0.02]">
                                        <span className="font-bold text-accent min-w-[120px]">{right.title}</span>
                                        <span className="text-foreground-secondary">{right.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Information</h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6">
                                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                            </p>
                            <div className="p-8 bg-background-secondary border border-border rounded-3xl">
                                <p className="font-bold text-foreground text-lg mb-2">Brynex Labs Privacy Team</p>
                                <a href="mailto:privacy@brynex.in" className="text-accent hover:underline text-lg font-medium">
                                    privacy@brynex.in
                                </a>
                                <p className="mt-4 text-foreground-muted text-sm">
                                    Remote-First | Headquartered in India
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
