import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

const extensions = [StarterKit, Markdown];

const content = `
<h2>
  hello QANdocs,
</h2>
`;

const Editor = () => {
	return <EditorProvider extensions={extensions} content={content} />;
};

export default Editor;
