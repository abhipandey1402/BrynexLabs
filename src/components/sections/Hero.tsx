import Button from '../Button';

export default function Hero() {
    return (
        <section
            id="hero"
            aria-label="Hero"
            className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-8 pt-24 pb-16 overflow-hidden"
        >
            {/* Background glow effect — replicating the Framer site's radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                {/* Large central glow */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow animate-glow-pulse" />
                {/* Subtle secondary glow — wider and dimmer */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(194,65,12,0.06)_0%,transparent_60%)]" />
                {/* Subtle grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-container text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-border bg-background-secondary/50 backdrop-blur-sm animate-fade-in">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" aria-hidden="true" />
                    <span className="text-foreground-secondary text-xs md:text-sm font-medium tracking-wide">
                        Premium Software Engineering
                    </span>
                </div>

                {/* H1 — only h1 on the page */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto animate-fade-in-up">
                    Premium software development for businesses, startups and product teams.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground-secondary text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    Brynex Labs builds reliable websites, business systems, SaaS products and AI-powered software — from small improvements to large-scale platforms.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button href="#contact" variant="primary" size="lg">
                        Start a project
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                    <Button href="#contact" variant="secondary" size="lg">
                        Talk to an expert
                    </Button>
                </div>
            </div>

            {/* Bottom fade to content */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
                aria-hidden="true"
            />
        </section>
    );
}
