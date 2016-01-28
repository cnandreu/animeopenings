
'use strict'

const electron = require('electron')
const Menu = electron.Menu
const shell = electron.shell

function createMenu (onQuit, onGoBack, onGoForward) {
  if (Menu.getApplicationMenu()) {
    return
  }

  const template = [{
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [{
      label: 'Back',
      click () {
        onGoBack()
      }
    }, {
      label: 'Forward',
      click () {
        onGoForward()
      }
    }, {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.reload()
        }
      }
    }, {
      type: 'separator'
    }, {
      label: 'Toggle Full Screen',
      accelerator: (() => {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F'
        }
        return 'F11'
      })(),
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }, {
      label: 'Toggle Window Developer Tools',
      accelerator: (() => {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        }
        return 'Ctrl+Shift+I'
      })(),
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }
    ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }
    ]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'Report an Issue',
      click () {
        shell.openExternal('https://github.com/cnandreu/animeopenings/issues')
      }
    }]
  }]

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [{
        label: 'Hide App',
        accelerator: 'Command+H',
        role: 'hide'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      }, {
        label: 'Show All',
        role: 'unhide'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click () {
          onQuit()
        }
      }]
    })

    template[3].submenu.push({
      type: 'separator'
    }, {
      label: 'Bring All to Front',
      role: 'front'
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = createMenu
