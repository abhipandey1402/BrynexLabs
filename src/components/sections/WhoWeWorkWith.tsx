import SectionWrapper from '../SectionWrapper';

const audiences = [
    {
        label: 'Small businesses improving their digital presence.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
                <path d="M9 22V12H15V22" />
            </svg>
        ),
    },
    {
        label: 'Companies upgrading systems and processes.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
        ),
    },
    {
        label: 'Startups building SaaS products.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        ),
    },
    {
        label: 'Product teams scaling complex platforms.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" />
            </svg>
        ),
    },
];

export default function WhoWeWorkWith() {
    return (
        <SectionWrapper id="who-we-work-with" ariaLabel="Who we work with" stagger>
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-background-secondary/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Our clients</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Who we work with
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {audiences.map((item) => (
                    <div
                        key={item.label}
                        className="
              group flex items-start gap-4
              p-5 md:p-6 rounded-card
              bg-background-card border border-border
              hover:border-border-hover hover:bg-background-card-hover
              transition-all duration-300
            "
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light group-hover:bg-accent/15 transition-colors duration-300">
                            {item.icon}
                        </div>
                        <p className="text-foreground-secondary text-sm md:text-base leading-relaxed pt-1.5">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer line */}
            <p className="text-center text-foreground-muted text-sm mt-10 md:mt-12 italic">
                One partner for small tasks and serious systems.
            </p>
        </SectionWrapper>
    );
}
