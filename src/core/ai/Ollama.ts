import OpenAI from 'openai';
import { AiType, IAiChatMessage, IAiChatModel, IAiSetting, IModel } from '../../types/ai';

class Ollama implements IAiChatModel {
	public info: IAiSetting = {
		type: AiType.Ollama,
		url: '',
		model: '',
		apiKey: 'ollama',
	};
	private openai: OpenAI | null = null;

	constructor(info: { url?: string; model?: string }) {
		const { url = this.info.url, model = this.info.model } = info;
		this.info.model = model;
		this.openai = new OpenAI({
			apiKey: 'ollama',
			baseURL: url,
			dangerouslyAllowBrowser: true,
		});
	}

	public edit = (data: IAiSetting) => {
		this.info.url = data.url;
		this.info.model = data.model;
		this.openai = new OpenAI({
			apiKey: data.apiKey,
			baseURL: data.url,
			dangerouslyAllowBrowser: true,
		});
	};

	public async getModelList() {
		if (!this.openai) {
			throw new Error('Ollama未初始化');
		}
		const models = ((await this.openai?.models.list()) || []).data.map((item) => ({ id: item.id })) as IModel[];
		return models;
	}

	public async chat(messages: IAiChatMessage[]) {
		if (!this.openai || !this.info.model) {
			throw new Error('Ollama未初始化');
		}
		const response = await this.openai.chat.completions.create({
			messages: messages,
			model: this.info.model,
		});
		if (response.choices.length > 0) {
			return response.choices[0].message.content || '';
		} else {
			throw new Error('No response from Ollama');
		}
	}
}

export default Ollama;
