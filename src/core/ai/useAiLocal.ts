import { useEffect, useState } from 'react';
import { IAiSetting, ILocalAiConfig } from '../../types/ai';

const LOCAL_KEY = 'aiLocal';

const useAiLocal = () => {
	const [aiLocalData, setAiLocalData] = useState<ILocalAiConfig>();

	const getAiLocalData = async () => {
		const { success, data } = await window.electronAPI.config.get({ key: LOCAL_KEY });
		if (!success || !data) return;
		const aiLocalData = JSON.parse(data) as ILocalAiConfig;
		console.log('getAiLocalData', aiLocalData);

		setAiLocalData(aiLocalData);
		return aiLocalData;
	};

	const editAiModelLocalConfig = async (data: IAiSetting) => {
		if (!aiLocalData) {
			const setting: ILocalAiConfig = {
				type: data.type,
				settings: [data],
			};
			setAiLocalData(setting);
			setLocalData(setting);
			return;
		}

		const setting = aiLocalData.settings.find((setting) => setting.type === data.type);
		if (setting) {
			setting.apiKey = data.apiKey;
			setting.url = data.url;
			setting.model = data.model;
		} else {
			aiLocalData.settings.push(data);
		}
		aiLocalData.type = data.type;
		setAiLocalData({ ...aiLocalData });
		setLocalData(aiLocalData);
	};

	const setLocalData = async (localConfig: ILocalAiConfig) => {
		await window.electronAPI.config.set({ key: LOCAL_KEY, value: JSON.stringify(localConfig) });
	};

	const getModelDataWithTypes = async (type: string) => {
		if (!aiLocalData) return;
		return aiLocalData.settings.find((setting) => setting.type === type);
	};

	useEffect(() => {
		getAiLocalData();
	}, []);

	return {
		aiLocalData,
		getAiLocalData,
		editAiModelLocalConfig,
		getModelDataWithTypes,
	};
};

export default useAiLocal;
