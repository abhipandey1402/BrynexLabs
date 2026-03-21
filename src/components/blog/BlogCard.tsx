import Link from 'next/link';
import { BlogPost } from '@/data/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <div className="bg-background-card border border-border/80 hover:border-accent/50 rounded-[1.5rem] p-6 sm:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-[0_20px_40px_rgba(194,65,12,0.08)] hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5 text-xs font-bold uppercase tracking-widest">
                    <span className="text-accent bg-accent/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="text-foreground-muted">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-4 group-hover:text-accent transition-colors tracking-tight leading-snug">
                    {post.title}
                </h3>
                <p className="text-foreground-secondary text-base leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/40">
                    <span className="text-sm font-semibold text-foreground">{post.author}</span>
                    <span className="text-xs font-medium text-foreground-muted">{post.date}</span>
                </div>
            </div>
        </Link>
    );
}
