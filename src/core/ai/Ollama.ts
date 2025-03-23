import { listModels } from '../../service.ts/ollama';
import { AiType, IAiChatModel, IAiSetting, IModel } from '../../types/ai';

class DeepSeek implements IAiChatModel {
	public info: IAiSetting = {
		type: AiType.Ollama,
		url: '',
		model: '',
	};

	constructor(info: IAiSetting) {
		this.info = info;
	}

	public edit = (data: { url?: string; model?: string }) => {
		const { url = this.info.url, model = this.info.model } = data;
		this.info.url = url;
		this.info.model = model;
	};

	public async getModelList() {
		if (!this.info.url) {
			throw new Error('Ollama未初始化');
		}
		const models = (await listModels({ url: this.info.url })).models.map((item) => ({ id: item.name })) as IModel[];
		return models;
	}
}

export default DeepSeek;
