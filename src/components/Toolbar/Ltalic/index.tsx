import { ItalicOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { useCallback, useEffect, useState } from 'react';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';

const Italic = () => {
	const [editor] = useAtom(editorAtom);
	const [isActive, setIsActive] = useState(false);

	// 更新按钮激活状态
	const updateActiveState = useCallback(() => {
		if (!editor) return;
		setIsActive(editor.isActive('italic'));
	}, [editor]);

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

	// 切换斜体状态
	const toggleItalic = useCallback(() => {
		if (!editor) return;
		editor.chain().focus().toggleItalic().run();
	}, [editor]);

	return <ToolButton tooltip={i18n.t('toolbar.italic')} icon={<ItalicOutlined />} isActive={isActive} onClick={toggleItalic} />;
};

export default Italic;
