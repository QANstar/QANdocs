"use strict";
const electron = require("electron");
const frameApi$1 = {
  // 最小化窗口
  minimize: () => {
    electron.ipcRenderer.send("window-minimize");
  },
  // 最大化或恢复窗口
  toggleMaximize: () => {
    electron.ipcRenderer.send("window-maximize");
  },
  // 关闭窗口
  close: () => {
    electron.ipcRenderer.send("window-close");
  }
};
const frameApi = {
  // 另存为
  saveAs: async (options) => {
    const { defaultPath, fileData, fileName } = options;
    return await electron.ipcRenderer.invoke("save-document", {
      defaultPath: defaultPath || `${fileName}.qandocs`,
      fileData: JSON.stringify(fileData)
    });
  }
};
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("electronAPI", {
  frame: frameApi$1,
  file: frameApi
});
