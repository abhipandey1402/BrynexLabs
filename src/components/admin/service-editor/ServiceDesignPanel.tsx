'use client';

import {
    SERVICE_SECTIONS,
    CUSTOM_SECTION_LAYOUTS,
    isCustomSectionKey,
    type ServiceTheme,
    type ServiceSectionConfig,
    type CustomSection,
    type HeroLayout,
    type ServiceButtonStyle,
    type ServiceDensity,
    type SectionBackground,
} from '@/data/services';
import { isValidHex } from '@/lib/serviceTheme';
import { LABEL_CLASS } from './fields';

interface ServiceDesignPanelProps {
    /** Resolved theme — sections is always populated. */
    value: Required<ServiceTheme>;
    onChange: (patch: Partial<ServiceTheme>) => void;
    /** Custom sections, so the section manager can label their rows. */
    customSections?: CustomSection[];
}

const HERO_OPTIONS: { value: HeroLayout; label: string }[] = [
    { value: 'centered', label: 'Centered' },
    { value: 'split', label: 'Split' },
    { value: 'minimal', label: 'Minimal' },
];
const BUTTON_OPTIONS: { value: ServiceButtonStyle; label: string }[] = [
    { value: 'gradient', label: 'Gradient' },
    { value: 'solid', label: 'Solid' },
    { value: 'outline', label: 'Outline' },
];
const DENSITY_OPTIONS: { value: ServiceDensity; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' },
];
const BG_OPTIONS: { value: SectionBackground; label: string }[] = [
    { value: 'default', label: 'Plain' },
    { value: 'muted', label: 'Subtle' },
    { value: 'secondary', label: 'Tinted' },
    { value: 'accent', label: 'Accent' },
];

const PRESET_COLORS = ['#C2410C', '#2563EB', '#7C3AED', '#059669', '#DB2777', '#0891B2', '#D97706', '#DC2626'];

function Segmented<T extends string>({ label, value, options, onChange }: {
    label: string;
    value: T;
    options: { value: T; label: string }[];
    onChange: (v: T) => void;
}) {
    return (
        <div>
            <label className={LABEL_CLASS}>{label}</label>
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-background-secondary border border-border">
                {options.map((o) => (
                    <button
                        key={o.value}
                        type="button"
                        onClick={() => onChange(o.value)}
                        aria-pressed={value === o.value}
                        className={`flex-1 min-w-[5rem] px-3 py-2 rounded-lg text-sm font-bold transition-all ${value === o.value ? 'bg-accent text-white shadow-button' : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'}`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ServiceDesignPanel({ value, onChange, customSections = [] }: ServiceDesignPanelProps) {
    const accent = value.accentColor || '';
    const sections = value.sections;

    const setSections = (next: ServiceSectionConfig[]) => onChange({ sections: next });
    const updateSection = (i: number, patch: Partial<ServiceSectionConfig>) =>
        setSections(sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
    const moveSection = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= sections.length) return;
        const next = [...sections];
        [next[i], next[j]] = [next[j], next[i]];
        setSections(next);
    };

    const labelFor = (key: string) => {
        if (isCustomSectionKey(key)) {
            const cs = customSections.find((c) => c.id === key);
            const layout = CUSTOM_SECTION_LAYOUTS.find((l) => l.value === cs?.layout)?.label;
            return cs?.heading?.trim() || layout || 'Custom block';
        }
        return SERVICE_SECTIONS.find((s) => s.key === key)?.label ?? key;
    };
    const isCustom = (key: string) => isCustomSectionKey(key);

    return (
        <div className="space-y-8">
            {/* Accent colour */}
            <div className="rounded-2xl border border-border bg-background-card p-6 space-y-4">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Brand Colour</h3>
                    <p className="mt-1 text-xs text-foreground-muted">Sets the accent used across buttons, highlights, and the gradient. Leave on brand to keep the site default.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="color"
                        value={isValidHex(accent) ? accent : '#C2410C'}
                        onChange={(e) => onChange({ accentColor: e.target.value })}
                        className="h-11 w-14 rounded-lg border border-border bg-background-card cursor-pointer"
                        aria-label="Pick accent colour"
                    />
                    <input
                        value={accent}
                        onChange={(e) => onChange({ accentColor: e.target.value })}
                        placeholder="#C2410C"
                        className="w-32 rounded-xl border border-border bg-background-card px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => onChange({ accentColor: '' })}
                        className="px-3 py-2 rounded-xl border border-border text-xs font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors"
                    >
                        Reset to brand
                    </button>
                    {accent && !isValidHex(accent) && <span className="text-xs font-semibold text-red-500">Enter a valid hex like #2563EB</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => onChange({ accentColor: c })}
                            aria-label={`Use ${c}`}
                            style={{ backgroundColor: c }}
                            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${accent.toLowerCase() === c.toLowerCase() ? 'border-foreground' : 'border-transparent'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Layout controls */}
            <div className="rounded-2xl border border-border bg-background-card p-6 space-y-5">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Layout & Style</h3>
                <Segmented label="Hero layout" value={value.heroLayout} options={HERO_OPTIONS} onChange={(v) => onChange({ heroLayout: v })} />
                <Segmented label="Button style" value={value.buttonStyle} options={BUTTON_OPTIONS} onChange={(v) => onChange({ buttonStyle: v })} />
                <Segmented label="Section spacing" value={value.density} options={DENSITY_OPTIONS} onChange={(v) => onChange({ density: v })} />
            </div>

            {/* Section manager */}
            <div className="rounded-2xl border border-border bg-background-card p-6 space-y-4">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Sections</h3>
                    <p className="mt-1 text-xs text-foreground-muted">Reorder, show/hide, and set the background tint of each section. The hero and final call-to-action are always shown.</p>
                </div>
                <div className="space-y-2">
                    {sections.map((s, i) => (
                        <div key={s.key} className={`flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 ${s.visible ? '' : 'opacity-60'}`}>
                            <div className="flex items-center gap-0.5 shrink-0">
                                <button type="button" onClick={() => moveSection(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move up">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <button type="button" onClick={() => moveSection(i, 1)} disabled={i === sections.length - 1} className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move down">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                                </button>
                            </div>
                            <span className="flex-1 min-w-[8rem] text-sm font-bold text-foreground flex items-center gap-2">
                                {labelFor(s.key)}
                                {isCustom(s.key) && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30">Custom</span>}
                            </span>
                            <select
                                value={s.background ?? 'default'}
                                onChange={(e) => updateSection(i, { background: e.target.value as SectionBackground })}
                                className="rounded-lg border border-border bg-background-card px-2.5 py-1.5 text-xs font-semibold text-foreground-secondary focus:border-accent focus:outline-none"
                                aria-label={`${labelFor(s.key)} background`}
                            >
                                {BG_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                            <button
                                type="button"
                                onClick={() => updateSection(i, { visible: !s.visible })}
                                aria-pressed={s.visible}
                                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${s.visible ? 'bg-accent' : 'bg-border'}`}
                                aria-label={`${s.visible ? 'Hide' : 'Show'} ${labelFor(s.key)}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${s.visible ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
