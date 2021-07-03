// Pass through app and browserwindow from Electron
const { app, BrowserWindow } = require('electron')
// Get the path module for joining filepaths
const path = require('path')

function createWindow() {
    const window = new BrowserWindow({
        width:900,
        height:900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

