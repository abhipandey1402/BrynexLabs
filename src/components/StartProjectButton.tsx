'use client';

import { useState } from 'react';
import Button from './Button';
import ContactModal from './ContactModal';
import { trackConversion_StartProjectClick } from '@/lib/tracking';

/** "Start a project" CTA for server-rendered pages: opens the shared contact modal. */
export default function StartProjectButton({
    source,
    label = 'Start a project',
    size = 'lg',
    className = '',
}: {
    /** Where the click came from, for conversion tracking. */
    source: string;
    label?: string;
    size?: 'md' | 'lg';
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <Button
                onClick={() => {
                    trackConversion_StartProjectClick(source);
                    setIsOpen(true);
                }}
                variant="primary"
                size={size}
                className={className}
            >
                {label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Button>
        </>
    );
}
