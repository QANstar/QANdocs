import { Select } from 'antd';
import { SUPPORTED_API } from './config';
import { useMemo, useState } from 'react';
import styles from './index.module.less';
import i18n from '../../../../i18n';
import DeepSeek from './deepseek';
import { AiType, IAiSetting } from '../../../../types/ai';
import Ollama from './ollama';
import useAiChat from '../../../../core/ai/useAiChat';

const AiSetting = () => {
	const { aiSetting, editModelConfig } = useAiChat();
	const [activeApi, setActiveApi] = useState(aiSetting?.type || SUPPORTED_API[0].value);

	const onModelSave = (data: IAiSetting) => {
		editModelConfig(data);
	};

	const apiSetting = [
		{
			value: AiType.DeepSeek,
			children: <DeepSeek onSave={onModelSave} />,
		},
		{
			value: AiType.Ollama,
			children: <Ollama />,
		},
	];

	const getCurrentSetting = useMemo(() => {
		const setting = apiSetting.find((item) => item.value === activeApi);
		return setting?.children;
	}, [activeApi]);

	return (
		<div className={styles.setting}>
			<div className={styles.settingItem}>
				<div className={styles.label}>{i18n.t('header.setting.ai.apiSelect')}：</div>
				<Select defaultValue={activeApi} onChange={(val) => setActiveApi(val)} style={{ width: 120 }} options={SUPPORTED_API} />
			</div>
			<div>{getCurrentSetting}</div>
		</div>
	);
};

export default AiSetting;
