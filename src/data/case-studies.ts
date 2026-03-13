export interface CaseStudy {
    slug: string;
    title: string;
    clientName: string;
    summary: string;
    heroImage: string;
    seo: {
        title: string;
        metaDescription: string;
    };
    problem: string;
    solution: string;
    techStack: { name: string; icon: string }[];
    results: { label: string; value: string }[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'echopad-medical-data-management',
        title: 'Transforming Medical Data Management with High-Performance Architecture',
        clientName: 'Echopad',
        summary: 'Built a specialized platform for medical professionals to securely manage, analyze, and share critical patient data with zero latency.',
        heroImage: '/images/case-studies/echopad-hero.jpg',
        seo: {
            title: 'Echopad Case Study: Medical Data Management | Brynex Labs',
            metaDescription: 'Learn how Brynex Labs built Echopad, a high-performance, secure medical data management platform with real-time sync and enterprise security.',
        },
        problem: 'Medical staff faced significant delays and security risks using legacy systems for patient data. They needed a zero-latency solution that complied with strict HIPAA-like standards while remaining intuitive for non-technical users.',
        solution: 'Brynex Labs architected a modern, React-based frontend with a robust Node.js backend. We implemented real-time data synchronization, advanced encryption at rest and in transit, and a specialized UI designed for high-pressure medical environments.',
        techStack: [
            { name: 'React', icon: 'React' },
            { name: 'Node.js', icon: 'Node' },
            { name: 'PostgreSQL', icon: 'DB' },
            { name: 'Socket.io', icon: 'WS' },
            { name: 'AWS', icon: 'AWS' },
            { name: 'Docker', icon: 'Docker' },
        ],
        results: [
            { label: 'Latency Reduction', value: '85%' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Onboarding Speed', value: '3x Faster' },
            { label: 'Security Breaches', value: 'Zero' },
        ],
        testimonial: {
            quote: 'Brynex Labs didn\'t just build a tool; they engineered a critical piece of our infrastructure that saves our team hours every day.',
            author: 'John Doe',
            role: 'Product Lead, Echopad',
        },
    },
    {
        slug: 'enterprise-saas-scalability-overhaul',
        title: 'Scaling an Enterprise SaaS Platform to 1M+ Monthly Active Users',
        clientName: 'CloudScale Solutions',
        summary: 'Modernized a monolithic architecture into a microservices-based system to support rapid growth and improved deployment cycles.',
        heroImage: '/images/case-studies/saas-hero.jpg',
        seo: {
            title: 'Scaling Enterprise SaaS Case Study | Brynex Labs',
            metaDescription: 'How Brynex Labs modernized a monolithic SaaS platform into a scalable microservices architecture, supporting 1M+ active users.',
        },
        problem: 'A rapidly growing SaaS company was crippled by its monolithic architecture. Deployments took hours, downtime was frequent, and the system could no longer handle concurrent user spikes.',
        solution: 'We orchestrated a phased migration to a microservices architecture using Kubernetes. We implemented automated CI/CD pipelines, horizontal auto-scaling, and a centralized monitoring system to ensure early detection of bottlenecks.',
        techStack: [
            { name: 'Go', icon: 'Go' },
            { name: 'Kubernetes', icon: 'K8s' },
            { name: 'Terraform', icon: 'Terra' },
            { name: 'Redis', icon: 'Redis' },
            { name: 'GCP', icon: 'GCP' },
            { name: 'GitHub Actions', icon: 'CI' },
        ],
        results: [
            { label: 'Deployment Speed', value: '10x Faster' },
            { label: 'Error Rate Reduction', value: '70%' },
            { label: 'Infrastructure Savings', value: '25%' },
            { label: 'User Capacity', value: 'Infinite Scale' },
        ],
        testimonial: {
            quote: 'The transition was seamless. We went from being afraid to ship code to deploying multiple times a day with complete confidence.',
            author: 'Sarah Smith',
            role: 'VP of Engineering, CloudScale',
        },
    },
];
