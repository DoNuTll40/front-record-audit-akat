const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
        devTools: true,
        nodeIntegration: true, // ถ้าคุณต้องการใช้ Node.js ใน renderer process
    },
    autoHideMenuBar: true
  });

  // สำหรับการโหลดเว็บแอปจาก localhost เมื่อ Next.js รัน
  win.loadURL('http://localhost:3000'); 
  // win.loadFile(".next/standalone/server.js")
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
