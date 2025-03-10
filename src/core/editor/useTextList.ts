import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { useCallback, useEffect, useState } from 'react';

type TestListType = 'bulletList' | 'orderedList';

interface IUserTextListOptions {
	type: TestListType;
}

const useTextList = (options: IUserTextListOptions) => {
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

	// 切换无序列表
	const toggleList = useCallback(() => {
		if (!editor) return;
		if (type === 'orderedList') {
			editor.chain().focus().toggleOrderedList().run();
			return;
		}
		if (type === 'bulletList') {
			editor.chain().focus().toggleBulletList().run();
			return;
		}
	}, [editor, type]);

	return { isActive, toggleList };
};

export default useTextList;
