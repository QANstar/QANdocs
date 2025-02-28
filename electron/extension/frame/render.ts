import { ipcRenderer } from 'electron';
import { IFrameApi } from '../../type';

const frameApi: IFrameApi = {
	// 最小化窗口
	minimize: () => {
		ipcRenderer.send('window-minimize');
	},

	// 最大化或恢复窗口
	toggleMaximize: () => {
		ipcRenderer.send('window-maximize');
	},

	// 关闭窗口
	close: () => {
		ipcRenderer.send('window-close');
	},
};

// 窗口控制相关功能
export default frameApi;
