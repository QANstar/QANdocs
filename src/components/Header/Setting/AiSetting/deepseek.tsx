import { useEffect, useState } from 'react';
import { Input, Button, message, Spin, Space, Select } from 'antd';
import i18n from '../../../../i18n';
import styles from './index.module.less';
import useDeepSeek from '../../../../core/ai/useDeepSeek';

const DeepSeek = () => {
	const { models, initialized, loading, error, initDeepSeek, getModelList } = useDeepSeek();
	const [apiKey, setApiKey] = useState<string>('');
	const [selectedModel, setSelectedModel] = useState<string>('');

	// 保存API Key并获取模型列表
	const handleSaveApiKey = async () => {
		// 获取模型列表
		fetchModelList(apiKey);
	};

	// 获取模型列表
	const fetchModelList = async (key: string) => {
		initDeepSeek(key);
		getModelList();
	};

	useEffect(() => {
		if (error) {
			message.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (models.length > 0) {
			setSelectedModel(models[0].id);
		}
	}, [models]);

	return (
		<>
			<div className={styles.settingItem}>
				<div className={styles.label}>{i18n.t('header.setting.ai.apiKey')}：</div>
				<Space>
					<Input.Password
						style={{ width: 220 }}
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
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
							value={selectedModel}
							onChange={(val) => setSelectedModel(val)}
							options={models.map((model) => ({
								value: model.id,
								label: model.id,
							}))}
						/>
					</div>

					<div className={styles.saveBtnWarp}>
						<Button type="primary" className={styles.saveBtn}>
							{i18n.t('header.setting.ai.save')}
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default DeepSeek;
