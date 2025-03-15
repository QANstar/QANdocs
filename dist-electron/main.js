import { ipcMain, BrowserWindow, dialog, app } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
const setupFrameExtension = () => {
  ipcMain.on("window-minimize", () => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) {
      win2.minimize();
    }
  });
  ipcMain.on("window-maximize", () => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) {
      if (win2.isMaximized()) {
        win2.unmaximize();
      } else {
        win2.maximize();
      }
    }
  });
  ipcMain.on("window-close", () => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) {
      win2.close();
    }
  });
};
const fileSuffix = "qd";
const setupFileExtension = () => {
  ipcMain.handle("saveas-document", async (_, args) => {
    const { defaultPath, fileData } = args;
    try {
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath,
        filters: [{ name: "QANdocs", extensions: [fileSuffix] }],
        properties: ["createDirectory"]
      });
      if (canceled || !filePath) {
        return { success: false };
      }
      const finalPath = filePath.endsWith(`.${fileSuffix}`) ? filePath : `${filePath}.${fileSuffix}`;
      await fs.writeFile(finalPath, fileData, "utf-8");
      return {
        success: true,
        fileName: path.basename(finalPath),
        path: finalPath
      };
    } catch (error) {
      console.error("保存文件失败:", error);
      return { success: false, error: String(error) };
    }
  });
  ipcMain.handle("save-document", async (_, args) => {
    const { path: pathName, fileData } = args;
    try {
      const finalPath = pathName.endsWith(`.${fileSuffix}`) ? pathName : `${path.basename(pathName)}.${fileSuffix}`;
      await fs.writeFile(finalPath, fileData, "utf-8");
      return {
        success: true
      };
    } catch (error) {
      console.error("保存文件失败:", error);
      return { success: false, error: String(error) };
    }
  });
  ipcMain.handle("open-document", async () => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: "QANdocs", extensions: [fileSuffix] }],
        properties: ["openFile"]
      });
      if (canceled || filePaths.length === 0) {
        return { success: false };
      }
      const filePath = filePaths[0];
      const fileContent = await fs.readFile(filePath, "utf-8");
      return {
        path: filePath,
        fileName: path.basename(filePath),
        success: true,
        fileData: fileContent
      };
    } catch (error) {
      console.error("打开文件失败:", error);
      return { success: false, error: String(error) };
    }
  });
  ipcMain.handle("read-image-file", async (_, path2) => {
    try {
      const data = await fs.readFile(path2, { encoding: "base64" });
      return { success: true, data: `data:image/png;base64,${data}` };
    } catch (error) {
      console.error("读取图片文件失败:", error);
      return { success: false, error: String(error) };
    }
  });
  ipcMain.handle("read-qd-file", async (_, filePath) => {
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      return {
        path: filePath,
        fileName: path.basename(filePath),
        success: true,
        fileData: fileContent
      };
    } catch (error) {
      console.error("打开文件失败:", error);
      return { success: false, error: String(error) };
    }
  });
  ipcMain.handle("get-entrance-info", () => {
    try {
      const args = process.argv.slice(1);
      const filePath = args.find((arg) => arg.endsWith(".qd"));
      return {
        filePath,
        success: true
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  });
};
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    frame: false,
    width: 800,
    height: 1e3
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  process.env.NODE_ENV === "development" && win.webContents.openDevTools({ mode: "detach" });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("open-file", (event, filePath) => {
  event.preventDefault();
  console.log("open-file", filePath);
});
app.whenReady().then(() => {
  createWindow();
  setupFrameExtension();
  setupFileExtension();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
