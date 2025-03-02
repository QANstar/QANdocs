import Editor from '../Editor';
import styles from './index.module.less';

const Content = () => {
	return (
		<div className={styles.content}>
			<div className={styles.editor}>
				<Editor />
			</div>
		</div>
	);
};

export default Content;
