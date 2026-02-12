interface FeatureListProps {
    items: string[];
}

export default function FeatureList({ items }: FeatureListProps) {
    return (
        <ul className="space-y-4" role="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="flex items-start gap-3 text-foreground-secondary"
                >
                    <span
                        className="
              mt-1.5 flex-shrink-0
              w-5 h-5 rounded-full
              bg-accent/10 border border-accent/30
              flex items-center justify-center
            "
                        aria-hidden="true"
                    >
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="text-accent-light"
                        >
                            <path
                                d="M2 5L4.5 7.5L8 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}
