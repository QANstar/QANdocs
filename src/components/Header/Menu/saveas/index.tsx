import i18n from '../../../../i18n';
import styles from '../index.module.less';
import useSaveAs from '../../../../core/file/useSaveAs';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../../store';

const SaveAsMenuItem = () => {
	const [editor] = useAtom(editorAtom);
	const { saveAs } = useSaveAs();

	const onSaveAsClick = () => {
		saveAs({ editor });
	};

	return (
		<div className={styles.title} onClick={onSaveAsClick}>
			{i18n.t('header.menu.saveAs')}
		</div>
	);
};

export default SaveAsMenuItem;
