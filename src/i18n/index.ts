import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from './zh-CN.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: 'zh',
		interpolation: {
			escapeValue: false,
		},
		resources: {
			zh: {
				translation: zh,
			},
		},
	});

export default i18n;
