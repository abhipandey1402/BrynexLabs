import BlogCTA from './BlogCTA';

/**
 * Renders raw article HTML with the blog's typography system.
 * '[CTA]' markers in the content are replaced with the interactive conversion block.
 * Used by both the public article page and the super-admin live preview.
 */
export default function ArticleProse({ content }: { content: string }) {
    const contentBlocks = content.split('[CTA]');

    return (
        <div className="
            prose
            prose-lg
            md:prose-xl
            dark:prose-invert
            max-w-none

            /* Headings */
            prose-headings:font-black
            prose-headings:tracking-tight
            prose-headings:text-foreground
            prose-h2:text-3xl md:prose-h2:text-4xl
            prose-h2:mt-16 prose-h2:mb-6
            prose-h3:text-2xl md:prose-h3:text-3xl
            prose-h3:mt-10 prose-h3:mb-4

            /* Paragraphs & Text */
            prose-p:text-lg md:prose-p:text-xl
            prose-p:leading-loose
            prose-p:text-foreground-secondary
            prose-p:mb-12

            /* Lists */
            prose-li:text-lg md:prose-li:text-xl
            prose-li:text-foreground-secondary
            prose-li:leading-loose
            prose-li:my-4
            prose-ul:my-10 prose-ol:my-10

            /* Formatting & Quotes */
            prose-strong:text-foreground
            prose-strong:font-extrabold
            prose-blockquote:border-l-accent
            prose-blockquote:bg-accent/5
            prose-blockquote:py-3
            prose-blockquote:px-6
            prose-blockquote:my-12
            prose-blockquote:rounded-r-2xl
            prose-blockquote:font-medium
            prose-blockquote:text-foreground
            prose-blockquote:not-italic

            /* Links */
            prose-a:text-accent
            hover:prose-a:text-accent-light
            prose-a:font-semibold
            prose-a:no-underline hover:prose-a:underline

            /* Media & tables */
            prose-img:rounded-2xl
            prose-img:shadow-card
            prose-th:text-foreground
            prose-td:text-foreground-secondary
        ">
            {contentBlocks.map((block, index) => (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: block }} />
                    {index < contentBlocks.length - 1 && <BlogCTA />}
                </div>
            ))}
        </div>
    );
}
