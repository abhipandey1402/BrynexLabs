'use client';

import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import Portal from './Portal';
import { trackConversion_FormSubmit } from '@/lib/tracking';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [title, setTitle] = useState('Schedule a Consultation');

    // Close on Escape and lock body scroll while the modal is open.
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">

                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Modal Content */}
                <div
                    className="
                        relative z-10 w-full max-w-xl
                        bg-background-card border border-border rounded-2xl shadow-2xl
                        flex flex-col max-h-[96vh] overflow-hidden
                        animate-in fade-in zoom-in-95 duration-300 ease-out
                    "
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-modal-title"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border shrink-0">
                        <h2 id="contact-modal-title" className="text-xl font-bold text-foreground">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="-mr-1.5 shrink-0 text-foreground-secondary hover:text-foreground hover:bg-background-secondary rounded-lg transition-colors p-1.5"
                            aria-label="Close modal"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
                        <ContactForm
                            isModal
                            onSuccess={() => {
                                trackConversion_FormSubmit();
                                setTitle('Request Received');
                            }}
                        />

                        {title === 'Request Received' && (
                            <button
                                onClick={onClose}
                                className="w-full mt-4 py-2.5 px-4 bg-background-card hover:bg-background-secondary border border-border text-foreground font-medium rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    );
}
