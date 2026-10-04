'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SectionWrapperProps {
    id?: string;
    children: ReactNode;
    className?: string;
    ariaLabel?: string;
    animate?: boolean;
    stagger?: boolean;
}

export default function SectionWrapper({
    id,
    children,
    className = '',
    ariaLabel,
    animate = true,
    stagger = false,
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!animate) return;

        const el = sectionRef.current;
        if (!el) return;

        // Failsafe: if IntersectionObserver is unavailable (old/headless agents),
        // reveal immediately so content is never left in the hidden state.
        if (typeof IntersectionObserver === 'undefined') {
            el.classList.add('is-visible');
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            // threshold 0: reveal as soon as any part of the section enters the view. A fractional
            // threshold can never be met by a section taller than viewport / threshold (a long article
            // on a phone), which left that section invisible forever.
            { threshold: 0, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    return (
        <section
            ref={sectionRef}
            id={id}
            aria-label={ariaLabel}
            className={`
        py-12 md:py-16 lg:py-24
        px-6 md:px-8
        ${animate ? 'section-animate' : ''}
        ${stagger ? 'stagger-children' : ''}
        ${className}
      `}
        >
            <div className="mx-auto max-w-container">
                {children}
            </div>
        </section>
    );
}
