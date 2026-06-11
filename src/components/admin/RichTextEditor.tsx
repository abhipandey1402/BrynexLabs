'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback } from 'react';

interface RichTextEditorProps {
    initialContent: string;
    onChange: (html: string) => void;
}

function ToolbarButton({
    onClick,
    active,
    disabled,
    label,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={`min-w-9 h-9 px-2 rounded-lg text-sm font-bold flex items-center justify-center transition-colors disabled:opacity-30 ${
                active
                    ? 'bg-accent text-white'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary'
            }`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="w-px h-5 bg-border mx-1 self-center" aria-hidden="true" />;
}

function Toolbar({ editor }: { editor: Editor }) {
    const setLink = useCallback(() => {
        const previous = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Link URL (https://…)', previous ?? 'https://');
        if (url === null) return;
        if (url === '' || url === 'https://') {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-background-secondary/40 rounded-t-xl sticky top-0 z-10 backdrop-blur">
            <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
            <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
            <ToolbarButton label="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>¶</ToolbarButton>
            <Divider />
            <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><span className="font-black">B</span></ToolbarButton>
            <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><span className="italic font-serif">I</span></ToolbarButton>
            <Divider />
            <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/></svg>
            </ToolbarButton>
            <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
            </ToolbarButton>
            <ToolbarButton label="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</ToolbarButton>
            <ToolbarButton label="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
            <Divider />
            <ToolbarButton label="Add or edit link" active={editor.isActive('link')} onClick={setLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </ToolbarButton>
            <Divider />
            <button
                type="button"
                onClick={() => editor.chain().focus().insertContent('<p>[CTA]</p>').run()}
                className="h-9 px-3 rounded-lg text-xs font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-white transition-colors"
                title="Insert a conversion CTA block at the cursor"
            >
                + CTA Block
            </button>
            <div className="flex-1" />
            <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
            <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
        </div>
    );
}

export default function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: 'https',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write your article… Use the toolbar for headings, lists, quotes, links, and CTA blocks.',
            }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none min-h-[420px] px-5 py-4 focus:outline-none prose-headings:font-black prose-headings:text-foreground prose-p:text-foreground-secondary prose-li:text-foreground-secondary prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:not-italic prose-a:text-accent',
            },
        },
    });

    if (!editor) {
        return <div className="min-h-[480px] rounded-xl border border-border bg-background-card animate-pulse" />;
    }

    return (
        <div className="rounded-xl border border-border bg-background-card focus-within:border-accent transition-colors">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
