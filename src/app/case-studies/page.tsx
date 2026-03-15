import { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import { caseStudies } from '@/data/case-studies';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Success Stories & Case Studies | Brynex Labs',
    description: 'Explore how Brynex Labs helps startups and enterprises ship production-grade software through real-world examples of our work.',
};

export default function CaseStudiesIndex() {
    return (
        <div className="pt-24 pb-16">
            <SectionWrapper>
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tighter">
                        Success <span className="text-accent italic">Stories.</span>
                    </h1>
                    <p className="text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                        We don&apos;t just build features; we engineer outcomes. Here&apos;s a look at how we&apos;ve helped our partners scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudies.map((project) => (
                        <Link 
                            key={project.slug} 
                            href={`/case-studies/${project.slug}`}
                            className="group relative bg-background-card rounded-[32px] border border-border overflow-hidden hover:border-accent/40 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[16/9] bg-background-secondary relative overflow-hidden">
                                <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                     <div className="px-6 py-2 rounded-full bg-accent text-white font-bold text-sm shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-500">
                                        View Case Study
                                     </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <div className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                                    {project.clientName}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h2>
                                <p className="text-foreground-secondary leading-relaxed mb-8 flex-grow">
                                    {project.summary}
                                </p>
                                
                                <div className="flex items-center gap-6 pt-6 border-t border-border">
                                    {project.results.slice(0, 2).map((result) => (
                                        <div key={result.label}>
                                            <div className="text-xl font-bold text-foreground">{result.value}</div>
                                            <div className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">{result.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
