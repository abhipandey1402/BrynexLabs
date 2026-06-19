'use client';

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
}

/**
 * Renders children into document.body, escaping any ancestor stacking context
 * or transform-based containing block (e.g. the `transform` on `.section-animate`),
 * which would otherwise trap `position: fixed` overlays inside a section and let
 * sibling sections paint over them.
 */
export default function Portal({ children }: PortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted || typeof document === 'undefined') return null;

    return createPortal(children, document.body);
}
