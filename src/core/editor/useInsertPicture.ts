import { useAtom } from 'jotai';
import { editorAtom } from '../../store';
import { RefObject } from 'react';

interface IUseInsertPictureOptions {
	input: RefObject<HTMLInputElement>;
}

const useInsertPicture = (options: IUseInsertPictureOptions) => {
	const { input } = options;
	const [editor] = useAtom(editorAtom);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editor || !e.target.files || e.target.files.length === 0) {
			return;
		}

		const path = e.target.files[0].path;
		const name = e.target.files[0].name;

		const { success, data } = await window.electronAPI.file.readImg(path);

		if (success && data) {
			editor.chain().focus().setImage({ src: data, alt: name }).run();
		}

		// 清空文件输入，以便可以再次选择同一个文件
		if (input.current) {
			input.current.value = '';
		}
	};

	return { handleImageUpload };
};

export default useInsertPicture;
