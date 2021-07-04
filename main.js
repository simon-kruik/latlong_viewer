/*
#### LatLong_Viewer developed by Simon Kruik - starting 2021-07-02
#### Architecture based on https://github.com/odoe/leaflet-electron
*/



// Pass through app and browserwindow from Electron
const { app, BrowserWindow, ipcMain } = require('electron')
// Get the path module for joining filepaths
const path = require('path')
const fs = require('fs')

// Global reference to window object
let win;


async function createWindow() {
    const win = new BrowserWindow({
        width:900,
        height:900,
        webPreferences: {
            nodeIntegration: false, // Stops node executing in renderer processes
            enableRemoteModule: false, // Stops me from trying to use remote when I shouldn't
            preload: path.join(__dirname, 'preload.js')
        }
    })



    win.loadFile('index.html')
/* The code below shows a variety of contents that can be returned from a started renderer
    const github_window = new BrowserWindow({
        width:300,
        height:300
    })
    github_window.loadURL('https://github.com')
    const contents = github_window.webContents
    console.log(contents)
*/
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

ipcMain.on("toMain", (event, args) => {
    console.log(event)
    fs.readFile("secrets/tokens.json", (error,data) => {
        win.webContents.send("fromMain", data)
    });
});