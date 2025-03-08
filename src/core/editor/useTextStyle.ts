import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { useCallback, useEffect, useState } from 'react';

type TestStyleType = 'bold' | 'italic' | 'strike' | 'underline';

interface IUserTextStyleOptions {
	type: TestStyleType;
}

const useTextStyle = (options: IUserTextStyleOptions) => {
	const { type } = options;

	const [editor] = useAtom(editorAtom);
	const [isActive, setIsActive] = useState(false);

	// 更新按钮激活状态
	const updateActiveState = useCallback(() => {
		if (!editor) return;
		setIsActive(editor.isActive(type));
	}, [editor, type]);

	// 监听编辑器状态变化
	useEffect(() => {
		if (!editor) return;

		// 初始化更新一次
		updateActiveState();

		// 监听选择变化和内容变化
		editor.on('selectionUpdate', updateActiveState);
		editor.on('transaction', updateActiveState);

		return () => {
			editor.off('selectionUpdate', updateActiveState);
			editor.off('transaction', updateActiveState);
		};
	}, [editor, updateActiveState]);

	// 切换文本样式状态
	const toggleTextStyle = useCallback(() => {
		if (!editor) return;
		if (type === 'bold') {
			return editor.chain().focus().toggleBold().run();
		}
		if (type === 'italic') {
			return editor.chain().focus().toggleItalic().run();
		}
		if (type === 'strike') {
			return editor.chain().focus().toggleStrike().run();
		}
		if (type === 'underline') {
			return editor.chain().focus().toggleUnderline().run();
		}
	}, [editor, type]);

	return { isActive, toggleTextStyle };
};

export default useTextStyle;
