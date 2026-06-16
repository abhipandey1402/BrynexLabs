import type { CSSProperties } from 'react';
import type {
    SectionBackground,
    ServiceButtonStyle,
    ServiceDensity,
    ServiceTheme,
} from '@/data/services';

/** Clamp helper for channel math. */
function clamp(n: number): number {
    return Math.max(0, Math.min(255, Math.round(n)));
}

/** Parse "#RGB" or "#RRGGBB" → [r, g, b]; null when not a valid hex. */
function parseHex(hex: string): [number, number, number] | null {
    const value = hex.trim().replace(/^#/, '');
    const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
    if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
    return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function toHex([r, g, b]: [number, number, number]): string {
    return `#${[r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('')}`;
}

/** Mix a hex toward white (amount > 0) or black (amount < 0), -1..1. */
export function shadeHex(hex: string, amount: number): string {
    const rgb = parseHex(hex);
    if (!rgb) return hex;
    const target = amount >= 0 ? 255 : 0;
    const t = Math.abs(amount);
    return toHex(rgb.map((c) => c + (target - c) * t) as [number, number, number]);
}

/** "#RRGGBB" → "r, g, b" for rgba(var(--x)) consumers. */
function hexToTriplet(hex: string): string | null {
    const rgb = parseHex(hex);
    return rgb ? rgb.join(', ') : null;
}

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function isValidHex(hex: string): boolean {
    return HEX_RE.test(hex.trim());
}

/**
 * Inline CSS-variable overrides for a service's accent. Returns {} when no
 * accent is set, so the page keeps the global brand colour. Overriding the
 * variables cascades to text-accent / bg-accent / border-accent and the
 * accent-gradient, which all read these vars.
 */
export function buildThemeStyle(theme?: ServiceTheme): CSSProperties {
    const accent = theme?.accentColor?.trim();
    if (!accent || !isValidHex(accent)) return {};
    const light = theme?.accentLight && isValidHex(theme.accentLight) ? theme.accentLight : shadeHex(accent, 0.2);
    const lighter = shadeHex(light, 0.25);
    const dark = shadeHex(accent, -0.2);
    const style: Record<string, string> = {
        '--accent': accent,
        '--accent-light': light,
        '--accent-lighter': lighter,
        '--accent-dark': dark,
    };
    // Drive rgba(var(--…)) borders and glows from the same hue.
    const triplet = hexToTriplet(accent);
    if (triplet) {
        style['--accent-rgb'] = triplet;
        style['--border-accent'] = `${triplet}, 0.3`;
        style['--border-accent-hover'] = `${triplet}, 0.5`;
    }
    return style as CSSProperties;
}

/** Vertical rhythm between body sections. */
export const DENSITY_SECTION_CLASS: Record<ServiceDensity, string> = {
    compact: '!py-8 md:!py-10 lg:!py-14',
    comfortable: '',
    spacious: '!py-16 md:!py-24 lg:!py-32',
};

/** Surface tint behind a section. */
export const SECTION_BG_CLASS: Record<SectionBackground, string> = {
    default: '',
    secondary: 'bg-background-secondary/30',
    muted: 'bg-background-secondary/10',
    accent: 'bg-accent/[0.04]',
};

/**
 * Extra classes for a primary CTA button per chosen style. 'gradient' is the
 * Button component's default look, so it adds nothing.
 */
export const BUTTON_STYLE_CLASS: Record<ServiceButtonStyle, string> = {
    gradient: '',
    solid: '!bg-accent !bg-none hover:!brightness-110',
    outline: '!bg-transparent !bg-none !text-accent border !border-accent hover:!bg-accent/10 !shadow-none',
};
