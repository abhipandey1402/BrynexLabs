import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// BRYNEX monogram — mirrors the header wordmark and OG image:
// dark base, extrabold white "B", orange accent bar.
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1210 100%)',
                    borderRadius: 14,
                    position: 'relative',
                }}
            >
                <span
                    style={{
                        color: '#ffffff',
                        fontSize: 42,
                        fontWeight: 800,
                        letterSpacing: -2,
                        marginTop: -4,
                    }}
                >
                    B
                </span>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 16,
                        right: 16,
                        height: 5,
                        borderRadius: 3,
                        background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #f59e0b 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        size,
    );
}
