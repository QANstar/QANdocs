import { UnderlineOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextStyle from '../../../core/editor/useTextStyle';

const Underline = () => {
	const { isActive, toggleTextStyle } = useTextStyle({ type: 'underline' });

	return <ToolButton tooltip={i18n.t('toolbar.underline')} icon={<UnderlineOutlined />} isActive={isActive} onClick={toggleTextStyle} />;
};

export default Underline;
