import { useState } from 'react';
import i18n from '../../i18n';
import { ChatMessageType, ChatRole, IAiChatModel, IAiSetting, IChatMessage, IModel } from '../../types/ai';
import AiManager from './AiManager';

const useAiChat = () => {
	const [model, setModel] = useState<IAiChatModel | null>(null);
	const [initialized, setInitialized] = useState<boolean>(false);
	const [models, setModels] = useState<IModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [chatLoading, setChatLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [messages, setMessages] = useState<IChatMessage[]>([]);

	const init = (options: IAiSetting) => {
		setError('');
		try {
			setModel(AiManager.createAiChatModel(options));
			// 使用函数式更新确保我们获得最新状态
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

	const chat = async (content: string) => {
		if (!model) {
			throw new Error('未初始化');
		}
		setError('');
		setChatLoading(true);
		try {
			const message: IChatMessage = {
				id: crypto.randomUUID(),
				role: ChatRole.USER,
				content,
				type: ChatMessageType.NORMAL,
			};
			messages.push(message);
			setMessages([...messages]);
			const response = await model.chat([message]);
			setMessages([
				...messages,
				{
					id: crypto.randomUUID(),
					role: ChatRole.ASSISTANT,
					content: response,
					type: ChatMessageType.NORMAL,
				},
			]);
			return response;
		} catch (error) {
			setError(i18n.t('header.setting.ai.chatFailed'));
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setMessages([]);
		setError('');
		setLoading(false);
		setChatLoading(false);
	};

	return {
		initialized,
		error,
		loading,
		models,
		messages,
		chatLoading,
		model,
		init,
		chat,
		getModelList,
		reset,
	};
};

export default useAiChat;
