import { Dropdown } from 'antd';
import styles from './index.module.less';
import i18n from '../../../i18n';
import type { MenuProps } from 'antd';
import useTextAlign from '../../../core/editor/useTextAlign';
import { AlignType } from '../../../types/docs';
import { alignOptions } from './options';
import ToolButton from '../../../components-common/ToolButton';

const Align = () => {
	const { activeAlign, setAlign } = useTextAlign();

	// 获取当前激活的对齐图标
	const getActiveIcon = () => {
		const option = alignOptions.find((o) => o.key === activeAlign);
		return option ? option.icon : alignOptions[0].icon;
	};

	// 下拉菜单项
	const items: MenuProps['items'] = alignOptions.map((option) => ({
		key: option.key,
		label: (
			<div className={styles.menuItem} onClick={() => setAlign(option.key as AlignType)}>
				{option.icon}
				<span className={styles.menuItemLabel}>{option.label}</span>
			</div>
		),
	}));

	return (
		<Dropdown menu={{ items }} trigger={['click']} placement="bottom">
			<div>
				<ToolButton tooltip={i18n.t('toolbar.align')} icon={getActiveIcon()} />
			</div>
		</Dropdown>
	);
};

export default Align;
