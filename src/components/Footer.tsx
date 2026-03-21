import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background" role="contentinfo">
            <div className="mx-auto max-w-container px-6 md:px-8 py-16 md:py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
                    {/* Brand & Info */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block group mb-6 select-none" aria-label="Brynex Labs — Home">
                            <div className="flex flex-col items-start leading-none group-hover:opacity-80 transition-opacity duration-300">
                                <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                                    BRYNEX
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.35em] text-foreground-muted uppercase ml-0.5 translate-y-[-2px]">
                                    LABS
                                </span>
                            </div>
                        </Link>
                        <p className="text-foreground-secondary text-base leading-relaxed max-w-sm mb-8">
                            Empowering startups and enterprises with production-grade AI agents, SaaS engineering, and scalable cloud infrastructure.
                        </p>
                        
                        <div className="space-y-4">
                            <a href="mailto:hello@brynex.in" className="block text-foreground font-bold hover:text-accent transition-colors">
                                hello@brynex.in
                            </a>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/company/brynexlabs" target="_blank" rel="noopener noreferrer" className="text-foreground-muted hover:text-foreground transition-colors">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                                <a href="https://x.com/brynexlabs" target="_blank" rel="noopener noreferrer" className="text-foreground-muted hover:text-foreground transition-colors">
                                    <span className="sr-only">X (Twitter)</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-foreground text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">Services</h3>
                        <ul className="space-y-4" role="list">
                            {[
                                { label: 'Custom Software', href: '/services/custom-software-development' },
                                { label: 'SaaS Engineering', href: '/services/saas-product-engineering' },
                                { label: 'AI Agents', href: '/services/ai-agents-automation' },
                                { label: 'Cloud & Infra', href: '/services/cloud-infrastructure' },
                                { label: 'Web & Mobile', href: '/services/web-mobile-development' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground-secondary text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-foreground text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">Company</h3>
                        <ul className="space-y-4" role="list">
                            {[
                                { label: 'About', href: '/about' },
                                { label: 'Case Studies', href: '/case-studies' },
                                { label: 'Careers', href: '/careers' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'Contact', href: '/contact' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground-secondary text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="text-foreground text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-accent pl-4">Legal</h3>
                        <ul className="space-y-4" role="list">
                            {[
                                { label: 'Privacy Policy', href: '/privacy' },
                                { label: 'Terms of Service', href: '/terms' },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground-secondary text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <p className="text-foreground-muted text-xs tracking-wide">
                            &copy; {currentYear}{' '}
                            <span className="text-foreground font-semibold">Brynex Labs</span>
                            <span className="mx-2 text-border">·</span>
                            Precision Engineering. Global Reach.
                        </p>
                        <div className="hidden md:block w-px h-3 bg-border" />
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-foreground-muted text-xs">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent opacity-80" aria-hidden="true">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                                </svg>
                                Based in&nbsp;<span className="text-accent font-medium">India</span>
                            </span>
                            <span className="text-border text-xs">·</span>
                            <span className="flex items-center gap-1.5 text-foreground-muted text-xs">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground-muted" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                </svg>
                                Working Globally
                            </span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
}
