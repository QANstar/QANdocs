import { Divider } from 'antd';
import History from './History';
import styles from './index.module.less';
import Title from './Title';
import FontSize from './FontSize';
import Bold from './Bold';
import Italic from './Italic';
import Strike from './Strike';
import Underline from './Underline';
import FontColor from './FontColor';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<History />
			<Divider type="vertical" className={styles.divider} />
			<Title />
			<Divider type="vertical" className={styles.divider} />
			<FontSize />
			<Bold />
			<Italic />
			<Strike />
			<Underline />
			<FontColor />
			<Divider type="vertical" className={styles.divider} />
		</div>
	);
};

export default Toolbar;
