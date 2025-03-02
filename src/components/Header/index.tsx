import { useAtom } from 'jotai';
import styles from './index.module.less';
import { fileNameAtom } from '../../store/file';
import { MinusOutlined, BorderOutlined, CloseOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import useWindowControl from '../../core/frame/useWindowControl';

const Header = () => {
	const [fileName] = useAtom(fileNameAtom);
	const { minimize, maximize, close } = useWindowControl();

	return (
		<div className={styles.headerWarp}>
			<div className={styles.left}>
				<Button type="text" icon={<MenuOutlined />} className={styles.windowButton} />
				<div className={styles.title}>{fileName}</div>
			</div>

			<div className={styles.right}>
				<Button type="text" icon={<SettingOutlined />} className={styles.windowButton} />
				<Divider type="vertical" className={styles.divider} />
				<Button type="text" icon={<MinusOutlined />} onClick={minimize} className={styles.windowButton} />
				<Button type="text" icon={<BorderOutlined />} onClick={maximize} className={styles.windowButton} />
				<Button type="text" icon={<CloseOutlined />} onClick={close} className={styles.windowButton} />
			</div>
		</div>
	);
};

export default Header;
