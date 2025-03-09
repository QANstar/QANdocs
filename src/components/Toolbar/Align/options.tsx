import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';

// 对齐方式配置项
export const alignOptions = [
	{ key: 'left', label: i18n.t('toolbar.justifyLeft'), icon: <AlignLeftOutlined /> },
	{ key: 'center', label: i18n.t('toolbar.justifyCenter'), icon: <AlignCenterOutlined /> },
	{ key: 'right', label: i18n.t('toolbar.justifyRight'), icon: <AlignRightOutlined /> },
];
