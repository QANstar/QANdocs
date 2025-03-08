import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import { Dropdown, Button, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import i18n from '../../../i18n';
import { DEFAULT_FONT_SIZE, FONT_SIZE_LIST } from './config';

// 默认字体大小

const FontSize = () => {
	const [editor] = useAtom(editorAtom);
	const [activeSize, setActiveSize] = useState<number>(DEFAULT_FONT_SIZE);

	// 获取当前选中文本的字体大小
	const updateActiveFontSize = useCallback(() => {
		if (!editor) return;

		// 检查当前是否有字体大小标记
		const fontSize = editor.getAttributes('textStyle').fontSize;

		if (fontSize) {
			// 如果有fontSize属性，转换为数字并设置为当前值
			const size = typeof fontSize === 'string' ? parseInt(fontSize, 10) : fontSize;
			setActiveSize(size);
		} else {
			// 如果没有，设置为默认值
			setActiveSize(DEFAULT_FONT_SIZE);
		}
	}, [editor]);

	// 监听编辑器选择变化
	useEffect(() => {
		if (!editor) return;

		// 初始化更新一次
		updateActiveFontSize();

		// 监听选择变化和内容变化
		editor.on('selectionUpdate', updateActiveFontSize);
		editor.on('transaction', updateActiveFontSize);

		return () => {
			editor.off('selectionUpdate', updateActiveFontSize);
			editor.off('transaction', updateActiveFontSize);
		};
	}, [editor, updateActiveFontSize]);

	// 设置字体大小
	const setFontSize = (size: number | null) => {
		if (!editor) return;

		if (size === null) {
			// 重置为默认大小
			editor.chain().focus().unsetFontSize().run();
		} else {
			// 设置字体大小
			editor
				.chain()
				.focus()
				.setFontSize(size + 'px')
				.run();
		}

		// 更新当前选中的字体大小
		setActiveSize(size || DEFAULT_FONT_SIZE);
	};

	// 下拉菜单选项
	const items: MenuProps['items'] = [
		...FONT_SIZE_LIST.map((size) => ({
			key: size.toString(),
			label: (
				<div className={styles.menuItem} onClick={() => setFontSize(size)}>
					<span className={styles.menuText}>{size}px</span>
				</div>
			),
		})),
	];

	return (
		<div className={styles.fontSizeContainer}>
			<Dropdown menu={{ items }} trigger={['click']}>
				<Tooltip title={i18n.t('toolbar.fontSize')}>
					<Button type="text" className={styles.fontSizeButton}>
						{activeSize}px
						<DownOutlined className={styles.icon} />
					</Button>
				</Tooltip>
			</Dropdown>
		</div>
	);
};

export default FontSize;
