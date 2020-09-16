const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, './icon.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    // mainWindow.webContents.openDevTools();

    // mainWindow.setResizable(false);
    // mainWindow.maximize();
    // Menu.setApplicationMenu(null);
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
