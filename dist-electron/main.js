import { ipcMain as i, BrowserWindow as d, dialog as h, app as u } from "electron";
import { createRequire as _ } from "node:module";
import { fileURLToPath as D } from "node:url";
import o from "node:path";
import l from "node:fs/promises";
const P = () => {
  i.on("window-minimize", () => {
    const e = d.getFocusedWindow();
    e && e.minimize();
  }), i.on("window-maximize", () => {
    const e = d.getFocusedWindow();
    e && (e.isMaximized() ? e.unmaximize() : e.maximize());
  }), i.on("window-close", () => {
    const e = d.getFocusedWindow();
    e && e.close();
  });
}, c = "qd", E = () => {
  i.handle("saveas-document", async (e, s) => {
    const { defaultPath: t, fileData: r } = s;
    try {
      const { canceled: a, filePath: f } = await h.showSaveDialog({
        defaultPath: t,
        filters: [{ name: "QANdocs", extensions: [c] }],
        properties: ["createDirectory"]
      });
      if (a || !f)
        return { success: !1 };
      const m = f.endsWith(`.${c}`) ? f : `${f}.${c}`;
      return await l.writeFile(m, r, "utf-8"), {
        success: !0,
        fileName: o.basename(m),
        path: m
      };
    } catch (a) {
      return console.error("保存文件失败:", a), { success: !1, error: String(a) };
    }
  }), i.handle("save-document", async (e, s) => {
    const { path: t, fileData: r } = s;
    try {
      const a = t.endsWith(`.${c}`) ? t : `${o.basename(t)}.${c}`;
      return await l.writeFile(a, r, "utf-8"), {
        success: !0
      };
    } catch (a) {
      return console.error("保存文件失败:", a), { success: !1, error: String(a) };
    }
  }), i.handle("open-document", async () => {
    try {
      const { canceled: e, filePaths: s } = await h.showOpenDialog({
        filters: [{ name: "QANdocs", extensions: [c] }],
        properties: ["openFile"]
      });
      if (e || s.length === 0)
        return { success: !1 };
      const t = s[0], r = await l.readFile(t, "utf-8");
      return {
        path: t,
        fileName: o.basename(t),
        success: !0,
        fileData: r
      };
    } catch (e) {
      return console.error("打开文件失败:", e), { success: !1, error: String(e) };
    }
  }), i.handle("read-image-file", async (e, s) => {
    try {
      return { success: !0, data: `data:image/png;base64,${await l.readFile(s, { encoding: "base64" })}` };
    } catch (t) {
      return console.error("读取图片文件失败:", t), { success: !1, error: String(t) };
    }
  }), i.handle("read-qd-file", async (e, s) => {
    try {
      const t = await l.readFile(s, "utf-8");
      return {
        path: s,
        fileName: o.basename(s),
        success: !0,
        fileData: t
      };
    } catch (t) {
      return console.error("打开文件失败:", t), { success: !1, error: String(t) };
    }
  }), i.handle("get-entrance-info", () => {
    try {
      return {
        filePath: process.argv.slice(1).find((t) => t.endsWith(".qd")),
        success: !0
      };
    } catch (e) {
      return { success: !1, error: String(e) };
    }
  });
}, R = (e) => {
  e.webContents.on("before-input-event", (s, t) => {
    if (t.key === "F12" && !t.alt && !t.control && !t.meta && !t.shift) {
      console.log("F12 按键被捕获");
      const r = e == null ? void 0 : e.webContents;
      r && (r.isDevToolsOpened() ? r.closeDevTools() : r.openDevTools({ mode: "detach" })), s.preventDefault();
    }
  });
};
_(import.meta.url);
const w = o.dirname(D(import.meta.url));
process.env.APP_ROOT = o.join(w, "..");
const p = process.env.VITE_DEV_SERVER_URL, x = o.join(process.env.APP_ROOT, "dist-electron"), g = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = p ? o.join(process.env.APP_ROOT, "public") : g;
let n;
function v() {
  n = new d({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(w, "preload.mjs"),
      devTools: !0
    },
    frame: !1,
    width: 800,
    height: 1e3
  }), n.webContents.on("did-finish-load", () => {
    n == null || n.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), p ? n.loadURL(p) : n.loadFile(o.join(g, "index.html")), process.env.NODE_ENV === "development" && n.webContents.openDevTools({ mode: "detach" });
}
u.on("window-all-closed", () => {
  process.platform !== "darwin" && (u.quit(), n = null);
});
u.on("activate", () => {
  d.getAllWindows().length === 0 && v();
});
u.whenReady().then(() => {
  v(), P(), E(), n && R(n);
});
export {
  x as MAIN_DIST,
  g as RENDERER_DIST,
  p as VITE_DEV_SERVER_URL
};
