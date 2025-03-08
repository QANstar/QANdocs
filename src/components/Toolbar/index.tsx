import { Divider } from 'antd';
import History from './History';
import styles from './index.module.less';
import Title from './Title';
import FontSize from './FontSize';
import Bold from './Bold';
import Ltalic from './Ltalic';
import Strike from './Strike';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<History />
			<Divider type="vertical" className={styles.divider} />
			<Title />
			<Divider type="vertical" className={styles.divider} />
			<FontSize />
			<Bold />
			<Ltalic />
			<Strike />
		</div>
	);
};

export default Toolbar;
