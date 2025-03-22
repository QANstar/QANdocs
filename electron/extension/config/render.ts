import { ipcRenderer } from 'electron';
import { IConfigApi } from '../../type';

const configApi: IConfigApi = {
	get: async (options) => {
		const { key } = options;
		const result = await ipcRenderer.invoke('get-secure-config', key);
		return {
			success: true,
			data: result,
		};
	},

	set: async (options) => {
		const { key, value } = options;
		const result = await ipcRenderer.invoke('set-secure-config', { key, value });
		return {
			success: result.success,
		};
	},

	remove: async (options) => {
		const { key } = options;
		const result = await ipcRenderer.invoke('delete-secure-config', key);
		return {
			success: result.success,
		};
	},
};

export default configApi;
