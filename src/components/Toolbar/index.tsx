import { Divider } from 'antd';
import History from './History';
import styles from './index.module.less';
import Title from './Title';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<History />
			<Divider type="vertical" className="divider" />
			<Title />
		</div>
	);
};

export default Toolbar;
