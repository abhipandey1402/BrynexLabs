import { ImageResponse } from 'next/og';

// A dedicated 512×512 brand logo (distinct from the favicon/apple-icon) so
// Organization.logo and publisher marks reference a real, purpose-built asset.
export const runtime = 'edge';

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1210 100%)',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: 104, fontWeight: 800, color: '#ffffff', letterSpacing: -4, lineHeight: 1 }}>
                        BRYNEX
                    </span>
                    <span style={{ fontSize: 34, fontWeight: 700, color: '#ea580c', letterSpacing: 26, marginTop: 6 }}>
                        LABS
                    </span>
                </div>
                <div
                    style={{
                        marginTop: 44,
                        width: 240,
                        height: 10,
                        borderRadius: 9999,
                        background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #f59e0b 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        { width: 512, height: 512 },
    );
}
