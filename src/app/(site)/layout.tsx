import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

/**
 * Public website chrome. Admin routes (/super-admin, served as
 * admin.<domain>) live outside this group and never render it.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Skip to content link for accessibility */}
            <a href="#main-content" className="skip-to-content">
                Skip to main content
            </a>

            <Navbar />

            <main id="main-content" role="main">
                {children}
            </main>

            <StickyCTA />
            <Footer />
        </>
    );
}
