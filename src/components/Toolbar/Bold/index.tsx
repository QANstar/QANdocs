import { BoldOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextStyle from '../../../core/editor/useTextStyle';

const Bold = () => {
	const { isActive, toggleTextStyle } = useTextStyle({ type: 'bold' });

	return <ToolButton tooltip={i18n.t('toolbar.bold')} icon={<BoldOutlined />} isActive={isActive} onClick={toggleTextStyle} />;
};

export default Bold;
