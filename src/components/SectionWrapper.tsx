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

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
        py-20 md:py-28 lg:py-32
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
