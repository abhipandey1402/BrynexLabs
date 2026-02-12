export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background" role="contentinfo">
            <div className="mx-auto max-w-container px-6 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <a href="#" className="inline-block group mb-6 select-none" aria-label="Brynex Labs — Home">
                            <div className="flex flex-col items-start leading-none group-hover:opacity-80 transition-opacity duration-300">
                                <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                                    BRYNEX
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.35em] text-foreground-muted uppercase ml-0.5 translate-y-[-2px]">
                                    LABS
                                </span>
                            </div>
                        </a>
                        <p className="text-foreground-muted text-sm leading-relaxed max-w-xs">
                            Premium software development for businesses, startups and product teams.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider mb-4">Navigation</h3>
                        <ul className="space-y-2.5" role="list">
                            {[
                                { label: 'Services', href: '#services' },
                                { label: 'How we work', href: '#how-we-work' },
                                { label: 'Why Brynex', href: '#why-brynex' },
                                { label: 'Contact', href: '#contact' },
                            ].map(link => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-foreground-secondary text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-foreground text-sm font-semibold uppercase tracking-wider mb-4">Get in touch</h3>
                        <a
                            href="#contact"
                            className="
                inline-flex items-center gap-2
                px-5 py-2.5 text-sm font-semibold
                bg-accent-gradient text-white rounded-button
                hover:shadow-button hover:brightness-110
                transition-all duration-200
              "
                        >
                            Start a project
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-foreground-muted text-xs">
                            &copy; {currentYear} Brynex Labs. All rights reserved.
                        </p>
                        <p className="text-foreground-muted text-xs">
                            Built with precision and care.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
