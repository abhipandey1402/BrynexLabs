import Image from 'next/image';
import type { Screenshot } from '@/data/products';

interface FrameProps {
    shot: Screenshot;
    /** Mark the above-the-fold frame so the image is preloaded (LCP). */
    priority?: boolean;
    /** Responsive sizes hint for next/image. */
    sizes?: string;
    className?: string;
}

/**
 * Real product UI inside a neutral browser chrome. Intrinsic width/height
 * reserve the image box before it loads, so the frame never shifts layout.
 * The chrome is fixed-light on purpose: it frames a real screen, not the site.
 */
export function BrowserFrame({ shot, priority, sizes, className = '', address }: FrameProps & { address: string }) {
    return (
        <figure className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ${className}`}>
            <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#F4F5F4] px-4 py-2.5" aria-hidden="true">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F5A524]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#30A46C]/70" />
                </div>
                <div className="mx-auto w-full max-w-[18rem] truncate rounded-md bg-white px-3 py-1 text-center text-[11px] text-neutral-500 ring-1 ring-black/[0.06]">
                    {address}
                </div>
                <div className="w-[42px]" />
            </div>
            <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                priority={priority}
                sizes={sizes ?? '(min-width: 1024px) 60vw, 100vw'}
                className="block h-auto w-full"
            />
        </figure>
    );
}

/** Real mobile UI inside a minimal phone bezel. */
export function PhoneFrame({ shot, priority, sizes, className = '' }: FrameProps) {
    return (
        <figure className={`overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] ${className}`}>
            <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                priority={priority}
                sizes={sizes ?? '(min-width: 1024px) 20vw, 60vw'}
                className="block h-auto w-full rounded-[1.6rem]"
            />
        </figure>
    );
}
