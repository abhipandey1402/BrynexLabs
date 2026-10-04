import type { CaseIconKey } from '@/components/case-studies/CaseIcon';
import type { CaseStudySection } from './case-studies';

/**
 * Types for the long-horizon "looking ahead" section of a platform case study:
 * a quarterly roadmap, a cross-product flow, autonomy ceilings, an evaluation
 * loop and a risk register. This is the PLAN for the next phase; what is
 * already built lives in the rest of the study.
 */

export type RoadmapStage = 'Build' | 'Harden' | 'Design' | 'Pilot' | 'Rollout' | 'Operate';

/** A run of quarters (1-based, inclusive) spent in one stage. */
export interface RoadmapSegment {
    stage: RoadmapStage;
    from: number;
    to: number;
}

export interface RoadmapItem {
    label: string;
    /** True when the item is a new AI agent. Its first Rollout quarter is when it counts as in production. */
    agent?: boolean;
    segments: RoadmapSegment[];
}

export interface RoadmapLane {
    name: string;
    icon: CaseIconKey;
    items: RoadmapItem[];
}

export interface Roadmap {
    /** Number of quarters shown (eight for a two-year view). */
    quarters: number;
    /** AI agents already live at the start of the plan. */
    baselineAgents: number;
    lanes: RoadmapLane[];
}

export interface FlowStep {
    title: string;
    /** Which product (or the person) does this step. */
    owner: string;
    actor: 'Agent' | 'Engine' | 'Person';
    status: 'Live' | 'Roadmap' | 'Human';
    detail: string;
    icon: CaseIconKey;
}

/** How much a single agent may do on its own. 0 = no model, 1 = suggests, 2 = drafts for approval, 3 = acts within limits. */
export type AutonomyLevel = 0 | 1 | 2 | 3;

export interface AutonomyRow {
    agent: string;
    product: string;
    ceiling: AutonomyLevel;
    status: 'Live' | 'Roadmap';
    note: string;
}

export interface EvalStep {
    title: string;
    detail: string;
    icon: CaseIconKey;
}

export interface RiskRow {
    risk: string;
    scenario: string;
    control: string;
    kind: 'Prevent' | 'Detect' | 'Contain';
}

export interface BlueprintDeepDive {
    roadmapHeading: string;
    roadmapIntro: string;
    roadmap: Roadmap;
    flowHeading: string;
    flowIntro: string;
    flow: FlowStep[];
    autonomyHeading: string;
    autonomyIntro: string;
    autonomy: AutonomyRow[];
    evalHeading: string;
    evalIntro: string;
    evalLoop: EvalStep[];
    riskHeading: string;
    riskIntro: string;
    risks: RiskRow[];
    /** Written sections that go with the diagrams: why two years, operating model, cost and scale, and so on. */
    narrative: CaseStudySection[];
}
