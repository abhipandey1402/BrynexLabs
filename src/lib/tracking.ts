/**
 * Core Telemetry & Tracking Utility
 * Safely triggers conversion events across all loaded tracking pixels (GA4, Meta).
 * Fails gracefully if adblockers block the tracking scripts.
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    try {
        // 1. Google Analytics 4 (gtag)
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', eventName, params);
        }

        // 2. Meta Pixel (fbq)
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
            // Meta natively supports Standard Events (like 'Lead', 'Contact') or Custom Events.
            // If the event name isn't a standard Meta event, we map it as a custom event natively.
            const standardMetaEvents = ['AddPaymentInfo', 'AddToCart', 'CompleteRegistration', 'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout', 'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication', 'Subscribe', 'ViewContent'];
            
            if (standardMetaEvents.includes(eventName)) {
                (window as any).fbq('track', eventName, params);
            } else {
                (window as any).fbq('trackCustom', eventName, params);
            }
        }
    } catch (error) {
        // Silently fail if tracking is physically blocked locally by PiHole/Brave/uBlock.
        console.warn('Telemetry blocker explicitly prevented tracking event:', eventName);
    }
};

/**
 * High-Level Conversion Shortcuts
 */

export const trackConversion_StartProjectClick = (source: string) => {
    trackEvent('conversion', {
        send_to: 'AW-PROJ', // Optional: Specific Google Ads conversion label if run later
        event_category: 'engagement',
        event_label: 'Start Project Click',
        button_location: source
    });
    // Meta Mapping
    trackEvent('Lead', { content_name: 'Start Project Triggered', content_category: source });
};

export const trackConversion_FormSubmit = () => {
    trackEvent('generate_lead', {
        event_category: 'form',
        event_label: 'Contact Form Successfully Submitted'
    });
    // Meta Mapping
    trackEvent('Contact', { content_name: 'Contact Modal Completed' });
};

export const trackConversion_ServiceView = (serviceName: string) => {
    trackEvent('view_service', {
        event_category: 'engagement',
        event_label: serviceName
    });
    // Meta Mapping
    trackEvent('ViewContent', { content_name: serviceName, content_category: 'Service Page' });
};
