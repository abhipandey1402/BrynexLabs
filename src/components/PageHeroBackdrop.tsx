/**
 * The homepage hero's backdrop, reusable on inner-page heroes: accent glow,
 * a wider soft radial, a faint grid, and a fade into the page background.
 * Place it as the first child of a `relative overflow-hidden` hero that
 * starts at the very top of the page, so the glow runs behind the
 * transparent navbar instead of leaving a flat band above the content.
 */
export default function PageHeroBackdrop() {
    return (
        <>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 bg-hero-glow motion-safe:animate-glow-pulse" />
                <div className="absolute left-1/2 top-[4%] h-[800px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.06)_0%,transparent_60%)]" />
                <div
                    className="absolute inset-0 opacity-[0.03] invert dark:invert-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
        </>
    );
}
