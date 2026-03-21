'use client';

import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import { trackConversion_StartProjectClick } from '@/lib/tracking';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Become visible after scrolling past the hero (roughly 500px depending on screen size)
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div 
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                }`}
            >
                {/* 
                  The backdrop blur and subtle border make it pop over any content.
                  Padding is asymmetrical to account for the button on the right.
                */}
                <div className="bg-background/90 backdrop-blur-xl border border-border/60 p-2 pr-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3 md:gap-5 ring-1 ring-white/5 mx-auto w-[90vw] md:w-auto max-w-[400px] md:max-w-none">
                    <span className="hidden md:inline-block pl-4 text-sm font-semibold text-foreground-secondary whitespace-nowrap">
                        Ready to accelerate your engineering?
                    </span>
                    <button 
                        onClick={() => {
                            trackConversion_StartProjectClick('Sticky Scroll CTA');
                            setIsModalOpen(true);
                        }}
                        className="w-full md:w-auto bg-accent-gradient hover:brightness-110 transition-all text-white text-sm font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-button whitespace-nowrap"
                    >
                        Start a project
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
