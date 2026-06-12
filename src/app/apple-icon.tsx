import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon — full-bleed (iOS applies its own corner radius).
export default function AppleIcon() {
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
                    position: 'relative',
                }}
            >
                <span
                    style={{
                        color: '#ffffff',
                        fontSize: 110,
                        fontWeight: 800,
                        letterSpacing: -6,
                        marginTop: -12,
                    }}
                >
                    B
                </span>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 26,
                        left: 44,
                        right: 44,
                        height: 12,
                        borderRadius: 6,
                        background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #f59e0b 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        size,
    );
}
