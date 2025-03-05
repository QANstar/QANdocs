import { ipcRenderer } from 'electron';
import { IFileApi, IFileSaveAsOptions, IFileSaveOptions } from '../../type';
import { fileSuffix } from '../../../share/config';

const frameApi: IFileApi = {
	// 另存为
	saveAs: async (options: IFileSaveAsOptions) => {
		const { defaultPath, fileData, fileName } = options;
		return await ipcRenderer.invoke('saveas-document', {
			defaultPath: defaultPath || `${fileName}.${fileSuffix}`,
			fileData: JSON.stringify(fileData),
		});
	},
	save: async (options: IFileSaveOptions) => {
		const { fileData, path } = options;
		return await ipcRenderer.invoke('save-document', {
			path,
			fileData: JSON.stringify(fileData),
		});
	},
	open: async () => {
		return await ipcRenderer.invoke('open-document');
	},
};

// 窗口控制相关功能
export default frameApi;
