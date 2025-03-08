import { Divider } from 'antd';
import History from './History';
import styles from './index.module.less';
import Title from './Title';
import FontSize from './FontSize';
import Bold from './Bold';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<History />
			<Divider type="vertical" className={styles.divider} />
			<Title />
			<Divider type="vertical" className={styles.divider} />
			<FontSize />
			<Bold />
		</div>
	);
};

export default Toolbar;
