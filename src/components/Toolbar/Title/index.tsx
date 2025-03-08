import { useAtom } from 'jotai';
import { editorAtom } from '../../../store';
import styles from './index.module.less';
import { Dropdown, Button, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import i18n from '../../../i18n';
import { useCallback, useEffect, useState } from 'react';
import { TitleLevel } from '../../../types/docs';
import headingLevelList from './headingLevelList';

const Title = () => {
	const [editor] = useAtom(editorAtom);
	const [activeHeading, setActiveHeading] = useState<string>(headingLevelList[0].key);

	// 获取当前选中文本的标题级别
	const updateActiveHeading = useCallback(() => {
		if (!editor) return;

		for (const item of headingLevelList) {
			if (editor.isActive('heading', { level: item.level })) {
				setActiveHeading(item.key);
				return;
			}
		}

		setActiveHeading(headingLevelList[0].key);
	}, [editor]);

	// 监听编辑器选择变化
	useEffect(() => {
		if (!editor) return;

		// 初始化更新一次
		updateActiveHeading();

		// 监听选择变化和内容变化
		editor.on('selectionUpdate', updateActiveHeading);
		editor.on('transaction', updateActiveHeading);

		return () => {
			editor.off('selectionUpdate', updateActiveHeading);
			editor.off('transaction', updateActiveHeading);
		};
	}, [editor, updateActiveHeading]);

	// 设置标题级别
	const setHeadingLevel = (level: TitleLevel | 0) => {
		if (!editor) return;

		if (level === 0) {
			// 设置为普通段落
			editor.chain().focus().setParagraph().run();
		} else {
			// 设置为对应级别的标题
			editor.chain().focus().toggleHeading({ level }).run();
		}
	};

	// 下拉菜单选项
	const items: MenuProps['items'] = headingLevelList.map((item) => ({
		key: item.key,
		label: (
			<div className={styles.menuItem} onClick={() => setHeadingLevel(item.level)}>
				<span className={styles.menuText}>{item.label}</span>
			</div>
		),
	}));

	return (
		<div className={styles.titleContainer}>
			<Dropdown trigger={['click']} menu={{ items }}>
				<Tooltip title={i18n.t('toolbar.heading')}>
					<Button type="text" className={styles.titleButton}>
						{activeHeading}
						<DownOutlined className={styles.icon} />
					</Button>
				</Tooltip>
			</Dropdown>
		</div>
	);
};

export default Title;
