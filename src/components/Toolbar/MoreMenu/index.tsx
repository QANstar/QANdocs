import { PlusCircleOutlined, TableOutlined, PictureOutlined } from '@ant-design/icons';
import ToolButton from '../../../components-common/ToolButton';
import i18n from '../../../i18n';
import { Dropdown, MenuProps } from 'antd';
import Picture from './Picture';
import Table from './Table';

const items: MenuProps['items'] = [
	{
		key: 'image',
		icon: <PictureOutlined />,
		label: <Picture />,
	},
	{
		key: 'table',
		icon: <TableOutlined />,
		label: <Table />,
	},
];

const MoreMenu = () => {
	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<div>
				<ToolButton tooltip={i18n.t('toolbar.more')} icon={<PlusCircleOutlined />} />
			</div>
		</Dropdown>
	);
};

export default MoreMenu;
