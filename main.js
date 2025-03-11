const { app, BrowserWindow } = require('electron');
const os = require('os');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
        devTools: true,
        nodeIntegration: true,
    },
    autoHideMenuBar: true
  });

  win.setMinimumSize(1280, 720);


  win.loadURL('http://localhost:3000'); 


  const getMainNetwork = (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (/Wi-Fi|Ethernet|Local Area Connection|en0|Wi-Fi 2/i.test(key)) {
        const ipv4 = value.find((iface) => iface.family === "IPv4" && !iface.internal);
        if (ipv4) {
          return { name: key, ...ipv4 };
        }
      }
    }
    return null;
  };

  const systeminfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    osType: os.type(),
    osVersion: os.version ? os.version() : "N/A",
    release: os.release(),
    uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    cpu: os.cpus()[0].model.trim(),
    cores: os.cpus().length,
    speed: `${(os.cpus()[0].speed / 1000).toFixed(2)} GHz`,
    ram: `${(os.totalmem() / 1073741824).toFixed(2)} GB`,
    freeRam: `${(os.freemem() / 1073741824).toFixed(2)} GB`,
    networkInterfaces: getMainNetwork(os.networkInterfaces()),
  };

  console.log(JSON.stringify(systeminfo, null, 2));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
