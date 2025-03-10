import { UnorderedListOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextList from '../../../core/editor/useTextList';

const OrderedList = () => {
	const { isActive, toggleList } = useTextList({ type: 'orderedList' });

	return <ToolButton tooltip={i18n.t('toolbar.insertOrderedList')} icon={<UnorderedListOutlined />} onClick={toggleList} isActive={isActive} />;
};

export default OrderedList;
