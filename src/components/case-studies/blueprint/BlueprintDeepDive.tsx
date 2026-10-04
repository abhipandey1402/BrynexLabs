import SectionWrapper from '../../SectionWrapper';
import RoadmapGantt from './RoadmapGantt';
import ReferralFlow from './ReferralFlow';
import AutonomyLadder from './AutonomyLadder';
import EvalCycle from './EvalCycle';
import RiskRegister from './RiskRegister';
import StorySection, { slugify } from '../StorySection';
import type { BlueprintDeepDive as Data } from '@/data/blueprint-types';

/** Anchor ids for the deep-dive sections, in page order. Used by the page's "On this page" list. */
export const blueprintSections = (d: Data) => [
    { id: 'roadmap', label: d.roadmapHeading },
    { id: 'referral-flow', label: d.flowHeading },
    { id: 'autonomy', label: d.autonomyHeading },
    { id: 'evaluation', label: d.evalHeading },
    { id: 'risks', label: d.riskHeading },
    ...d.narrative.map((n) => ({ id: slugify(n.heading), label: n.heading })),
];

function Head({ title, intro }: { title: string; intro: string }) {
    return (
        <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:items-start">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{title}</h2>
            <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{intro}</p>
        </div>
    );
}

/** The roadmap section of a platform study: each part has its own diagram, followed by the written plan. */
export default function BlueprintDeepDive({ data }: { data: Data }) {
    return (
        <>
            <SectionWrapper animate={false} id="roadmap" ariaLabel={data.roadmapHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.roadmapHeading} intro={data.roadmapIntro} />
                <RoadmapGantt roadmap={data.roadmap} />
            </SectionWrapper>

            <SectionWrapper animate={false} id="referral-flow" ariaLabel={data.flowHeading} className="scroll-mt-24">
                <Head title={data.flowHeading} intro={data.flowIntro} />
                <ReferralFlow steps={data.flow} />
            </SectionWrapper>

            <SectionWrapper animate={false} id="autonomy" ariaLabel={data.autonomyHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.autonomyHeading} intro={data.autonomyIntro} />
                <AutonomyLadder rows={data.autonomy} />
            </SectionWrapper>

            <SectionWrapper animate={false} id="evaluation" ariaLabel={data.evalHeading} className="scroll-mt-24">
                <Head title={data.evalHeading} intro={data.evalIntro} />
                <EvalCycle steps={data.evalLoop} />
            </SectionWrapper>

            <SectionWrapper animate={false} id="risks" ariaLabel={data.riskHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.riskHeading} intro={data.riskIntro} />
                <RiskRegister risks={data.risks} />
            </SectionWrapper>

            <SectionWrapper animate={false} ariaLabel="The roadmap in detail" className="scroll-mt-24">
                <div className="mx-auto max-w-3xl space-y-16">
                    {data.narrative.map((section) => (
                        <StorySection key={section.heading} section={section} />
                    ))}
                </div>
            </SectionWrapper>
        </>
    );
}
