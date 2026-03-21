'use client';

import Button from '../Button';
import { trackConversion_StartProjectClick } from '@/lib/tracking';
import { useState } from 'react';
import ContactModal from '../ContactModal';

export default function BlogCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="my-14 p-8 md:p-12 rounded-[2rem] bg-neutral-950 border border-white/10 shadow-[0_20px_80px_rgba(194,65,12,0.15)] relative overflow-hidden not-prose">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            {/* Ambient Intense Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none -mr-40 -mt-40" />
            
            {/* Extremely High Contrast Content Block */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight leading-tight">
                        Need expert implementation?
                    </h3>
                    <p className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed">
                        Our specialized engineering collective can architect, scale, and physically deploy these exact infrastructures directly into your live production environment.
                    </p>
                </div>
                
                <div className="shrink-0 w-full md:w-auto">
                    <Button 
                        onClick={() => {
                            trackConversion_StartProjectClick('In-Blog CTA');
                            setIsModalOpen(true);
                        }} 
                        variant="primary" 
                        size="lg"
                        className="w-full md:w-auto !bg-accent-gradient !text-white hover:brightness-110 shadow-[0_0_30px_rgba(194,65,12,0.4)] px-8 py-4 text-base md:text-lg font-bold"
                    >
                        Talk to an Expert
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="ml-2 group-hover:translate-x-1 transition-transform">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}
