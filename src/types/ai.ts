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
	chat: (messages: IAiChatMessage[]) => Promise<string>;
}

export interface IOllamaModelInfo {
	name: string;
	size: string;
	modified_at: string;
}

export enum ChatRole {
	USER = 'user',
	ASSISTANT = 'assistant',
}

export enum ChatMessageType {
	NORMAL = 'normal', // 普通消息
	REFERENCE = 'reference', // 引用原文
}

export interface IAiChatMessage {
	role: ChatRole;
	content: string;
}

export interface IChatMessage extends IAiChatMessage {
	type: ChatMessageType;
	id: string;
}

export interface IOllamaChatResponse {
	message: {
		role: string;
		content: string;
	};
	done: boolean;
}
