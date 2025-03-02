import { useAtom } from 'jotai';
import styles from './index.module.less';
import { fileNameAtom } from '../../store/file';
import { MinusOutlined, BorderOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useWindowControl from '../../core/frame/useWindowControl';

const Header = () => {
	const [fileName] = useAtom(fileNameAtom);
	const { minimize, maximize, close } = useWindowControl();

	return (
		<div className={styles.headerWarp}>
			<div className={styles.title}>{fileName}</div>
			<div className={styles.tools}>
				<Button type="text" icon={<MinusOutlined />} onClick={minimize} className={styles.windowButton} />
				<Button type="text" icon={<BorderOutlined />} onClick={maximize} className={styles.windowButton} />
				<Button type="text" icon={<CloseOutlined />} onClick={close} className={styles.windowButton} />
			</div>
		</div>
	);
};

export default Header;
