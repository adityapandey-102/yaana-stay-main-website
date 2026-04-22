'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'


import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'

type Props = {
    value: string
    onChange: (html: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false, // ✅ REQUIRED for Next.js SSR
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4] },
                link: { openOnClick: false },
            }),
            Image,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
        ]
        ,
        content: value,
        editorProps: {
            attributes: {
                class:
                    'prose prose-lg max-w-none min-h-[300px] focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div className="border rounded-md overflow-hidden relative">
            {/* Toolbar */}
            <div className="
    flex flex-wrap gap-2
    border-b p-2
    bg-yaana-lavender-base text-sm
  ">
                {/* Text styles */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'font-bold text-lavender-700' : ''}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'italic text-lavender-700' : ''}
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'underline text-lavender-700' : ''}
                >
                    Underline
                </button>

                <span className="mx-2 text-lavender-200">|</span>

                {/* Headings */}
                {([1, 2, 3, 4] as const).map(level => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        className={
                            editor.isActive('heading', { level })
                                ? 'text-lavender-700'
                                : ''
                        }
                    >
                        H{level}
                    </button>
                ))}

                <span className="mx-2 text-lavender-200">|</span>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'text-lavender-700' : ''}
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'text-lavender-700' : ''}
                >
                    1. List
                </button>

                <span className="mx-2 text-lavender-200">|</span>

                {/* Extras */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    Divider
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true,
                            })
                            .run()
                    }
                >
                    Table
                </button>
            </div>

            {/* Editor */}
            <div className="p-4 max-h-[500px] overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>

    )
}

