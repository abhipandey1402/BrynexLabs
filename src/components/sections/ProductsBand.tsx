import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import { BrowserFrame } from '../DeviceFrame';
import ClinizyLogo, { CLINIZY_GREEN_TEXT } from '../ClinizyLogo';
import AIFeatureShowcase from '../AIFeatureShowcase';
import { CLINIZY } from '@/data/products';

/**
 * "Our products" band — directly after the hero. Follows the Brynex theme
 * (light/dark tokens, orange accent); Clinizy green appears only inside
 * Clinizy's own card and its AI pipeline.
 */
export default function ProductsBand() {
    const dashboard = CLINIZY.screenshots.dashboard;
    const green = CLINIZY.brandGreen;

    return (
        <SectionWrapper id="products" ariaLabel="Our products" className="relative overflow-hidden border-y border-border bg-background-secondary/50">
            {/* Accent glow — the studio's colour behind the product */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-accent-glow opacity-70" aria-hidden="true" />

            <div className="relative">
                <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                            </span>
                            Our products · AI-powered, built and run by Brynex Labs
                        </span>
                        <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
                            Built here. Running in the real world.
                        </h2>
                    </div>
                    <p className="max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg lg:col-span-5">
                        Before we build software for anyone else, we build and run our own. Clinizy Care is the first
                        product out of the studio: AI-powered hospital software, live today.
                    </p>
                </div>

                {/* Clinizy Care card — the only place Clinizy green appears */}
                <article
                    className="grid overflow-hidden rounded-3xl border border-border bg-background-card shadow-card transition-shadow duration-500 hover:shadow-card-hover lg:grid-cols-12"
                    aria-labelledby="clinizy-card-heading"
                >
                    <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
                        <h3 id="clinizy-card-heading">
                            <ClinizyLogo className="w-[168px] sm:w-[200px]" />
                        </h3>
                        <p className="mt-2 text-sm font-medium text-foreground-muted">{CLINIZY.category}</p>

                        <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">{CLINIZY.summary}</p>

                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Clinizy Care at a glance">
                            {CLINIZY.proofChips.map((chip) => (
                                <li
                                    key={chip}
                                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${CLINIZY_GREEN_TEXT}`}
                                    style={{ borderColor: `${green}40`, backgroundColor: `${green}14` }}
                                >
                                    {chip}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center lg:mt-auto">
                            <a
                                href={CLINIZY.homeUrl}
                                target="_blank"
                                rel="noopener"
                                className="group inline-flex items-center justify-center gap-2 rounded-button px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{ backgroundColor: green, outlineColor: green, boxShadow: `0 8px 24px -10px ${green}` }}
                            >
                                Explore Clinizy Care
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <Link
                                href="/products/clinizy-care"
                                className="inline-flex items-center justify-center px-2 py-3 text-base font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                            >
                                How we built it
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex items-center p-5 sm:p-8 lg:col-span-7 lg:p-10" style={{ backgroundColor: `${green}12` }}>
                        {dashboard ? (
                            <div className="relative w-full">
                                <BrowserFrame shot={dashboard} address="clinizy.in/dashboard" sizes="(min-width: 1024px) 52vw, 100vw" className="w-full" />
                                {/* Floating AI badge — labelled with Bol's real status */}
                                <div className="absolute -bottom-3 left-3 flex items-center gap-3 rounded-2xl border border-border bg-background-card/95 px-4 py-3 shadow-card-hover backdrop-blur motion-safe:animate-float sm:-bottom-4 sm:left-6">
                                    <span className="flex h-6 items-center gap-[3px]" aria-hidden="true">
                                        {[0.5, 1, 0.7, 0.9, 0.4].map((h, i) => (
                                            <span key={i} className="w-1 rounded-full motion-safe:animate-wave" style={{ height: `${h * 100}%`, backgroundColor: green, animationDelay: `${i * 0.12}s` }} />
                                        ))}
                                    </span>
                                    <span className="text-left">
                                        <span className="block text-sm font-semibold text-foreground">
                                            <span lang="hi" className="text-accent">{CLINIZY.bol.nameHi}</span> {CLINIZY.bol.name} · AI clinical notes
                                        </span>
                                        <span className="block text-xs text-foreground-muted">{CLINIZY.bol.status}</span>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <ol className="grid w-full grid-cols-1 gap-x-8 gap-y-3 text-foreground sm:grid-cols-2">
                                {CLINIZY.modules.map((module) => (
                                    <li key={module} className="border-b border-border pb-3 text-base font-medium">
                                        {module}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>

                    {/* AI + Autopilot, compact and animated — still inside Clinizy's card */}
                    <div className="border-t border-border p-6 sm:p-8 lg:col-span-12 lg:p-10">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                            <h4 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">The AI inside Clinizy Care</h4>
                            <p className="text-sm text-foreground-muted">Bol is in early access. Five more are on the roadmap, and 24 automations run today.</p>
                        </div>
                        <AIFeatureShowcase />
                    </div>
                </article>
            </div>
        </SectionWrapper>
    );
}
