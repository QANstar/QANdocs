import { ipcRenderer } from 'electron';
import { IFileApi, IFileSaveAsOptions } from '../../type';

const frameApi: IFileApi = {
	// 另存为
	saveAs: async (options: IFileSaveAsOptions) => {
		const { defaultPath, fileData, fileName } = options;
		return await ipcRenderer.invoke('save-document', {
			defaultPath: defaultPath || `${fileName}.qandocs`,
			fileData: JSON.stringify(fileData),
		});
	},
};

// 窗口控制相关功能
export default frameApi;
