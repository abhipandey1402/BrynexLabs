import SectionWrapper from '../../SectionWrapper';
import RoadmapGantt from './RoadmapGantt';
import ReferralFlow from './ReferralFlow';
import AutonomyLadder from './AutonomyLadder';
import EvalCycle from './EvalCycle';
import RiskRegister from './RiskRegister';
import type { BlueprintDeepDive as Data } from '@/data/blueprint-types';

/** Anchor ids for the deep-dive sections, in page order. Used by the page's "On this page" list. */
export const blueprintSections = (d: Data) => [
    { id: 'roadmap', label: d.roadmapHeading },
    { id: 'referral-flow', label: d.flowHeading },
    { id: 'autonomy', label: d.autonomyHeading },
    { id: 'evaluation', label: d.evalHeading },
    { id: 'risks', label: d.riskHeading },
];

function Head({ title, intro }: { title: string; intro: string }) {
    return (
        <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:items-start">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{title}</h2>
            <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{intro}</p>
        </div>
    );
}

/** The long-horizon sections of a platform blueprint, each with its own diagram. */
export default function BlueprintDeepDive({ data }: { data: Data }) {
    return (
        <>
            <SectionWrapper id="roadmap" ariaLabel={data.roadmapHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.roadmapHeading} intro={data.roadmapIntro} />
                <RoadmapGantt roadmap={data.roadmap} />
            </SectionWrapper>

            <SectionWrapper id="referral-flow" ariaLabel={data.flowHeading} className="scroll-mt-24">
                <Head title={data.flowHeading} intro={data.flowIntro} />
                <ReferralFlow steps={data.flow} />
            </SectionWrapper>

            <SectionWrapper id="autonomy" ariaLabel={data.autonomyHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.autonomyHeading} intro={data.autonomyIntro} />
                <AutonomyLadder rows={data.autonomy} />
            </SectionWrapper>

            <SectionWrapper id="evaluation" ariaLabel={data.evalHeading} className="scroll-mt-24">
                <Head title={data.evalHeading} intro={data.evalIntro} />
                <EvalCycle steps={data.evalLoop} />
            </SectionWrapper>

            <SectionWrapper id="risks" ariaLabel={data.riskHeading} className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                <Head title={data.riskHeading} intro={data.riskIntro} />
                <RiskRegister risks={data.risks} />
            </SectionWrapper>
        </>
    );
}
