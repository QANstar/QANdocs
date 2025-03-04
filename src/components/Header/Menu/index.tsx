import { MenuProps } from 'antd';
import SaveMenuItem from './save';
import OpenMenuItem from './open';
import SaveAsMenuItem from './saveas';
import { FolderOpenOutlined, SaveFilled, SaveOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
	{
		key: 'open',
		label: <OpenMenuItem />,
		icon: <FolderOpenOutlined />,
	},
	{
		key: 'save',
		label: <SaveMenuItem />,
		icon: <SaveOutlined />,
	},
	{
		key: 'saveas',
		label: <SaveAsMenuItem />,
		icon: <SaveFilled />,
	},
];

export default items;
