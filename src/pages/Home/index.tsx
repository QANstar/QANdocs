import Content from '../../components/Contetnt';
import Header from '../../components/Header';
import styles from './index.module.less';

const Home = () => {
	return (
		<div className={styles.home}>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.main}>
				<Content />
			</main>
		</div>
	);
};

export default Home;
