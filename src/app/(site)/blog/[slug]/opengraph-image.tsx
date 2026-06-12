import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blogService';

export const alt = 'Brynex Labs Engineering Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    const title = post?.title ?? 'Engineering Insights';
    const category = post?.category ?? 'Blog';
    const readTime = post?.readTime ?? '';

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1210 100%)',
                    padding: 72,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: -250,
                        right: -150,
                        width: 700,
                        height: 700,
                        borderRadius: 9999,
                        background: 'radial-gradient(circle, rgba(194,65,12,0.3) 0%, rgba(194,65,12,0) 70%)',
                        display: 'flex',
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: '#ea580c',
                            background: 'rgba(194,65,12,0.15)',
                            border: '1px solid rgba(194,65,12,0.4)',
                            borderRadius: 9999,
                            padding: '8px 28px',
                            textTransform: 'uppercase',
                            letterSpacing: 3,
                        }}
                    >
                        {category}
                    </span>
                    {readTime && <span style={{ fontSize: 24, color: '#737373' }}>{readTime}</span>}
                </div>
                <div
                    style={{
                        fontSize: title.length > 70 ? 52 : 64,
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: -2,
                        lineHeight: 1.15,
                        maxWidth: 1000,
                        display: 'flex',
                    }}
                >
                    {title}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 40, fontWeight: 800, color: '#ffffff', letterSpacing: -1.5 }}>BRYNEX</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#c2410c', letterSpacing: 6, marginLeft: 12 }}>LABS</span>
                    </div>
                    <span style={{ fontSize: 24, color: '#a3a3a3' }}>brynex.in/blog</span>
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
