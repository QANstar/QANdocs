import { ItalicOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextStyle from '../../../core/editor/useTextStyle';

const Italic = () => {
	const { isActive, toggleTextStyle } = useTextStyle({ type: 'italic' });

	return <ToolButton tooltip={i18n.t('toolbar.italic')} icon={<ItalicOutlined />} isActive={isActive} onClick={toggleTextStyle} />;
};

export default Italic;
