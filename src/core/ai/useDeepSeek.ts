import OpenAI from 'openai';
import { Model } from 'openai/resources/models.mjs';
import { useState } from 'react';
import i18n from '../../i18n';

const DEEPSEEK_URL = 'https://api.deepseek.com';

const useDeepSeek = () => {
	let deepseek: OpenAI | null = null;
	const [initialized, setInitialized] = useState<boolean>(false);
	const [models, setModels] = useState<Model[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const initDeepSeek = (apiKey: string) => {
		setError('');
		if (!apiKey.trim()) {
			setError(i18n.t('header.setting.ai.apiKeyRequired'));
			return;
		}

		try {
			deepseek = new OpenAI({
				apiKey,
				baseURL: DEEPSEEK_URL,
				dangerouslyAllowBrowser: true,
			});
			setInitialized(true);
		} catch (error) {
			setError(i18n.t('header.setting.ai.initFailed'));
		}
	};

	const getModelList = async () => {
		if (!deepseek) {
			throw new Error('DeepSeek未初始化');
		}
		setError('');
		setLoading(true);
		try {
			const models = await deepseek.models.list();
			setModels(models.data);
		} catch (error) {
			setError(i18n.t('header.setting.ai.getModelsFailed'));
		} finally {
			setLoading(false);
		}
	};

	return {
		initialized,
		error,
		loading,
		models,
		initDeepSeek,
		getModelList,
	};
};

export default useDeepSeek;
