import { useRef } from 'react';
import i18n from '../../../../i18n';
import useInsertPicture from '../../../../core/editor/useInsertPicture';

const Picture = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { handleImageUpload } = useInsertPicture({ input: fileInputRef });

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div>
			<input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
			<div onClick={handleClick}> {i18n.t('toolbar.insertImage')}</div>
		</div>
	);
};

export default Picture;
