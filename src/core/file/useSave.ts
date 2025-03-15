import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { fileNameAtom, filePathAtom } from '../../store/file';
import { useAtom } from 'jotai';
import { ISaveData } from '../../types/file';
import { getFileNameWithoutSuffix } from '../../utils/file';
import { editorAtom } from '../../store';

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
const useSave = () => {
	const [fileName, setFileName] = useAtom(fileNameAtom);
	const [filePath, setFilePath] = useAtom(filePathAtom);
	const [editor] = useAtom(editorAtom);

	const getSaveData = useCallback((editor: Editor) => {
		// 获取编辑器内容
		const content = editor.getJSON();
		const markdown = editor.storage.markdown?.getMarkdown() || '';

		// 准备保存的数据
		const fileData: ISaveData = {
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
					const newFileName = getFileNameWithoutSuffix(result.fileName || fileName);
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

	const open = useCallback(async () => {
		const result = await window.electronAPI.file.open();
		const newFileName = getFileNameWithoutSuffix(result.fileName || fileName);
		setFileName(newFileName);
		if (result.path) setFilePath(result.path);
		if (result.success && result.fileData) {
			return JSON.parse(result.fileData) as ISaveData;
		}
		return '';
	}, [fileName, setFileName, setFilePath]);

	const loadSaveFile = useCallback(async () => {
		const { success, filePath } = await window.electronAPI.file.getEntranceInfo();
		if (!success || !filePath) return;
		const result = await window.electronAPI.file.readFile(filePath);
		const newFileName = getFileNameWithoutSuffix(result.fileName || fileName);
		setFileName(newFileName);
		if (result.path) setFilePath(result.path);
		if (result.success && result.fileData) {
			const { content } = JSON.parse(result.fileData) as ISaveData;
			editor?.commands.setContent(content);
		}
	}, [editor?.commands, fileName, setFileName, setFilePath]);

	return { saveAs, save, open, loadSaveFile };
};

export default useSave;
