import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import styles from './index.module.less';
import i18n from '../../../i18n';
import { useCallback, useEffect, useState } from 'react';
import ToolButton from '../../../components-common/ToolButton';

const History = () => {
	const [editor] = useAtom(editorAtom);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	// 更新状态的函数
	const updateButtonStates = useCallback(() => {
		if (editor) {
			setCanUndo(editor.can().undo());
			setCanRedo(editor.can().redo());
		}
	}, [editor]);

	// 初始化和编辑器更新时更新按钮状态
	useEffect(() => {
		if (!editor) return;

		// 初始化时更新一次
		updateButtonStates();

		// 监听编辑器的变化
		const onUpdate = () => {
			updateButtonStates();
		};

		// 监听历史堆栈变化
		editor.on('transaction', onUpdate);

		// 清理函数
		return () => {
			editor.off('transaction', onUpdate);
		};
	}, [editor, updateButtonStates]);

	// 撤销操作
	const handleUndo = useCallback(() => {
		if (editor?.can().undo()) {
			editor.commands.undo();
		}
	}, [editor]);

	// 恢复操作
	const handleRedo = useCallback(() => {
		if (editor?.can().redo()) {
			editor.commands.redo();
		}
	}, [editor]);

	return (
		<div className={styles.history}>
			<ToolButton tooltip={i18n.t('toolbar.undo')} icon={<UndoOutlined />} disabled={!canUndo} onClick={handleUndo} />
			<ToolButton tooltip={i18n.t('toolbar.redo')} icon={<RedoOutlined />} disabled={!canRedo} onClick={handleRedo} />
		</div>
	);
};

export default History;
