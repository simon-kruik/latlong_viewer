const {
    contextBridge,
    ipcRenderer
} = require("electron");

// These lines allow use of ipcRenderer without exposing whole object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on (channel, (event,...args) => func(...args));
            }
        }
    }
)

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText (`${dependency}-version`, process.versions[dependency])
    }
})

