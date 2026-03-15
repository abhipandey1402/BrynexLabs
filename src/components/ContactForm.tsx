'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface ContactFormProps {
    onSuccess?: () => void;
    className?: string;
    isModal?: boolean;
}

export default function ContactForm({ onSuccess, className = '', isModal = false }: ContactFormProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectDetails: '',
        date: '',
        time: '',
    });
    const [userTimezone, setUserTimezone] = useState('');

    useEffect(() => {
        // Detect timezone
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimezone(zone);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/contact', {
                ...formData,
                timezone: userTimezone,
            });

            setStep('success');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Handled error in component:', error);
            alert('Failed to send request. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (step === 'success') {
        return (
            <div className={`text-center py-6 ${className}`}>
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">You&apos;re all set!</h3>
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                    A Software Expert from our team will contact you within <span className="font-semibold text-foreground">6 business hours</span> to confirm your slot.
                </p>
                <div className="bg-background-secondary rounded-xl p-4 text-sm text-foreground-secondary mb-6 border border-border">
                    <p>Requested: <span className="font-medium text-foreground">{formData.date}</span> at <span className="font-medium text-foreground">{formData.time}</span></p>
                    <p className="text-xs text-foreground-muted mt-1">{userTimezone}</p>
                </div>
                {!isModal && (
                    <button
                        onClick={() => setStep('form')}
                        className="text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                        Send another message
                    </button>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted"
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
                    className="w-full px-4 py-2.5 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                    Phone Number
                </label>
                <div className="contact-phone-input">
                    <PhoneInput
                        defaultCountry="us"
                        value={formData.phone}
                        onChange={(phone) => setFormData({ ...formData, phone })}
                    />
                </div>
                <style jsx global>{`
                    .contact-phone-input .react-international-phone-input-container {
                        width: 100%;
                    }
                    .contact-phone-input .react-international-phone-input {
                        width: 100%;
                        background-color: var(--background-secondary) !important; 
                        color: var(--foreground) !important;
                        border-color: var(--border) !important;
                        border-radius: 0 8px 8px 0 !important;
                        height: 42px !important;
                    }
                    .contact-phone-input .react-international-phone-country-selector-button {
                        background-color: var(--background-secondary) !important;
                        border-color: var(--border) !important;
                        border-radius: 8px 0 0 8px !important;
                        border-right: none !important;
                        height: 42px !important;
                    }
                    .contact-phone-input .react-international-phone-country-selector-button:hover {
                        background-color: var(--background-tertiary) !important;
                    }
                    .contact-phone-input .react-international-phone-country-selector-dropdown {
                        background-color: var(--background-card) !important;
                        color: var(--foreground) !important;
                        border: 1px solid var(--border-hover) !important;
                        z-index: 100;
                    }
                `}</style>
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
                        className="w-full px-4 py-2.5 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground"
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
                        className="w-full px-4 py-2.5 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                </div>
            </div>

            {userTimezone && (
                <p className="text-[10px] text-foreground-muted uppercase tracking-widest">
                    Timezone: <span className="text-accent font-bold italic">{userTimezone}</span>
                </p>
            )}

            <div>
                <label htmlFor="details" className="block text-sm font-medium text-foreground-secondary mb-1.5">
                    Project Details (Optional)
                </label>
                <textarea
                    id="details"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-foreground-muted resize-none"
                    placeholder="Tell us about your product vision, challenges, or goals..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        Confirm Schedule
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}
