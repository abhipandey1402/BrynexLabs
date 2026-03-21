import { ReactNode } from 'react';
import Button from './Button';
import TrustBadges from './TrustBadges';
import { trackConversion_StartProjectClick } from '@/lib/tracking';

interface CTABlockProps {
    title: string;
    body?: string;
    buttonText: string;
    buttonHref?: string;
    onButtonClick?: () => void;
    children?: ReactNode;
    centered?: boolean;
}

export default function CTABlock({
    title,
    body,
    buttonText,
    buttonHref = '#contact',
    onButtonClick,
    children,
    centered = true,
}: CTABlockProps) {
    return (
        <div className={`${centered ? 'text-center' : ''}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
                {title}
            </h2>
            {body && (
                <p className="text-foreground-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    {body}
                </p>
            )}
            {children}
            <div className={`${centered ? 'flex justify-center' : ''} mt-8`}>
                <Button 
                    href={buttonHref} 
                    onClick={() => {
                        trackConversion_StartProjectClick('CTABlock');
                        if (onButtonClick) onButtonClick();
                    }} 
                    variant="primary" 
                    size="lg"
                >
                    {buttonText}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M3 8H13M13 8L9 4M13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </div>
            {/* Added Trust Badges underneath the final CTA button block */}
            <div className={`${centered ? 'flex justify-center' : ''} mt-2`}>
                <TrustBadges />
            </div>
        </div>
    );
}
