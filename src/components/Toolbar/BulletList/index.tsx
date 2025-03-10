import { UnorderedListOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import ToolButton from '../../../components-common/ToolButton';
import useTextList from '../../../core/editor/useTextList';

const BulletList = () => {
	const { isActive, toggleList } = useTextList({ type: 'bulletList' });

	return <ToolButton tooltip={i18n.t('toolbar.insertUnorderedList')} icon={<UnorderedListOutlined />} onClick={toggleList} isActive={isActive} />;
};

export default BulletList;
