import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Brynex Labs — AI Agent Development & Custom Software Company';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1210 100%)',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -200,
                        right: -100,
                        width: 600,
                        height: 600,
                        borderRadius: 9999,
                        background: 'radial-gradient(circle, rgba(194,65,12,0.35) 0%, rgba(194,65,12,0) 70%)',
                        display: 'flex',
                    }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 96, fontWeight: 800, color: '#ffffff', letterSpacing: -4 }}>BRYNEX</span>
                    </div>
                    <span style={{ fontSize: 28, fontWeight: 700, color: '#c2410c', letterSpacing: 18, marginTop: 4 }}>LABS</span>
                    <span style={{ fontSize: 30, color: '#a3a3a3', marginTop: 48 }}>
                        AI Agent Development · Custom Software · SaaS SEO
                    </span>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 10,
                        background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #f59e0b 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        size,
    );
}
