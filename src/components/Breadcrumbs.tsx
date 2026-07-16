import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
    return (
        <nav aria-label="Breadcrumb" className={className ?? 'mx-auto max-w-container px-6 md:px-8'}>
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground-muted">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                            {index > 0 && <span aria-hidden="true" className="text-border">/</span>}
                            {item.href && !isLast ? (
                                <Link href={item.href} className="hover:text-accent transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-foreground-secondary' : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
