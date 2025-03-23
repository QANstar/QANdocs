import { AiType, IAiChatModel, IAiSetting } from '../../types/ai';
import DeepSeek from './DeepSeek';
import Ollama from './Ollama';

class AiManager {
	public static createAiChatModel(setting: IAiSetting): IAiChatModel {
		switch (setting.type) {
			case AiType.DeepSeek:
				return new DeepSeek({ apiKey: setting.apiKey, model: setting.model });
			case AiType.Ollama:
				return new Ollama(setting);
			default:
				throw new Error(`暂不支持的 AI 类型: ${setting.type}`);
		}
	}
}

export default AiManager;
