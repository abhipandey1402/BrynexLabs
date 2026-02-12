'use client';

import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import CTABlock from '../CTABlock';
import ContactModal from '../ContactModal';

export default function FinalCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <SectionWrapper id="contact" ariaLabel="Contact us">
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="relative">
                {/* Background glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-glow-strong pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative z-10 py-8 md:py-12">
                    <CTABlock
                        title="Ready to build something exceptional?"
                        body="Whether you need a new product, a system overhaul, or AI integration—we have the engineering talent to make it happen."
                        buttonText="Start a project"
                        buttonHref="#contact"
                        onButtonClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}
