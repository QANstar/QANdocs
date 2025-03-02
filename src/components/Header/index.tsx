import { useAtom } from 'jotai';
import styles from './index.module.less';
import { fileNameAtom } from '../../store/file';

const Header = () => {
	const [fileName] = useAtom(fileNameAtom);
	return (
		<div className={styles.headerWarp}>
			<div className={styles.title}>{fileName}</div>
			<div className={styles.tools}></div>
		</div>
	);
};

export default Header;
