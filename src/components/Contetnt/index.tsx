import { useAtom } from 'jotai';
import AiChat from '../AiChat';
import Editor from '../Editor';
import Toolbar from '../Toolbar';
import styles from './index.module.less';
import { isAiChatAciveAtom } from '../../store';

const Content = () => {
	const [isAiChatActive] = useAtom(isAiChatAciveAtom);

	return (
		<div className={styles.content}>
			<div className={styles.toolbar}>
				<Toolbar />
			</div>
			<div className={styles.contentBottom}>
				<div className={styles.editor}>
					<Editor />
				</div>

				{isAiChatActive && <AiChat />}
			</div>
		</div>
	);
};

export default Content;
