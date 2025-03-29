import { useEffect, useState } from 'react';
import { Input, Button, message, Spin, Space, Select } from 'antd';
import i18n from '../../../../i18n';
import styles from './index.module.less';
import useAiChat from '../../../../core/ai/useAiChat.ts';
import { AiType, IAiSetting } from '../../../../types/ai';
import useAiLocal from '../../../../core/ai/useAiLocal';

interface IOllamaProps {
	onSave: (data: IAiSetting) => void;
}

const Ollama = (props: IOllamaProps) => {
	const { onSave } = props;
	const { aiLocalData, getModelDataWithTypes } = useAiLocal();
	const { models, initialized, loading, error, init, getModelList } = useAiChat();
	const [modelData, setModelData] = useState<IAiSetting>({ type: AiType.Ollama, url: '', model: '' });

	// 保存API Key并获取模型列表
	const handleSaveApiKey = async () => {
		// 获取模型列表
		modelData.apiKey && fetchModelList(modelData.apiKey);
	};

	// 获取模型列表
	const fetchModelList = async (url: string) => {
		init({ type: AiType.Ollama, url });
		getModelList();
	};

	const initModel = async () => {
		const data = await getModelDataWithTypes(AiType.Ollama);
		if (!data) return;
		setModelData(data);
		if (data.apiKey) {
			fetchModelList(data.apiKey);
		}
	};

	const handleSave = () => {
		onSave(modelData);
	};

	useEffect(() => {
		if (error) {
			message.error(error);
		}
	}, [error]);

	useEffect(() => {
		initModel();
	}, [aiLocalData]);

	return (
		<>
			<div className={styles.settingItem}>
				<div className={styles.label}>{i18n.t('header.setting.ai.url')}：</div>
				<Space>
					<Input
						style={{ width: 220 }}
						value={modelData.apiKey}
						onChange={(e) => {
							modelData.apiKey = e.target.value;
							setModelData({ ...modelData });
						}}
						placeholder={i18n.t('header.setting.ai.urlPlaceholder')}
					/>
					<Button type="primary" onClick={handleSaveApiKey}>
						{i18n.t('header.setting.ai.confirm')}
					</Button>
				</Space>
			</div>

			{loading && (
				<div className={styles.loadingContainer}>
					<Spin />
				</div>
			)}

			{initialized && models.length > 0 && (
				<>
					<div className={styles.settingItem}>
						<div className={styles.label}>{i18n.t('header.setting.ai.availableModels')}：</div>
						<Select
							style={{ width: 200 }}
							value={modelData.model}
							onChange={(val) => {
								modelData.model = val;
								setModelData({ ...modelData });
							}}
							options={models.map((model) => ({
								value: model.id,
								label: model.id,
							}))}
						/>
					</div>

					<div className={styles.saveBtnWarp}>
						<Button type="primary" onClick={handleSave} className={styles.saveBtn}>
							{i18n.t('header.setting.ai.save')}
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default Ollama;
