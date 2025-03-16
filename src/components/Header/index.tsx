import { useAtom } from 'jotai';
import styles from './index.module.less';
import { fileNameAtom } from '../../store/file';
import { MinusOutlined, BorderOutlined, CloseOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown } from 'antd';
import useWindowControl from '../../core/frame/useWindowControl';
import items from './Menu';
import Setting from './Setting';
import { useState } from 'react';

const Header = () => {
	const [fileName] = useAtom(fileNameAtom);
	const [settingOpen, setSettingOpen] = useState(false);
	const { minimize, maximize, close } = useWindowControl();

	return (
		<div className={styles.headerWarp}>
			<div className={styles.left}>
				<Dropdown trigger={['click']} menu={{ items }}>
					<Button type="text" icon={<MenuOutlined />} className={styles.windowButton} />
				</Dropdown>
				<div className={styles.title}>{fileName}</div>
			</div>

			<div className={styles.right}>
				<Button type="text" icon={<SettingOutlined />} className={styles.windowButton} onClick={() => setSettingOpen(true)} />
				<Divider type="vertical" className="divider" />
				<Button type="text" icon={<MinusOutlined />} onClick={minimize} className={styles.windowButton} />
				<Button type="text" icon={<BorderOutlined />} onClick={maximize} className={styles.windowButton} />
				<Button type="text" icon={<CloseOutlined />} onClick={close} className={styles.windowButton} />
			</div>
			<Setting open={settingOpen} onClose={() => setSettingOpen(false)} />
		</div>
	);
};

export default Header;
