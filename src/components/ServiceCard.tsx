import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    description: string;
    href?: string;
    index?: number;
}

export default function ServiceCard({ title, description, href }: ServiceCardProps) {
    const content = (
        <>
            {/* Subtle accent glow on hover */}
            <div className="
        absolute inset-0 rounded-card opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        bg-accent-gradient-subtle
        pointer-events-none
      " />

            <div className="relative z-10">
                {/* Icon dot */}
                <div className="
          w-2 h-2 rounded-full bg-accent mb-4
          group-hover:shadow-glow transition-shadow duration-300
        " />

                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight transition-colors group-hover:text-accent">
                    {title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                    {description}
                </p>

                {href && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
            </div>
        </>
    );

    const className = `
    group relative
    bg-background-card rounded-card p-6 md:p-8
    border border-border hover:border-border-hover
    transition-all duration-300 ease-out
    hover:bg-background-card-hover
    hover:shadow-card-hover
    hover:-translate-y-0.5
    block h-full
  `.trim();

    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <article className={className}>
            {content}
        </article>
    );
}
