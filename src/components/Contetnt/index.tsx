import Editor from '../Editor';
import Toolbar from '../Toolbar';
import styles from './index.module.less';

const Content = () => {
	return (
		<div className={styles.content}>
			<div className={styles.toolbar}>
				<Toolbar />
			</div>
			<div className={styles.editor}>
				<Editor />
			</div>
		</div>
	);
};

export default Content;
