import { ipcMain } from 'electron';
import Store from 'electron-store';
import { ENCRYPTION_KEY } from '../../config';

const encryptionKey = ENCRYPTION_KEY;

const store = new Store({
	name: 'qandocs-config',
	encryptionKey, // 启用加密
});

const setupConfigExtension = () => {
	// 获取配置
	ipcMain.handle('get-secure-config', (_, key) => {
		if (key) {
			return store.get(key);
		}
		return store.store; // 返回所有配置
	});

	// 设置配置
	ipcMain.handle('set-secure-config', (_, data) => {
		const { key, value } = data;
		store.set(key, value);
		return { success: true };
	});

	// 删除配置
	ipcMain.handle('delete-secure-config', (_, key) => {
		store.delete(key);
		return { success: true };
	});
};

export default setupConfigExtension;
