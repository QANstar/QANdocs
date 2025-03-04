import { dialog, ipcMain } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';

const setupFileExtension = () => {
	ipcMain.handle('save-document', async (_, args) => {
		const { defaultPath, fileData } = args;

		try {
			// 打开保存文件对话框
			const { canceled, filePath } = await dialog.showSaveDialog({
				defaultPath,
				filters: [{ name: 'QANdocs', extensions: ['qandocs'] }],
				properties: ['createDirectory'],
			});

			if (canceled || !filePath) {
				return { success: false };
			}

			// 确保文件以 .qandocs 结尾
			const finalPath = filePath.endsWith('.qandocs') ? filePath : `${filePath}.qandocs`;

			// 写入文件
			await fs.writeFile(finalPath, fileData, 'utf-8');

			return {
				success: true,
				fileName: path.basename(finalPath),
			};
		} catch (error) {
			console.error('保存文件失败:', error);
			return { success: false, error: String(error) };
		}
	});
};

export default setupFileExtension;
