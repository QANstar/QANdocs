import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { fileNameAtom, filePathAtom } from '../../store/file';
import { useAtom } from 'jotai';
import { fileSuffix } from '../../../share/config';

interface SaveAsOptions {
	editor: Editor | null;
	defaultPath?: string;
}

interface SaveOptions {
	editor: Editor | null;
}

/**
 * 提供将编辑器内容另存为.qandocs文件的功能
 */
const useSaveAs = () => {
	const [fileName, setFileName] = useAtom(fileNameAtom);
	const [filePath, setFilePath] = useAtom(filePathAtom);

	const getSaveData = useCallback((editor: Editor) => {
		// 获取编辑器内容
		const content = editor.getHTML();
		const markdown = editor.storage.markdown?.getMarkdown() || '';

		// 准备保存的数据
		const fileData = {
			content,
			markdown,
			version: '1.0.0', // 文件版本
			updatedAt: new Date().toISOString(),
		};

		return fileData;
	}, []);

	/**
	 * 将编辑器内容另存为.qandocs文件
	 * @param options 保存选项
	 * @returns Promise<boolean> 是否保存成功
	 */
	const saveAs = useCallback(
		async (options: SaveAsOptions): Promise<boolean> => {
			const { editor, defaultPath } = options;

			if (!editor) {
				console.error('编辑器实例不存在');
				return false;
			}

			try {
				// 准备保存的数据
				const fileData = getSaveData(editor);

				// 调用 Electron 的 dialog.showSaveDialog
				const result = await window.electronAPI.file.saveAs({ defaultPath, fileName, fileData: JSON.stringify(fileData) });

				if (result.success) {
					// 更新文件名状态
					const newFileName = result.fileName.split(/[/\\]/).pop()?.replace(`.${fileSuffix}`, '') || fileName;
					setFileName(newFileName);
					setFilePath(result.path);
					return true;
				}

				return false;
			} catch (error) {
				console.error('保存文件失败:', error);
				return false;
			}
		},
		[fileName, getSaveData, setFileName, setFilePath]
	);

	const save = useCallback(
		async (options: SaveOptions): Promise<boolean> => {
			const { editor } = options;
			if (!editor) {
				console.error('编辑器实例不存在');
				return false;
			}
			if (!filePath) {
				return saveAs({ editor: options.editor });
			}

			// 准备保存的数据
			const fileData = getSaveData(editor);

			// 调用 Electron 的 dialog.showSaveDialog
			const result = await window.electronAPI.file.save({ path: filePath, fileData: JSON.stringify(fileData) });

			if (result.success) {
				return true;
			}

			return false;
		},
		[filePath, getSaveData, saveAs]
	);

	return { saveAs, save };
};

export default useSaveAs;
