import { UnderlineOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { useCallback, useEffect, useState } from 'react';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';

const Underline = () => {
	const [editor] = useAtom(editorAtom);
	const [isActive, setIsActive] = useState(false);

	// 更新按钮激活状态
	const updateActiveState = useCallback(() => {
		if (!editor) return;
		setIsActive(editor.isActive('underline'));
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

	// 切换下划线状态
	const toggleUnderline = useCallback(() => {
		if (!editor) return;
		editor.chain().focus().toggleUnderline().run();
	}, [editor]);

	return <ToolButton tooltip={i18n.t('toolbar.underline')} icon={<UnderlineOutlined />} isActive={isActive} onClick={toggleUnderline} />;
};

export default Underline;
