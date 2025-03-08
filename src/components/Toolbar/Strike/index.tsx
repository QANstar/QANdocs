import { StrikethroughOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { useCallback, useEffect, useState } from 'react';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';

const Strike = () => {
	const [editor] = useAtom(editorAtom);
	const [isActive, setIsActive] = useState(false);

	// 更新按钮激活状态
	const updateActiveState = useCallback(() => {
		if (!editor) return;
		setIsActive(editor.isActive('strike'));
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

	// 切换删除线状态
	const toggleStrike = useCallback(() => {
		if (!editor) return;
		editor.chain().focus().toggleStrike().run();
	}, [editor]);

	return <ToolButton tooltip={i18n.t('toolbar.strike')} icon={<StrikethroughOutlined />} isActive={isActive} onClick={toggleStrike} />;
};

export default Strike;
