import i18n from '../../../../i18n';
import styles from '../index.module.less';

const OpenMenuItem = () => {
	return <div className={styles.title}>{i18n.t('header.menu.open')}</div>;
};

export default OpenMenuItem;
