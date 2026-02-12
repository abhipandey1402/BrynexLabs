'use client';

import { useState, useEffect } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectDetails: '',
        date: '',
        time: '',
    });
    const [userTimezone, setUserTimezone] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset state when modal opens
            setStep('form');
            setFormData({ name: '', email: '', projectDetails: '', date: '', time: '' });
            setIsLoading(false);
            // Detect timezone
            const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setUserTimezone(zone);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setStep('success');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                className="
                    relative z-10 w-full max-w-lg 
                    bg-background-card border border-border rounded-xl shadow-2xl
                    flex flex-col max-h-[90vh] overflow-hidden
                    animate-in fade-in zoom-in-95 duration-200
                "
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">
                        {step === 'form' ? 'Schedule a Consultation' : 'Request Received'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-foreground-secondary hover:text-foreground transition-colors p-1"
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {step === 'form' ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                                    Work Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        required
                                        className="w-full px-3 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                                        Preferred Time
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        required
                                        className="w-full px-3 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            {userTimezone && (
                                <p className="text-xs text-foreground-muted">
                                    Times are shown in your local timezone: <span className="text-accent">{userTimezone}</span>
                                </p>
                            )}

                            <div>
                                <label htmlFor="details" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                                    Project Details (Optional)
                                </label>
                                <textarea
                                    id="details"
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted resize-none"
                                    placeholder="Tell us a bit about what you're building..."
                                    value={formData.projectDetails}
                                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Confirm Schedule'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">You&apos;re all set!</h3>
                            <p className="text-foreground-secondary mb-6 leading-relaxed">
                                A Software Expert from our team will contact you within <span className="font-semibold text-foreground">12 hours</span> to confirm your slot.
                            </p>
                            <div className="bg-background-secondary rounded-lg p-4 text-sm text-foreground-secondary mb-6">
                                <p>Requested: <span className="font-medium text-foreground">{formData.date}</span> at <span className="font-medium text-foreground">{formData.time}</span></p>
                                <p className="text-xs text-foreground-muted mt-1">{userTimezone}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 px-4 bg-background-card hover:bg-background-secondary border border-border text-foreground font-medium rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
