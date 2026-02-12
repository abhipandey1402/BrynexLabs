interface ServiceCardProps {
    title: string;
    description: string;
    index?: number;
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
    return (
        <article className="
      group relative
      bg-background-card rounded-card p-6 md:p-8
      border border-border hover:border-border-hover
      transition-all duration-300 ease-out
      hover:bg-background-card-hover
      hover:shadow-card-hover
      hover:-translate-y-0.5
    ">
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

                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                    {title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </article>
    );
}
