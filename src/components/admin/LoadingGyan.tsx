'use client';

import { useEffect, useState } from 'react';

const QUOTES = [
    { text: 'Speed to lead is everything — reply within 5 minutes and you\'re 8x more likely to win the deal.', tag: 'Sales Gyan' },
    { text: 'The fortune is in the follow-up. Most deals close after the 5th touch — most reps stop at 2.', tag: 'Pipeline Wisdom' },
    { text: 'A lead marked "lost" with a good note is a deal waiting for round two.', tag: 'CRM Gyan' },
    { text: 'Clients buy confidence first, code second.', tag: 'Founder Mode' },
    { text: 'Don\'t count your leads. Make your leads count.', tag: 'Daily Reminder' },
    { text: 'Qualify harder, not pitch harder — win rates live in the "Not a Fit" column.', tag: 'Sales Gyan' },
    { text: 'Every "no" is data. Log it in the notes.', tag: 'CRM Gyan' },
    { text: 'Slow replies kill more deals than high prices ever will.', tag: 'Hard Truth' },
    { text: 'Your pipeline is a garden — water it every single morning.', tag: 'Daily Reminder' },
    { text: 'Ship daily. Sell weekly. Review monthly.', tag: 'Founder Mode' },
    { text: 'Revenue loves rhythm: same time, same follow-ups, every day.', tag: 'Pipeline Wisdom' },
    { text: 'The best marketing is a client who can\'t stop talking about you.', tag: 'Hard Truth' },
];

/**
 * Rotating motivation strip for admin loading states. Starts at a random
 * quote and advances with a fade so even short loads feel alive.
 */
export default function LoadingGyan() {
    const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % QUOTES.length);
                setVisible(true);
            }, 250);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const quote = QUOTES[index];

    return (
        <div className="rounded-2xl border border-border bg-background-card px-6 py-5 overflow-hidden relative">
            {/* animated accent shimmer */}
            <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden" aria-hidden>
                <div
                    className="h-full w-1/3 bg-accent-gradient rounded-full"
                    style={{ animation: 'gyan-slide 1.6s ease-in-out infinite' }}
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center" aria-hidden>
                    <svg className="animate-spin text-accent" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
                <div
                    className="min-w-0 transition-opacity duration-300"
                    style={{ opacity: visible ? 1 : 0 }}
                    aria-live="polite"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">{quote.tag}</p>
                    <p className="text-sm font-semibold text-foreground-secondary leading-snug">{quote.text}</p>
                </div>
            </div>
            <style>{`
                @keyframes gyan-slide {
                    0% { transform: translateX(-120%); }
                    100% { transform: translateX(420%); }
                }
            `}</style>
        </div>
    );
}
