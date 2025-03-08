import { Button, Tooltip } from 'antd';
import { ItalicOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { useCallback, useEffect, useState } from 'react';
import i18n from '../../../i18n';

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

	return (
		<Tooltip title={i18n.t('toolbar.italic')}>
			<Button type="text" icon={<ItalicOutlined />} onClick={toggleItalic} className={`tool_button ${isActive ? 'tool_active' : ''}`} />
		</Tooltip>
	);
};

export default Italic;
