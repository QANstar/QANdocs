import i18n from '../../../../i18n';
import styles from '../index.module.less';

const SaveAsMenuItem = () => {
	return <div className={styles.title}>{i18n.t('header.menu.saveAs')}</div>;
};

export default SaveAsMenuItem;
