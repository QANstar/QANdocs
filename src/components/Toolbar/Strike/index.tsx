import { StrikethroughOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextStyle from '../../../core/editor/useTextStyle';

const Strike = () => {
	const { isActive, toggleTextStyle } = useTextStyle({ type: 'strike' });

	return <ToolButton tooltip={i18n.t('toolbar.strikeThrough')} icon={<StrikethroughOutlined />} isActive={isActive} onClick={toggleTextStyle} />;
};

export default Strike;
