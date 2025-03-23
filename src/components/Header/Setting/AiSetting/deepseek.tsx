import { useEffect, useState } from 'react';
import { Input, Button, message, Spin, Space, Select } from 'antd';
import i18n from '../../../../i18n';
import styles from './index.module.less';
import useAiChat from '../../../../core/ai/useAiChat.ts';
import { AiType, IAiSetting } from '../../../../types/ai';
import useAiLocal from '../../../../core/ai/useAiLocal';

interface IDeepSeekProps {
	onSave: (data: IAiSetting) => void;
}

const DeepSeek = (props: IDeepSeekProps) => {
	const { onSave } = props;
	const { aiLocalData, getModelDataWithTypes } = useAiLocal();
	const { models, initialized, loading, error, init, getModelList } = useAiChat();
	const [modelData, setModelData] = useState<IAiSetting>({ type: AiType.DeepSeek, apiKey: '', model: '' });

	// 保存API Key并获取模型列表
	const handleSaveApiKey = async () => {
		// 获取模型列表
		modelData.apiKey && fetchModelList(modelData.apiKey);
	};

	// 获取模型列表
	const fetchModelList = async (key: string) => {
		init({ type: AiType.DeepSeek, apiKey: key });
		getModelList();
	};

	const initModel = async () => {
		const data = await getModelDataWithTypes(AiType.DeepSeek);
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
				<div className={styles.label}>{i18n.t('header.setting.ai.apiKey')}：</div>
				<Space>
					<Input.Password
						style={{ width: 220 }}
						value={modelData.apiKey}
						onChange={(e) => {
							modelData.apiKey = e.target.value;
							setModelData({ ...modelData });
						}}
						placeholder={i18n.t('header.setting.ai.apiKeyPlaceholder')}
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

export default DeepSeek;
