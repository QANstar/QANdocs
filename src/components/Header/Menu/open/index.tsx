import { useAtom } from 'jotai';
import useSave from '../../../../core/file/useSave';
import i18n from '../../../../i18n';
import styles from '../index.module.less';
import { editorAtom } from '../../../../store';

const OpenMenuItem = () => {
	const { open } = useSave();
	const [editor] = useAtom(editorAtom);

	const onOpenClick = async () => {
		const result = await open();
		if (result) {
			const { content } = result;
			editor?.commands.setContent(content);
		}
	};

	return (
		<div className={styles.title} onClick={onOpenClick}>
			{i18n.t('header.menu.open')}
		</div>
	);
};

export default OpenMenuItem;
