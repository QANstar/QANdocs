import { Button, Tooltip } from 'antd';
import styles from './index.module.less';
import { ReactNode } from 'react';

interface IToolButtonProps {
	tooltip?: string;
	icon?: ReactNode;
	isActive?: boolean;
	disabled?: boolean;
	onClick: () => void;
}

const ToolButton = (props: IToolButtonProps) => {
	const { tooltip, icon, isActive, disabled, onClick } = props;

	return (
		<Tooltip title={tooltip}>
			<Button
				type="text"
				disabled={disabled}
				icon={icon}
				onClick={onClick}
				className={`${styles.button} ${isActive ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
			/>
		</Tooltip>
	);
};

export default ToolButton;
