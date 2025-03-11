import { PlusCircleOutlined } from '@ant-design/icons';
import ToolButton from '../../../components-common/ToolButton';
import i18n from '../../../i18n';

const MoreMenu = () => {
	return <ToolButton tooltip={i18n.t('toolbar.more')} icon={<PlusCircleOutlined />} />;
};

export default MoreMenu;
