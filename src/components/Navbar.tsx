'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { services } from '@/data/services';
import ContactModal from './ContactModal';

// Unused variable removed

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
                <div className="nav-gradient-line" aria-hidden="true" />

                <nav
                    aria-label="Main navigation"
                    className={`
          transition-all duration-300
          ${isScrolled
                            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm dark:shadow-black/20'
                            : 'bg-transparent'
                        }
        `}
                >
                    <div className="mx-auto max-w-container px-6 md:px-8">
                        <div className="flex items-center justify-between h-16 md:h-[72px]">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 group select-none"
                                aria-label="Brynex Labs — Home"
                            >
                                <div className="flex flex-col items-start leading-none group-hover:opacity-80 transition-opacity duration-300">
                                    <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                                        BRYNEX
                                    </span>
                                    <span className="text-[10px] font-bold tracking-[0.35em] text-foreground-muted uppercase ml-0.5 translate-y-[-2px]">
                                        LABS
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation Menu */}
                            <NavigationMenu.Root className="relative hidden md:flex items-center z-50">
                                <NavigationMenu.List className="flex items-center gap-1 list-none m-0 p-0">
                                    <NavigationMenu.Item>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenu.Link className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80">
                                                Home
                                            </NavigationMenu.Link>
                                        </Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <Link href="/about" legacyBehavior passHref>
                                            <NavigationMenu.Link className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80">
                                                About
                                            </NavigationMenu.Link>
                                        </Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className="group flex items-center justify-between gap-1 px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80 outline-none select-none">
                                            Services
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className="absolute top-0 left-0 w-auto bg-background-card backdrop-blur-xl border border-border ring-1 ring-border/40 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] p-6 animate-in fade-in zoom-in-95 duration-200">
                                            <ul className="m-0 flex flex-col gap-2 w-[400px] list-none p-0">
                                                {services.map((service) => (
                                                    <li key={service.slug}>
                                                        <NavigationMenu.Link asChild>
                                                            <Link
                                                                href={`/services/${service.slug}`}
                                                                className="block p-3 rounded-lg hover:bg-background-secondary/80 transition-colors group"
                                                            >
                                                                <div className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                                                                    {service.title}
                                                                </div>
                                                                <p className="text-xs text-foreground-muted leading-relaxed line-clamp-1">
                                                                    {service.description}
                                                                </p>
                                                            </Link>
                                                        </NavigationMenu.Link>
                                                    </li>
                                                ))}
                                                <li className="mt-2 pt-2 border-t border-border">
                                                    <Link href="/services" className="block p-3 text-center text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-hover transition-colors">
                                                        View All Services
                                                    </Link>
                                                </li>
                                            </ul>
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <Link href="/case-studies" legacyBehavior passHref>
                                            <NavigationMenu.Link className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80">
                                                Case Studies
                                            </NavigationMenu.Link>
                                        </Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <Link href="/blog" legacyBehavior passHref>
                                            <NavigationMenu.Link className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80">
                                                Blog
                                            </NavigationMenu.Link>
                                        </Link>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <Link href="/contact" legacyBehavior passHref>
                                            <NavigationMenu.Link className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-background-secondary/80">
                                                Contact
                                            </NavigationMenu.Link>
                                        </Link>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>

                                <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center mt-2">
                                    <NavigationMenu.Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-[6px] border border-border bg-background-card transition-[width,_height] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                                </div>
                                
                                <div className="ml-4 pl-4 border-l border-border">
                                    <button
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
                                    </button>
                                </div>
                            </NavigationMenu.Root>

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
            transition-all duration-300 ease-out overflow-y-auto
            ${isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
                        aria-hidden={!isMobileOpen}
                    >
                        <div className="px-6 py-8 space-y-2">
                            <Link href="/" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200">
                                Home
                            </Link>
                            <Link href="/about" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200">
                                About
                            </Link>
                            
                            {/* Mobile Services Dropdown */}
                            <div>
                                <button 
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200"
                                >
                                    Services
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                {mobileServicesOpen && (
                                    <div className="ml-4 space-y-1 mt-1 border-l border-border pl-4">
                                        {services.map((service) => (
                                            <Link 
                                                key={service.slug} 
                                                href={`/services/${service.slug}`}
                                                onClick={() => setIsMobileOpen(false)}
                                                className="block px-4 py-2 text-base text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors"
                                            >
                                                {service.title}
                                            </Link>
                                        ))}
                                        <Link 
                                            href="/services"
                                            onClick={() => setIsMobileOpen(false)}
                                            className="block px-4 py-2 text-sm font-bold text-accent uppercase tracking-widest"
                                        >
                                            All Services
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/case-studies" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200">
                                Case Studies
                            </Link>
                            <Link href="/blog" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200">
                                Blog
                            </Link>
                            <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/80 rounded-lg transition-colors duration-200">
                                Contact
                            </Link>
                            
                            <div className="pt-4">
                                <button
                                    onClick={handleStartProject}
                                    className="
                                        block w-full text-center px-6 py-3 text-base font-semibold
                                        bg-accent-gradient text-white rounded-button
                                        hover:shadow-button
                                    "
                                >
                                    Start a project
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
