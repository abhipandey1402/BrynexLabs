/**
 * Instant skeleton shown while admin pages (force-dynamic, DB-backed)
 * render on the server — keeps navigation between sections feeling
 * immediate instead of frozen.
 */
export default function AdminLoading() {
    return (
        <div className="min-h-screen lg:flex lg:h-screen lg:overflow-hidden" aria-busy="true" aria-label="Loading">
            {/* Sidebar placeholder (desktop) */}
            <div className="hidden lg:flex flex-col w-64 shrink-0 h-screen border-r border-border bg-background">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <div className="h-5 w-28 rounded-md bg-background-secondary animate-pulse" />
                </div>
                <div className="px-3 py-5 space-y-6">
                    {[3, 2].map((count, section) => (
                        <div key={section} className="space-y-2">
                            <div className="h-2.5 w-16 mx-3 rounded bg-background-secondary animate-pulse" />
                            {Array.from({ length: count }).map((_, i) => (
                                <div key={i} className="h-10 rounded-xl bg-background-secondary/60 animate-pulse" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile top bar placeholder */}
            <div className="lg:hidden sticky top-0 z-40 h-14 flex items-center px-4 border-b border-border bg-background">
                <div className="h-5 w-28 rounded-md bg-background-secondary animate-pulse" />
            </div>

            {/* Content placeholder */}
            <div className="flex-1 min-w-0 flex flex-col lg:h-screen">
                <div className="border-b border-border px-5 sm:px-8 py-4">
                    <div className="h-7 w-44 rounded-lg bg-background-secondary animate-pulse" />
                    <div className="mt-2 h-3.5 w-72 max-w-full rounded bg-background-secondary/70 animate-pulse" />
                </div>
                <div className="px-5 sm:px-8 py-8 space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-[88px] rounded-xl border border-border bg-background-card animate-pulse" />
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="h-10 w-64 rounded-xl bg-background-secondary animate-pulse" />
                        <div className="h-10 w-72 max-w-[40%] rounded-xl bg-background-secondary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-[72px] rounded-xl border border-border bg-background-card animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
