"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = { value: string; onChange: (html: string) => void; invalid?: boolean; describedBy?: string };

function ToolbarButton({
  label, active = false, disabled = false, onClick, children,
}: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`min-h-9 min-w-9 rounded border px-2 text-sm font-bold disabled:opacity-40 ${
        active ? "border-brand bg-brand-soft text-brand-dark" : "border-line bg-white text-ink hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  // Tiptap v3 doesn't re-render on every transaction, so subscribe to just what the toolbar needs
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e?.isActive("bold") ?? false,
      italic: e?.isActive("italic") ?? false,
      h2: e?.isActive("heading", { level: 2 }) ?? false,
      h3: e?.isActive("heading", { level: 3 }) ?? false,
      bullet: e?.isActive("bulletList") ?? false,
      ordered: e?.isActive("orderedList") ?? false,
      quote: e?.isActive("blockquote") ?? false,
      link: e?.isActive("link") ?? false,
      canUndo: e?.can().undo() ?? false,
      canRedo: e?.can().redo() ?? false,
    }),
  });

  function setLink() {
    const previous = (editor.getAttributes("link").href as string | undefined) ?? "";
    const url = window.prompt("Link address (https://…). Leave empty to remove the link.", previous);
    if (url === null) return;
    const trimmed = url.trim();
    if (trimmed === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!/^(https?:\/\/|mailto:)/i.test(trimmed)) {
      window.alert("Links must start with https://, http:// or mailto:");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: trimmed }).run();
  }

  const chain = () => editor.chain().focus();

  return (
    <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap gap-1.5 rounded-t-[0.35rem] border border-b-0 border-line bg-surface p-2">
      <ToolbarButton label="Heading 2" active={s.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton label="Heading 3" active={s.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <ToolbarButton label="Bold" active={s.bold} onClick={() => chain().toggleBold().run()}><span className="font-black">B</span></ToolbarButton>
      <ToolbarButton label="Italic" active={s.italic} onClick={() => chain().toggleItalic().run()}><span className="italic">I</span></ToolbarButton>
      <ToolbarButton label="Bulleted list" active={s.bullet} onClick={() => chain().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton label="Numbered list" active={s.ordered} onClick={() => chain().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton label="Quote" active={s.quote} onClick={() => chain().toggleBlockquote().run()}>“ ”</ToolbarButton>
      <ToolbarButton label="Link" active={s.link} onClick={setLink}>Link</ToolbarButton>
      <ToolbarButton label="Undo" disabled={!s.canUndo} onClick={() => chain().undo().run()}>↶</ToolbarButton>
      <ToolbarButton label="Redo" disabled={!s.canRedo} onClick={() => chain().redo().run()}>↷</ToolbarButton>
    </div>
  );
}

/**
 * Tiptap editor producing HTML. Only formats the backend sanitizer keeps are offered
 * (headings, bold/italic, lists, quote, links). Embedded images are NOT enabled: add them only
 * if the team approves.
 */
export function RichTextEditor({ value, onChange, invalid, describedBy }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        underline: false,
        strike: false,
        code: false,
        codeBlock: false,
        link: { openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } },
      }),
    ],
    content: value,
    immediatelyRender: false, // avoids Next.js hydration mismatches
    editorProps: {
      attributes: {
        id: "field-content",
        "aria-label": "Article content",
        "aria-invalid": invalid ? "true" : "false",
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        class: "admin-rich min-h-[300px] rounded-b-[0.35rem] border border-line bg-white p-4 text-base",
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  if (!editor) return <div className="min-h-[340px] animate-pulse rounded-[0.35rem] bg-surface" aria-hidden="true" />;

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
