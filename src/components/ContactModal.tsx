import { useState } from 'react';
import ContactForm from './ContactForm';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [title, setTitle] = useState('Schedule a Consultation');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                className="
                    relative z-10 w-full max-w-xl 
                    bg-background-card/90 backdrop-blur-2xl border border-border/80 rounded-xl shadow-2xl
                    flex flex-col max-h-[90vh] overflow-hidden
                    animate-in fade-in zoom-in-95 duration-300 ease-out
                "
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">
                        {title}
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
                    <ContactForm 
                        isModal 
                        onSuccess={() => setTitle('Request Received')}
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
    );
}
