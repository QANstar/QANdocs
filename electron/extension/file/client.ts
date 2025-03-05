import { dialog, ipcMain } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileSuffix } from '../../../share/config';
import { IFileOpenResult, IFileSaveOptions, IFileSaveResult } from '../../type';

const setupFileExtension = () => {
	ipcMain.handle('saveas-document', async (_, args) => {
		const { defaultPath, fileData } = args;

		try {
			// 打开保存文件对话框
			const { canceled, filePath } = await dialog.showSaveDialog({
				defaultPath,
				filters: [{ name: 'QANdocs', extensions: [fileSuffix] }],
				properties: ['createDirectory'],
			});

			if (canceled || !filePath) {
				return { success: false };
			}

			// 确保文件以 .qandocs 结尾
			const finalPath = filePath.endsWith(`.${fileSuffix}`) ? filePath : `${filePath}.${fileSuffix}`;

			// 写入文件
			await fs.writeFile(finalPath, fileData, 'utf-8');

			return {
				success: true,
				fileName: path.basename(finalPath),
				path: finalPath,
			};
		} catch (error) {
			console.error('保存文件失败:', error);
			return { success: false, error: String(error) };
		}
	});

	ipcMain.handle('save-document', async (_, args: IFileSaveOptions): Promise<IFileSaveResult> => {
		const { path: pathName, fileData } = args;
		try {
			// 确保文件以 .qd 结尾
			const finalPath = pathName.endsWith(`.${fileSuffix}`) ? pathName : `${path.basename(pathName)}.${fileSuffix}`;

			// 写入文件
			await fs.writeFile(finalPath, fileData, 'utf-8');

			return {
				success: true,
			};
		} catch (error) {
			console.error('保存文件失败:', error);
			return { success: false, error: String(error) };
		}
	});

	ipcMain.handle('open-document', async (): Promise<IFileOpenResult> => {
		try {
			// 打开文件选择对话框
			const { canceled, filePaths } = await dialog.showOpenDialog({
				filters: [{ name: 'QANdocs', extensions: [fileSuffix] }],
				properties: ['openFile'],
			});

			if (canceled || filePaths.length === 0) {
				return { success: false };
			}

			// 获取选择的文件路径
			const filePath = filePaths[0];

			// 读取文件内容
			const fileContent = await fs.readFile(filePath, 'utf-8');

			return {
				path: filePath,
				fileName: path.basename(filePath),
				success: true,
				fileData: fileContent,
			};
		} catch (error) {
			console.error('打开文件失败:', error);
			return { success: false, error: String(error) };
		}
	});
};

export default setupFileExtension;
