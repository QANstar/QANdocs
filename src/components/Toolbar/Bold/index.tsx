import { Button, Tooltip } from 'antd';
import { BoldOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import i18n from '../../../i18n';

const Bold = () => {
	const [editor] = useAtom(editorAtom);
	const [isActive, setIsActive] = useState(false);

	// 更新按钮激活状态
	const updateActiveState = useCallback(() => {
		if (!editor) return;
		setIsActive(editor.isActive('bold'));
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

	// 切换加粗状态
	const toggleBold = useCallback(() => {
		if (!editor) return;
		editor.chain().focus().toggleBold().run();
	}, [editor]);

	return (
		<Tooltip title={i18n.t('toolbar.bold')}>
			<Button type="text" icon={<BoldOutlined />} onClick={toggleBold} className={`${styles.button} ${isActive ? styles.active : ''}`} />
		</Tooltip>
	);
};

export default Bold;
