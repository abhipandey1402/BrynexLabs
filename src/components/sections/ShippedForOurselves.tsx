import Link from 'next/link';
import { SHIPPED_FOR_OURSELVES } from '@/data/products';

/**
 * Maps each service we sell to where it already runs in our own product.
 * One divided container rather than four floating cards: the content is a
 * mapping (service → proof), so the structure shows the mapping.
 */
export default function ShippedForOurselves() {
    return (
        <section aria-labelledby="shipped-heading" className="px-6 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-container">
                <div className="mb-10 max-w-3xl md:mb-14">
                    <h2 id="shipped-heading" className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                        Shipped for ourselves first
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-foreground-secondary md:text-xl">
                        We don&apos;t just sell engineering hours. We run a live SaaS ourselves: multi-tenant, AI,
                        WhatsApp automation and SEO. Every service we sell, we&apos;ve already shipped for ourselves.
                    </p>
                </div>

                <ul className="grid divide-y divide-border rounded-2xl border border-border bg-background-card md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
                    {SHIPPED_FOR_OURSELVES.map((item, index) => (
                        <li
                            key={item.service}
                            className={`flex flex-col p-7 lg:p-8 ${index < 2 ? 'md:border-b md:border-border lg:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r md:border-border lg:border-r-0' : ''}`}
                        >
                            <Link
                                href={item.serviceHref}
                                className="self-start text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                            >
                                {item.service}
                            </Link>
                            <span className="my-3 ml-[3px] block h-6 w-px bg-border" aria-hidden="true" />
                            <h3 className="text-xl font-bold tracking-tight text-foreground">
                                {item.proof}
                                {item.status && (
                                    <span className="ml-2 inline-block translate-y-[-2px] rounded-full border border-border px-2 py-0.5 align-middle text-xs font-semibold text-foreground-secondary">
                                        {item.status}
                                    </span>
                                )}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{item.detail}</p>
                        </li>
                    ))}
                </ul>

                <p className="mt-6 text-sm text-foreground-muted">
                    Proof lives in production:{' '}
                    <Link href="/case-studies/clinizy-care" className="font-semibold text-foreground hover:text-accent transition-colors">
                        read the Clinizy Care case study
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
