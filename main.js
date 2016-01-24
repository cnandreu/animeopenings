
'use strict'

const fs = require('fs')
const path = require('path')
const windowStateKeeper = require('electron-window-state')
const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow
const createMenu = require('./menu')

const pathToChanges = path.join(__dirname, 'changes.js')
const contentsOfChangesJs = fs.readFileSync(pathToChanges).toString()

let mainWindow

function isOSX () {
  return process.platform === 'darwin'
}

function maybeHideWindow (window, event) {
  if (isOSX()) {
    event.preventDefault()
    window.hide()
  }
}

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: true,
    'node-integration': false
  })

  createMenu(
    app.quit,
    mainWindow.webContents.goBack,
    mainWindow.webContents.goForward
  )

  mainWindow.loadURL('http://openings.moe')

  // Available shortcuts:
  // https://github.com/atom/electron/blob/master/docs/api/accelerator.md
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.executeJavaScript('playPause()')
  })

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.executeJavaScript('retrieveNewVideo()')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.executeJavaScript(contentsOfChangesJs)

  mainWindow.on('close', (event) => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false)
      mainWindow.once('leave-full-screen', maybeHideWindow.bind(this, mainWindow, event))
    }

    maybeHideWindow(mainWindow, event)
  })

  mainWindowState.manage(mainWindow)

  // mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (!isOSX()) {
    app.quit()
  }
})

app.on('before-quit', () => {
  if (isOSX()) {
    app.exit(0)
  }
})

app.on('activate', (event, hasVisibleWindows) => {
  if (isOSX()) {
    if (!hasVisibleWindows) {
      mainWindow.show()
    }
  }
})
