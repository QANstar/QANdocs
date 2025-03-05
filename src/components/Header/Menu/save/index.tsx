import { useAtom } from 'jotai';
import i18n from '../../../../i18n';
import styles from '../index.module.less';
import { editorAtom } from '../../../../store';
import useSave from '../../../../core/file/useSave';

const SaveMenuItem = () => {
	const [editor] = useAtom(editorAtom);
	const { save } = useSave();

	const onSaveClick = () => {
		save({ editor });
	};

	return (
		<div onClick={onSaveClick} className={styles.title}>
			{i18n.t('header.menu.save')}
		</div>
	);
};

export default SaveMenuItem;
