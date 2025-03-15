import { BrowserWindow } from 'electron';

export const registerDevtoolsHotkey = (win: BrowserWindow) => {
	// 添加键盘事件监听
	win.webContents.on('before-input-event', (event, input) => {
		// 监听 F12 按键
		if (input.key === 'F12' && !input.alt && !input.control && !input.meta && !input.shift) {
			console.log('F12 按键被捕获');
			const webContents = win?.webContents;
			if (webContents) {
				if (webContents.isDevToolsOpened()) {
					webContents.closeDevTools();
				} else {
					webContents.openDevTools({ mode: 'detach' });
				}
			}
			event.preventDefault();
		}
	});
};
