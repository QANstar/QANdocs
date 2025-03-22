import { useAtom } from 'jotai';
import { aiAtom } from '../../store/ai';
import { IAiSetting } from '../../types/ai';
import useAiLocal from './useAiLocal';

const useAiChat = () => {
	const { getAiLocalData, editAiModelLocalConfig } = useAiLocal();
	const [aiSetting, setAiSetting] = useAtom(aiAtom);

	const editModelConfig = (data: IAiSetting) => {
		setAiSetting(data);
		editAiModelLocalConfig(data);
	};

	const init = async () => {
		const aiLocalData = await getAiLocalData();
		if (!aiLocalData) return;
		const setting = aiLocalData.settings.find((setting) => setting.type === aiLocalData.type);
		if (!setting) return;
		setAiSetting(setting);
	};

	return {
		aiSetting,
		init,
		editModelConfig,
	};
};

export default useAiChat;
