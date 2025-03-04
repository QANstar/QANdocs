import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import i18n from '../../i18n';

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
];

const content = '';

const Editor = () => {
	return <EditorProvider extensions={extensions} content={content} />;
};

export default Editor;
