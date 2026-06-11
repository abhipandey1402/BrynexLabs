'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
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
            className={`min-w-9 h-9 px-2 rounded-lg text-sm font-bold flex items-center justify-center transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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

function Icon({ d, filled }: { d: string; filled?: boolean }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={d} />
        </svg>
    );
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

    const addImage = useCallback(() => {
        const src = window.prompt('Image URL (https://…)');
        if (!src) return;
        const alt = window.prompt('Describe the image (alt text, for SEO & accessibility)') ?? '';
        editor.chain().focus().setImage({ src, alt }).run();
    }, [editor]);

    const inTable = editor.isActive('table');

    return (
        <div className="sticky top-0 z-10 border-b border-border bg-background-secondary/40 rounded-t-xl backdrop-blur">
            <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap items-center gap-1 p-2">
                {/* Block type */}
                <ToolbarButton label="Paragraph (⌘⌥0)" active={editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList')} onClick={() => editor.chain().focus().setParagraph().run()}>¶</ToolbarButton>
                <ToolbarButton label="Heading 2 (⌘⌥2)" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
                <ToolbarButton label="Heading 3 (⌘⌥3)" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
                <ToolbarButton label="Heading 4 (⌘⌥4)" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>H4</ToolbarButton>
                <Divider />

                {/* Inline marks */}
                <ToolbarButton label="Bold (⌘B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><span className="font-black">B</span></ToolbarButton>
                <ToolbarButton label="Italic (⌘I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><span className="italic font-serif">I</span></ToolbarButton>
                <ToolbarButton label="Underline (⌘U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><span className="underline">U</span></ToolbarButton>
                <ToolbarButton label="Strikethrough (⌘⇧S)" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><span className="line-through">S</span></ToolbarButton>
                <ToolbarButton label="Inline code (⌘E)" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}><span className="font-mono text-xs">{'</>'}</span></ToolbarButton>
                <ToolbarButton label="Highlight (⌘⇧H)" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>
                </ToolbarButton>
                <Divider />

                {/* Alignment */}
                <ToolbarButton label="Align left (⌘⇧L)" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="14" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Align center (⌘⇧E)" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Align right (⌘⇧R)" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
                </ToolbarButton>
                <Divider />

                {/* Blocks */}
                <ToolbarButton label="Bullet list (⌘⇧8)" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Numbered list (⌘⇧7)" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Blockquote (⌘⇧B)" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</ToolbarButton>
                <ToolbarButton label="Code block (⌘⌥C)" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
                <Divider />

                {/* Insert */}
                <ToolbarButton label="Add or edit link (⌘K)" active={editor.isActive('link')} onClick={setLink}>
                    <Icon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </ToolbarButton>
                <ToolbarButton label="Insert image from URL" onClick={addImage}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Insert table (3×3)" active={inTable} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
                </ToolbarButton>
                <Divider />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().insertContent('<p>[CTA]</p>').run()}
                    className="h-9 px-3 rounded-lg text-xs font-black uppercase tracking-wider bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    title="Insert a conversion CTA block at the cursor"
                >
                    + CTA Block
                </button>
                <div className="flex-1" />
                <ToolbarButton label="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4 8 20"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="21" y1="15" x2="15" y2="21"/></svg>
                </ToolbarButton>
                <ToolbarButton label="Undo (⌘Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
                <ToolbarButton label="Redo (⌘⇧Z)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
            </div>

            {/* Contextual table controls */}
            {inTable && (
                <div role="toolbar" aria-label="Table editing" className="flex flex-wrap items-center gap-1.5 px-2 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mr-1">Table:</span>
                    {[
                        { label: '+ Row', action: () => editor.chain().focus().addRowAfter().run() },
                        { label: '+ Column', action: () => editor.chain().focus().addColumnAfter().run() },
                        { label: '− Row', action: () => editor.chain().focus().deleteRow().run() },
                        { label: '− Column', action: () => editor.chain().focus().deleteColumn().run() },
                        { label: 'Header row', action: () => editor.chain().focus().toggleHeaderRow().run() },
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            type="button"
                            onClick={btn.action}
                            className="h-7 px-2.5 rounded-md border border-border bg-background text-xs font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            {btn.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().deleteTable().run()}
                        className="h-7 px-2.5 rounded-md border border-red-500/30 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                        Delete table
                    </button>
                </div>
            )}
        </div>
    );
}

export default function RichTextEditor({ initialContent, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        // Re-render the React wrapper on every transaction so toolbar active
        // states and the word counter stay in sync with the document.
        shouldRerenderOnTransaction: true,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: 'https',
                },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight,
            Image,
            TableKit.configure({ table: { resizable: false } }),
            Placeholder.configure({
                placeholder: 'Start writing your article here…',
            }),
        ],
        content: initialContent,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                'aria-label': 'Article content',
                class: 'prose dark:prose-invert max-w-none min-h-[420px] px-5 py-4 focus:outline-none prose-headings:font-black prose-headings:text-foreground prose-p:text-foreground-secondary prose-li:text-foreground-secondary prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:not-italic prose-a:text-accent prose-img:rounded-xl prose-img:max-w-full',
            },
        },
    });

    if (!editor) {
        return <div className="min-h-[480px] rounded-xl border border-border bg-background-card animate-pulse" />;
    }

    const words = editor.getText().split(/\s+/).filter(Boolean).length;

    return (
        <div className="rounded-xl border border-border bg-background-card focus-within:border-accent transition-colors">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
            <div className="flex items-center justify-end gap-3 px-4 py-2 border-t border-border/60 text-xs font-semibold text-foreground-muted">
                <span>{words.toLocaleString()} word{words === 1 ? '' : 's'}</span>
                <span aria-hidden="true">·</span>
                <span>{Math.max(1, Math.round(words / 200))} min read</span>
            </div>
        </div>
    );
}
