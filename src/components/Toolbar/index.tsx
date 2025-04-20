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
import Align from './Align';
import BulletList from './BulletList';
import OrderedList from './OrderedList';
import MoreMenu from './MoreMenu';
import AiChat from './AiChat';

const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbarLeft}>
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
				<Align />
				<BulletList />
				<OrderedList />
				<Divider type="vertical" className={styles.divider} />
				<MoreMenu />
			</div>
			<div className={styles.toolbarRight}>
				<AiChat />
			</div>
		</div>
	);
};

export default Toolbar;
