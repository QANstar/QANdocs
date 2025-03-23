export enum AiType {
	DeepSeek = 'deepseek',
	Ollama = 'ollama',
}

export interface IModel {
	id: string;
}

export interface IAiSetting {
	type: AiType;
	apiKey?: string;
	url?: string;
	model?: string;
}

export interface ILocalAiConfig {
	type: AiType;
	settings: IAiSetting[];
}

export interface IAiChatModel {
	info: IAiSetting;
	edit: (data: IAiSetting) => void;
	getModelList: () => Promise<IModel[]>;
}

export interface IOllamaModelInfo {
	name: string;
	size: string;
	modified_at: string;
}
