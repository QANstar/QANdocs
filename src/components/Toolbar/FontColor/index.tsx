import { ColorPicker } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';
import i18n from '../../../i18n';
import { presetColors } from './config';
import ToolButton from '../../../components-common/ToolButton';
import useTextColor from '../../../core/editor/useTextColor';

const FontColor = () => {
	const { currentColor, setColor } = useTextColor();

	return (
		<ColorPicker
			value={currentColor}
			onChange={(color) => setColor(color.toHexString())}
			presets={[
				{
					label: i18n.t('toolbar.commonColors'),
					colors: presetColors,
				},
			]}
			showText
			disabledAlpha
		>
			<div>
				<ToolButton tooltip={i18n.t('toolbar.fontColor')} icon={<FontColorsOutlined style={{ color: currentColor }} />} />
			</div>
		</ColorPicker>
	);
};

export default FontColor;
