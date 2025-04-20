import { IAiChatMessage, IOllamaChatResponse, IOllamaModelInfo } from '../types/ai';
import http from './request';

export const listModels = (options: { url: string }) => {
	return http.get<{ models: IOllamaModelInfo[] }>(`${options.url}/api/tags`);
};

export const chat = (options: { url: string; model: string; messages: IAiChatMessage[] }) => {
	const { model, messages } = options;
	return http.post<IOllamaChatResponse>(`${options.url}/api/chat`, {
		model,
		messages,
	});
};
