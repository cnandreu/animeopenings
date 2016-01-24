
'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;

const pathToChanges = path.join(__dirname, "changes.js");
const contentsOfChangesJs = fs.readFileSync(pathToChanges).toString();

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600, 
    show: true, 
    'node-integration': false
  });

  mainWindow.loadURL('http://openings.moe');

  // Available shortcuts:
  // https://github.com/atom/electron/blob/master/docs/api/accelerator.md
  globalShortcut.register('MediaPlayPause', function() {
    mainWindow.webContents.executeJavaScript("playPause()");
  });

  globalShortcut.register('MediaNextTrack', function() {
    mainWindow.webContents.executeJavaScript("retrieveNewVideo()");
  });

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.executeJavaScript(contentsOfChangesJs);

}

app.on('ready', createWindow);

app.on('will-quit', function() {
  
  globalShortcut.unregisterAll();

});

app.on('window-all-closed', function () {
  
  if (process.platform !== 'darwin') {
    app.quit();
  }

});

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow();
  }

});
