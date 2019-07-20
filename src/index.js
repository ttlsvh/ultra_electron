const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');

const documentPath = app.getPath('documents');
// const config = require(`${documentPath}/atomic_config.json`);

process.env.DB_PATH = documentPath || '/Users/bob/Documents';
// process.env.SERVERDOMAIN = config.domain || 'localhost';
// process.env.SERVERPORT = config && config.port || 10010;

// config.documentPath = documentPath;

// if (config.local_server) {
//   app.server = require('./server/app');
// }

const platformConfig = {
  darwin: {
    screen_height: 1000,
    screen_width: 1920,
  },
  win32: {
    screen_height: 1032,
    screen_width: 1920,
  }
};

const config = platformConfig[os.platform()]

console.log('PLATFORM: ', config);

process.on('uncaughtException', function (error) {
  console.log("error", error)
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "EHM League Companion",
    titleBarStyle: 'hiddenInset',
    width: config.screen_width,
    height: config.screen_height,
    minWidth: config.screen_width,
    minHeight: config.screen_height,
    maxHeight: config.screen_height,
    backgroundColor: '#3a4047',
    fullscreenable: true,
    webPreferences: {
      // scrollBounce: true,
      nodeIntegration: true,
      contextIsolation: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
    },
  });
  
  // mainWindow.webContents.executeJavaScript(`window.config=${JSON.stringify(config)};console.log('hello from ELECTRON');`);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  // mainWindow.loadURL(`file://${__dirname}/../../ant/ant/build/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
