import OpenAI from 'openai';
import { AiType, IAiChatModel, IAiSetting, IModel } from '../../types/ai';

const DEEPSEEK_URL = 'https://api.deepseek.com';

class DeepSeek implements IAiChatModel {
	public info: IAiSetting = {
		type: AiType.DeepSeek,
		apiKey: '',
		model: '',
	};
	private deepseek: OpenAI | null = null;

	constructor(info: { apiKey?: string; model?: string }) {
		const { apiKey = this.info.apiKey, model = this.info.model } = info;
		this.info.apiKey = apiKey;
		this.info.model = model;
		this.deepseek = new OpenAI({
			apiKey: info.apiKey,
			baseURL: DEEPSEEK_URL,
			dangerouslyAllowBrowser: true,
		});
	}

	public edit = (data: IAiSetting) => {
		this.info.apiKey = data.apiKey;
		this.info.model = data.model;
		this.deepseek = new OpenAI({
			apiKey: data.apiKey,
			baseURL: DEEPSEEK_URL,
			dangerouslyAllowBrowser: true,
		});
	};

	public async getModelList() {
		if (!this.deepseek) {
			throw new Error('DeepSeek未初始化');
		}
		const models = ((await this.deepseek?.models.list()) || []).data.map((item) => ({ id: item.id })) as IModel[];
		return models;
	}
}

export default DeepSeek;
