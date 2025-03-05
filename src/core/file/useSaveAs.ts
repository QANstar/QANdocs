import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { fileNameAtom } from '../../store/file';
import { useAtom } from 'jotai';
import { fileSuffix } from '../../../share/config';

interface SaveAsOptions {
	editor: Editor | null;
	defaultPath?: string;
}

/**
 * 提供将编辑器内容另存为.qandocs文件的功能
 */
const useSaveAs = () => {
	const [fileName, setFileName] = useAtom(fileNameAtom);

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

				// 调用 Electron 的 dialog.showSaveDialog
				const result = await window.electronAPI.file.saveAs({ defaultPath, fileName, fileData: JSON.stringify(fileData) });

				if (result.success) {
					// 更新文件名状态
					const newFileName = result.fileName.split(/[/\\]/).pop()?.replace(`.${fileSuffix}`, '') || fileName;
					setFileName(newFileName);
					return true;
				}

				return false;
			} catch (error) {
				console.error('保存文件失败:', error);
				return false;
			}
		},
		[fileName, setFileName]
	);

	return { saveAs };
};

export default useSaveAs;
