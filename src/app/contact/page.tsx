import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Consult with Our Engineering Experts | Brynex Labs',
    description: 'Ready to build production-grade software? Contact Brynex Labs to discuss your AI, SaaS, or enterprise product vision. We respond within 6 business hours.',
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-16">
            <SectionWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Content Column */}
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter">
                            Let&apos;s build <span className="text-accent italic">together.</span>
                        </h1>
                        <p className="text-xl text-foreground-secondary leading-relaxed mb-12">
                            Whether you&apos;re looking to scale an existing platform or build a new AI-powered product from scratch, our engineering team is ready to help.
                        </p>

                        <div className="space-y-10">
                            {/* Email */}
                            <div className="group">
                                <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-widest mb-3">Email Us</h3>
                                <a 
                                    href="mailto:hello@brynex.in" 
                                    className="text-2xl md:text-3xl font-bold text-foreground hover:text-accent transition-colors underline decoration-accent/30 underline-offset-8"
                                >
                                    hello@brynex.in
                                </a>
                            </div>

                            {/* Response Time */}
                            <div>
                                <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-widest mb-3">Response Time</h3>
                                <p className="text-2xl font-bold text-foreground">
                                    Within 4-6 business hours
                                </p>
                                <p className="text-foreground-secondary mt-1">We value your time as much as our engineering cycles.</p>
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-widest mb-3">Office</h3>
                                <p className="text-2xl font-bold text-foreground">
                                    Remote-First
                                </p>
                                <p className="text-foreground-secondary mt-1">Headquartered in India. Operating globally.</p>
                            </div>

                            {/* Social/Direct */}
                            <div className="flex gap-6 pt-4">
                                <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-accent hover:border-accent transition-all">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-accent hover:border-accent transition-all">
                                    <span className="sr-only">X (Twitter)</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full opacity-50" />
                        <div className="relative bg-background-card border border-border p-8 md:p-10 rounded-3xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-foreground mb-8">Tell us about your project</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
