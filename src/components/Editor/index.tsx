import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import i18n from '../../i18n';
import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { useEffect } from 'react';
import FontSize from '@tiptap/extension-font-size';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

const extensions = [
	StarterKit,
	Markdown.configure({
		html: false,
		transformPastedText: true,
		transformCopiedText: true,
	}),
	Placeholder.configure({
		placeholder: i18n.t('editor.placeholder'),
	}),
	FontSize.configure({
		types: ['textStyle'],
	}),
	TextStyle,
	Image.configure({
		allowBase64: true,
	}),
	Underline,
	Color,
	TextAlign.configure({
		types: ['heading', 'paragraph'],
		alignments: ['left', 'center', 'right', 'justify'],
		defaultAlignment: 'left',
	}),
	Table.configure({
		resizable: true,
	}),
	TableRow,
	TableHeader,
	TableCell,
];

const content = '';

const Editor = () => {
	// 创建编辑器实例
	const editor = useEditor({
		extensions,
		content,
		autofocus: true,
	});

	const [, setEditor] = useAtom(editorAtom);

	// 当编辑器实例创建或销毁时更新全局状态
	useEffect(() => {
		if (editor) {
			setEditor(editor);
		}

		// 在组件卸载时，清除全局编辑器引用
		return () => {
			setEditor(null);
		};
	}, [editor, setEditor]);

	return (
		<div>
			<EditorContent editor={editor} />
			{/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
			{/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
		</div>
	);
};

export default Editor;
