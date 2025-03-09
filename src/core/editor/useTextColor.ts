import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { useCallback, useEffect, useState } from 'react';

const useTextColor = () => {
	const [editor] = useAtom(editorAtom);
	const [currentColor, setCurrentColor] = useState<string>('#000000');

	// 获取当前文本颜色
	const updateCurrentColor = useCallback(() => {
		if (!editor) return;

		const color = editor.getAttributes('textStyle').color;
		if (color) {
			setCurrentColor(color);
		} else {
			setCurrentColor('#000000'); // 默认黑色
		}
	}, [editor]);

	// 监听编辑器状态变化
	useEffect(() => {
		if (!editor) return;

		updateCurrentColor();

		editor.on('selectionUpdate', updateCurrentColor);
		editor.on('transaction', updateCurrentColor);

		return () => {
			editor.off('selectionUpdate', updateCurrentColor);
			editor.off('transaction', updateCurrentColor);
		};
	}, [editor, updateCurrentColor]);

	// 设置文字颜色
	const setColor = useCallback(
		(color: string) => {
			if (!editor) return;

			if (color === '') {
				// 移除颜色
				editor.chain().focus().unsetColor().run();
			} else {
				// 设置颜色
				editor.chain().focus().setColor(color).run();
			}

			setCurrentColor(color || '#000000');
		},
		[editor]
	);

	return {
		currentColor,
		setColor,
	};
};

export default useTextColor;
