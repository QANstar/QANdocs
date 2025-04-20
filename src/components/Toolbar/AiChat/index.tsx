import { RobotOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import { useAtom } from 'jotai';
import { isAiChatAciveAtom } from '../../../store';

const AiChat = () => {
	const [isAiChatAcive, setIsAiChatAcive] = useAtom(isAiChatAciveAtom);

	return (
		<ToolButton
			tooltip={i18n.t('toolbar.aiChat')}
			icon={<RobotOutlined />}
			isActive={isAiChatAcive}
			onClick={() => {
				setIsAiChatAcive(!isAiChatAcive);
			}}
		/>
	);
};

export default AiChat;
