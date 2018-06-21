const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.openDevTools();

    // mainWindow.setResizable(false);
    // mainWindow.maximize();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow();
    }
});
