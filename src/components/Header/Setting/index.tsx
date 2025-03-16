import { useState } from 'react';
import { Modal, Tabs } from 'antd';
import styles from './index.module.less';
import i18n from '../../../i18n';
import AiSetting from './AiSetting';

interface SettingProps {
	open?: boolean;
	onClose?: () => void;
}

/**
 * 应用设置模态框组件
 */
const Setting = (props: SettingProps) => {
	const { open, onClose } = props;
	const [activeTab, setActiveTab] = useState<string>('ai');

	const handleTabChange = (key: string) => {
		setActiveTab(key);
	};

	// 设置选项卡项
	const tabs = [
		{
			key: 'ai',
			label: i18n.t('header.setting.ai.title'),
			children: <AiSetting />,
		},
	];

	return (
		<Modal open={open} onCancel={onClose} footer={null} width={600} className={styles.settingModal} destroyOnClose>
			<Tabs activeKey={activeTab} tabPosition="left" onChange={handleTabChange} items={tabs} />
		</Modal>
	);
};

export default Setting;
