import Image from 'next/image';
import { CLINIZY } from '@/data/products';

/**
 * Text-safe Clinizy green for both themes: brand #1A6B3C on light surfaces
 * (6.5:1 on white), Clinizy's green-mid #2E9B59 on dark ones (5.5:1). Kept in
 * a component file so Tailwind's content scan generates both classes.
 */
export const CLINIZY_GREEN_TEXT = 'text-[#1A6B3C] dark:text-[#2E9B59]';

/**
 * Official Clinizy Care logo that follows the site theme: the dark-text mark on
 * light surfaces, the white-text mark on dark ones. Both are rendered so there
 * is no theme flash; CSS shows exactly one.
 */
export default function ClinizyLogo({ className = 'w-[180px]', sizes = '200px' }: { className?: string; sizes?: string }) {
    return (
        <span className={`inline-block ${className}`}>
            <Image
                src={CLINIZY.logo.src}
                alt={CLINIZY.logo.alt}
                width={CLINIZY.logo.width}
                height={CLINIZY.logo.height}
                sizes={sizes}
                className="block h-auto w-full dark:hidden"
            />
            <Image
                src={CLINIZY.logoOnDark.src}
                alt={CLINIZY.logoOnDark.alt}
                width={CLINIZY.logoOnDark.width}
                height={CLINIZY.logoOnDark.height}
                sizes={sizes}
                className="hidden h-auto w-full dark:block"
            />
        </span>
    );
}
