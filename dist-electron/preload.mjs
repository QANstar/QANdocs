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
const fileSuffix = "qd";
const frameApi = {
  // 另存为
  saveAs: async (options) => {
    const { defaultPath, fileData, fileName } = options;
    return await electron.ipcRenderer.invoke("saveas-document", {
      defaultPath: defaultPath || `${fileName}.${fileSuffix}`,
      fileData
    });
  },
  save: async (options) => {
    const { fileData, path } = options;
    return await electron.ipcRenderer.invoke("save-document", {
      path,
      fileData
    });
  },
  open: async () => {
    return await electron.ipcRenderer.invoke("open-document");
  },
  readImg: async (path) => {
    return await electron.ipcRenderer.invoke("read-image-file", path);
  },
  readFile: async (path) => {
    return await electron.ipcRenderer.invoke("read-qd-file", path);
  },
  getEntranceInfo: async () => {
    return await electron.ipcRenderer.invoke("get-entrance-info");
  }
};
const configApi = {
  get: async (options) => {
    const { key } = options;
    const result = await electron.ipcRenderer.invoke("get-secure-config", key);
    return {
      success: true,
      data: result
    };
  },
  set: async (options) => {
    const { key, value } = options;
    const result = await electron.ipcRenderer.invoke("set-secure-config", { key, value });
    return {
      success: result.success
    };
  },
  remove: async (options) => {
    const { key } = options;
    const result = await electron.ipcRenderer.invoke("delete-secure-config", key);
    return {
      success: result.success
    };
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
  file: frameApi,
  config: configApi
});
