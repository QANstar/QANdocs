import { BrowserWindow, ipcMain } from 'electron';

const setupFrameExtension = () => {
// 处理窗口最小化请求
ipcMain.on('window-minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.minimize();
    }
  });
  
  // 处理窗口最大化/恢复请求
  ipcMain.on('window-maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });
  
  // 处理窗口关闭请求
  ipcMain.on('window-close', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.close();
    }
  });
  
}


export default setupFrameExtension