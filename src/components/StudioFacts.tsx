import { STUDIO_FACTS } from '@/data/company';

/**
 * The reconciled studio facts. Rendered by both Home and About so the two
 * pages can never drift apart again. DOM order is label → value → detail for
 * screen readers; visual order puts the value first.
 */
export default function StudioFacts({ className = '' }: { className?: string }) {
    return (
        <dl className={`grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 ${className}`}>
            {STUDIO_FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col">
                    <dt className="order-2 mt-1 text-sm font-semibold text-foreground">{fact.label}</dt>
                    <dd className="order-1 text-3xl font-bold tracking-tight text-foreground">{fact.value}</dd>
                    <dd className="order-3 mt-0.5 text-xs text-foreground-muted">{fact.detail}</dd>
                </div>
            ))}
        </dl>
    );
}
