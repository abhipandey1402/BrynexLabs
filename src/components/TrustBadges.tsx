import React from 'react';

export default function TrustBadges() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-5 opacity-80 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center text-xs sm:text-sm font-medium text-foreground-secondary gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                100% Secure
            </div>
            <div className="flex items-center text-xs sm:text-sm font-medium text-foreground-secondary gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                NDA Protected
            </div>
            <div className="flex items-center text-xs sm:text-sm font-medium text-foreground-secondary gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                24h Response
            </div>
        </div>
    );
}
