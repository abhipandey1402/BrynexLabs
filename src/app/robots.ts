import type { MetadataRoute } from 'next';

const PRIVATE_PATHS = ['/api/', '/admin/', '/super-admin/', '/private/'];

// AI search & answer-engine crawlers, explicitly welcomed so the site gets
// cited in ChatGPT, Claude, Perplexity, Gemini, Copilot, and AI Overviews.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // ChatGPT live browsing
  'ClaudeBot', // Anthropic crawler
  'Claude-Web', // Claude live browsing
  'anthropic-ai',
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity live browsing
  'Google-Extended', // Gemini training
  'GoogleOther',
  'Bingbot', // Powers Copilot + ChatGPT search
  'Amazonbot', // Alexa/Rufus
  'Applebot', // Siri/Apple Intelligence
  'Applebot-Extended',
  'DuckAssistBot',
  'cohere-ai',
  'meta-externalagent', // Meta AI
  'CCBot', // Common Crawl (feeds many LLMs)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: 'https://brynex.in/sitemap.xml',
  };
}
