import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { useCallback, useEffect, useState } from 'react';
import { AlignType } from '../../types/docs';

const useTextAlign = () => {
	const [editor] = useAtom(editorAtom);
	const [activeAlign, setActiveAlign] = useState<AlignType>('left');

	// 更新当前对齐方式状态
	const updateActiveAlign = useCallback(() => {
		if (!editor) return;

		if (editor.isActive({ textAlign: 'left' })) {
			setActiveAlign('left');
		} else if (editor.isActive({ textAlign: 'center' })) {
			setActiveAlign('center');
		} else if (editor.isActive({ textAlign: 'right' })) {
			setActiveAlign('right');
		} else {
			setActiveAlign('left'); // 默认左对齐
		}
	}, [editor]);

	// 监听编辑器状态变化
	useEffect(() => {
		if (!editor) return;

		// 初始化更新一次
		updateActiveAlign();

		// 监听选择变化和内容变化
		editor.on('selectionUpdate', updateActiveAlign);
		editor.on('transaction', updateActiveAlign);

		return () => {
			editor.off('selectionUpdate', updateActiveAlign);
			editor.off('transaction', updateActiveAlign);
		};
	}, [editor, updateActiveAlign]);

	// 设置文本对齐方式
	const setAlign = useCallback(
		(align: AlignType) => {
			if (!editor) return;

			editor.chain().focus().setTextAlign(align).run();
			setActiveAlign(align);
		},
		[editor]
	);

	return {
		activeAlign,
		setAlign,
	};
};

export default useTextAlign;
