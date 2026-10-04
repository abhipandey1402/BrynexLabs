import {
    AudioLines,
    BarChart3,
    Bell,
    Bot,
    Brain,
    CalendarCheck,
    ClipboardCheck,
    Cpu,
    Database,
    FileOutput,
    FileSearch,
    FileText,
    GraduationCap,
    Inbox,
    Languages,
    Layers,
    Lightbulb,
    ListChecks,
    Mic,
    MessageCircle,
    Network,
    Phone,
    Pill,
    Radar,
    ScanText,
    Search,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    TrendingUp,
    UsersRound,
    Workflow,
    type LucideIcon,
} from 'lucide-react';

/**
 * Icon keys used by case-study data. Data files stay free of React imports;
 * this registry maps a key to a lucide icon.
 */
export type CaseIconKey =
    | 'audio'
    | 'bell'
    | 'bot'
    | 'brain'
    | 'calendar'
    | 'checklist'
    | 'chart'
    | 'cpu'
    | 'database'
    | 'file'
    | 'file-out'
    | 'file-search'
    | 'graduation'
    | 'inbox'
    | 'languages'
    | 'layers'
    | 'idea'
    | 'mic'
    | 'message'
    | 'network'
    | 'phone'
    | 'pill'
    | 'radar'
    | 'scan'
    | 'search'
    | 'shield'
    | 'sparkles'
    | 'stethoscope'
    | 'trend'
    | 'users'
    | 'workflow'
    | 'review';

const ICONS: Record<CaseIconKey, LucideIcon> = {
    audio: AudioLines,
    bell: Bell,
    bot: Bot,
    brain: Brain,
    calendar: CalendarCheck,
    checklist: ListChecks,
    chart: BarChart3,
    cpu: Cpu,
    database: Database,
    file: FileText,
    'file-out': FileOutput,
    'file-search': FileSearch,
    graduation: GraduationCap,
    inbox: Inbox,
    languages: Languages,
    layers: Layers,
    idea: Lightbulb,
    mic: Mic,
    message: MessageCircle,
    network: Network,
    phone: Phone,
    pill: Pill,
    radar: Radar,
    scan: ScanText,
    search: Search,
    shield: ShieldCheck,
    sparkles: Sparkles,
    stethoscope: Stethoscope,
    trend: TrendingUp,
    users: UsersRound,
    workflow: Workflow,
    review: ClipboardCheck,
};

export default function CaseIcon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }: { name: CaseIconKey; className?: string; strokeWidth?: number }) {
    const Icon = ICONS[name];
    return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
