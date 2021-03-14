import { BrowserWindow } from 'electron';
import path from 'path';

export const Monitor = {
  window: new BrowserWindow({
    titleBarStyle : 'hidden',
    autoHideMenuBar : true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  }),
  async start() {
    return Monitor.window.loadFile(
      path.resolve(__dirname,'..','ui','index.html')
    );
  }
};


