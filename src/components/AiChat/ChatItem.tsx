import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import styles from './ChatItem.module.less';

interface ChatItemProps {
	content: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ content }) => {
	const editor = useEditor({
		extensions: [StarterKit, Markdown],
		content: '',
		editable: false,
	});

	useEffect(() => {
		if (editor && content) {
			// 解析Markdown内容
			const markdown = editor.storage.markdown;
			if (markdown) {
				try {
					// 清空编辑器
					editor.commands.clearContent();
					// 设置Markdown内容
					editor.commands.setContent(markdown.parser.parse(content));
				} catch (error) {
					console.error('解析Markdown失败:', error);
					editor.commands.setContent(content);
				}
			} else {
				editor.commands.setContent(content);
			}
		}
	}, [editor, content]);

	return <div className={`${styles.chatItem}`}>{editor && <EditorContent editor={editor} className={styles.editorContent} />}</div>;
};

export default ChatItem;
