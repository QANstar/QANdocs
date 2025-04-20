import { useState } from 'react';
import i18n from '../../i18n';
import { IAiChatModel, IAiSetting, IChatMessage, IModel } from '../../types/ai';
import AiManager from './AiManager';

const useAiChat = () => {
	let model: IAiChatModel | null = null;
	const [initialized, setInitialized] = useState<boolean>(false);
	const [models, setModels] = useState<IModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [messages, setMessages] = useState<IChatMessage[]>([]);

	const init = (options: IAiSetting) => {
		setError('');

		try {
			model = AiManager.createAiChatModel(options);
			setInitialized(true);
		} catch (error) {
			setError(i18n.t('header.setting.ai.initFailed'));
		}
	};

	const getModelList = async () => {
		if (!model) {
			throw new Error('未初始化');
		}
		setError('');
		setLoading(true);
		try {
			const models = await model.getModelList();
			setModels(models);
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
		messages,
		init,
		getModelList,
	};
};

export default useAiChat;
