'use client';

import { ReactNode, useState } from 'react';

export const FIELD_CLASS = 'w-full rounded-xl border border-border bg-background-card px-4 py-3 text-foreground placeholder:text-foreground-muted placeholder:opacity-50 placeholder:font-normal focus:border-accent focus:outline-none transition-colors';
export const LABEL_CLASS = 'block text-xs font-black uppercase tracking-widest text-foreground-secondary mb-2';

/** Labelled single-line text input. */
export function Field({ label, value, onChange, placeholder, hint, mono }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    hint?: string;
    mono?: boolean;
}) {
    return (
        <div>
            <label className={LABEL_CLASS}>{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`${FIELD_CLASS} !py-2.5 ${mono ? 'font-mono text-sm' : ''}`}
            />
            {hint && <p className="mt-1.5 text-xs text-foreground-muted">{hint}</p>}
        </div>
    );
}

/** Labelled multi-line text area. */
export function Area({ label, value, onChange, placeholder, rows = 3, hint }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    rows?: number;
    hint?: string;
}) {
    return (
        <div>
            <label className={LABEL_CLASS}>{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={FIELD_CLASS}
            />
            {hint && <p className="mt-1.5 text-xs text-foreground-muted">{hint}</p>}
        </div>
    );
}

/** Collapsible card grouping a set of fields. Optionally toggled on/off. */
export function Card({ title, subtitle, children, defaultOpen = true }: {
    title: string;
    subtitle?: string;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <section className="rounded-2xl border border-border bg-background-card overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-background-secondary/30 transition-colors"
                aria-expanded={open}
            >
                <span className="min-w-0">
                    <span className="block text-sm font-black uppercase tracking-widest text-foreground">{title}</span>
                    {subtitle && <span className="block mt-0.5 text-xs font-medium normal-case tracking-normal text-foreground-muted">{subtitle}</span>}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-foreground-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && <div className="px-6 pb-6 pt-1 space-y-4 border-t border-border">{children}</div>}
        </section>
    );
}

/** Editable list of plain strings — add, edit, remove, reorder. */
export function StringListEditor({ label, items, onChange, placeholder, hint }: {
    label: string;
    items: string[];
    onChange: (v: string[]) => void;
    placeholder?: string;
    hint?: string;
}) {
    const update = (i: number, v: string) => onChange(items.map((it, idx) => (idx === i ? v : it)));
    const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
    const move = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = [...items];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    return (
        <div>
            <label className={LABEL_CLASS}>{label}</label>
            {hint && <p className="-mt-1 mb-2 text-xs text-foreground-muted">{hint}</p>}
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            value={item}
                            onChange={(e) => update(i, e.target.value)}
                            placeholder={placeholder}
                            className={`${FIELD_CLASS} !py-2 text-sm`}
                        />
                        <ReorderRemove onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => remove(i)} disableUp={i === 0} disableDown={i === items.length - 1} />
                    </div>
                ))}
            </div>
            <AddButton onClick={() => onChange([...items, ''])} label={`Add ${label.toLowerCase()}`} />
        </div>
    );
}

/** Generic repeater for arrays of objects. */
export function Repeater<T>({ label, items, onChange, makeNew, render, itemTitle, addLabel }: {
    label: string;
    items: T[];
    onChange: (v: T[]) => void;
    makeNew: () => T;
    render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
    itemTitle?: (item: T, index: number) => string;
    addLabel?: string;
}) {
    const update = (i: number, patch: Partial<T>) => onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
    const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
    const move = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = [...items];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    return (
        <div>
            <label className={LABEL_CLASS}>{label}</label>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border bg-background p-4">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-bold text-foreground-secondary truncate">{itemTitle ? itemTitle(item, i) : `#${i + 1}`}</span>
                            <ReorderRemove onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => remove(i)} disableUp={i === 0} disableDown={i === items.length - 1} />
                        </div>
                        <div className="space-y-3">{render(item, (patch) => update(i, patch), i)}</div>
                    </div>
                ))}
            </div>
            <AddButton onClick={() => onChange([...items, makeNew()])} label={addLabel ?? `Add ${label.toLowerCase()}`} />
        </div>
    );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border text-sm font-bold text-foreground-secondary hover:border-accent hover:text-accent transition-colors"
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            {label}
        </button>
    );
}

function ReorderRemove({ onUp, onDown, onRemove, disableUp, disableDown }: {
    onUp: () => void; onDown: () => void; onRemove: () => void; disableUp: boolean; disableDown: boolean;
}) {
    const btn = 'p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed';
    return (
        <div className="flex items-center gap-0.5 shrink-0">
            <button type="button" onClick={onUp} disabled={disableUp} className={btn} aria-label="Move up">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg>
            </button>
            <button type="button" onClick={onDown} disabled={disableDown} className={btn} aria-label="Move down">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <button type="button" onClick={onRemove} className="p-1.5 rounded-lg text-foreground-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
        </div>
    );
}
