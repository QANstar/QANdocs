import { IOllamaModelInfo } from '../types/ai';
import http from './request';

export const listModels = (options: { url: string }) => {
	return http.get<{ models: IOllamaModelInfo[] }>(`${options.url}/api/tags`);
};
