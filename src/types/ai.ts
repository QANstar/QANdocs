export enum AiType {
	DeepSeek = 'deepseek',
	Ollama = 'ollama',
}

export interface IAiSetting {
	type: AiType;
	apiKey?: string;
	url?: string;
	model?: string;
}
