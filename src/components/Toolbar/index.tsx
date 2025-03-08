import { Divider } from 'antd';
import History from './History';
import styles from './index.module.less';
import Title from './Title';
import FontSize from './FontSize';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<History />
			<Divider type="vertical" className="divider" />
			<Title />
			<Divider type="vertical" className="divider" />
			<FontSize />
		</div>
	);
};

export default Toolbar;
