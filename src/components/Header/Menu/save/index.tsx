import i18n from '../../../../i18n';
import styles from '../index.module.less';

const SaveMenuItem = () => {
	return <div className={styles.title}>{i18n.t('header.menu.save')}</div>;
};

export default SaveMenuItem;
