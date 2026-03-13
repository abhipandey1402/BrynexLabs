'use client';

import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'How we work', href: '/#how-we-work' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleStartProject = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileOpen(false);
        setIsModalOpen(true);
    };

    return (
        <>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <header className="fixed top-0 left-0 right-0 z-50">
                {/* Top gradient line — matches the Framer site's accent line at top */}
                <div className="nav-gradient-line" aria-hidden="true" />

                <nav
                    aria-label="Main navigation"
                    className={`
          transition-all duration-300
          ${isScrolled
                            ? 'bg-[rgba(5,5,5,0.85)] backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
                            : 'bg-transparent'
                        }
        `}
                >
                    <div className="mx-auto max-w-container px-6 md:px-8">
                        <div className="flex items-center justify-between h-16 md:h-[72px]">
                            {/* Logo */}
                            <a
                                href="#"
                                className="flex items-center gap-2 group select-none"
                                aria-label="Brynex Labs — Home"
                            >
                                {/* Logo mark — typographic style matching Aeos Labs */}
                                <div className="flex flex-col items-start leading-none group-hover:opacity-80 transition-opacity duration-300">
                                    <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                                        BRYNEX
                                    </span>
                                    <span className="text-[10px] font-bold tracking-[0.35em] text-foreground-muted uppercase ml-0.5 translate-y-[-2px]">
                                        LABS
                                    </span>
                                </div>
                            </a>

                            {/* Desktop Nav */}
                            <div className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="
                    px-4 py-2 text-sm text-foreground-secondary
                    hover:text-foreground transition-colors duration-200
                    rounded-lg hover:bg-white/[0.03]
                  "
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="ml-4 pl-4 border-l border-border">
                                    <a
                                        href="#contact"
                                        onClick={handleStartProject}
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

                            {/* Mobile Toggle */}
                            <button
                                className="md:hidden p-2 text-foreground-secondary hover:text-foreground transition-colors rounded-lg"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileOpen}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    {isMobileOpen ? (
                                        <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    ) : (
                                        <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`
            md:hidden
            fixed inset-x-0 top-[65px] bottom-0
            bg-background/95 backdrop-blur-xl
            border-t border-border
            transition-all duration-300 ease-out
            ${isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
                        aria-hidden={!isMobileOpen}
                    >
                        <div className="px-6 py-8 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="
                  block px-4 py-3 text-lg text-foreground-secondary
                  hover:text-foreground hover:bg-white/[0.03]
                  rounded-lg transition-colors duration-200
                "
                                    tabIndex={isMobileOpen ? 0 : -1}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    onClick={handleStartProject}
                                    className="
                  block text-center px-6 py-3 text-base font-semibold
                  bg-accent-gradient text-white rounded-button
                  hover:shadow-button
                "
                                    tabIndex={isMobileOpen ? 0 : -1}
                                >
                                    Start a project
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
