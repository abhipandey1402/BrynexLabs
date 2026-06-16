import 'server-only';

// IndexNow lets us instantly notify Bing, Yandex, and other participating
// engines that a URL changed, so they re-crawl in minutes instead of days.
// The key is public by design — it's served as a verification file at
// https://brynex.in/<KEY>.txt (see public/067665fcd826c1afbf310a6cc81e2996.txt).
const KEY = '067665fcd826c1afbf310a6cc81e2996';
const HOST = 'brynex.in';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Notify IndexNow that the given paths changed. Fire-safe: only runs in
 * production, never throws, and times out fast so it can't stall an admin save.
 * Accepts absolute URLs or site-relative paths ("/blog/my-post").
 */
export async function pingIndexNow(paths: string[]): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return;

    const urlList = Array.from(new Set(paths))
        .filter(Boolean)
        .map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`));
    if (urlList.length === 0) return;

    try {
        await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: `https://${HOST}/${KEY}.txt`,
                urlList,
            }),
            // Never let a slow third party hold up the admin response.
            signal: AbortSignal.timeout(4000),
        });
    } catch (err) {
        // Best-effort only — a failed ping must not affect the save result.
        console.error('[indexnow] ping failed:', err);
    }
}
