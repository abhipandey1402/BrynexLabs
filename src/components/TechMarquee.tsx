interface TechMarqueeProps {
    items: { name: string; icon: string }[];
    durationSeconds?: number;
}

export default function TechMarquee({ items, durationSeconds = 40 }: TechMarqueeProps) {
    return (
        <div
            className="relative overflow-hidden group"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
        >
            <div
                className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]"
                style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
            >
                {/* List rendered twice so the loop is seamless at the -50% reset point */}
                {[...items, ...items].map((tech, i) => (
                    <div
                        key={`${tech.name}-${i}`}
                        aria-hidden={i >= items.length}
                        className="flex items-center gap-3 shrink-0 px-5 py-3 rounded-xl border border-border bg-background-card hover:border-accent transition-colors"
                    >
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-background-secondary text-accent font-bold text-[10px]">
                            {tech.icon}
                        </span>
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
