/* eslint-disable no-console */
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const reloader = require('electron-reloader')
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer')
const io = require('./util/io')

let mainWindow

try {
	reloader(module)
} catch (_) {
	console.log('A problem occured while reloading Electron!')
}

const openWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 720,
		webPreferences: {
			contextIsolation: false,
		},
	})

	// load `index.html` file
	mainWindow.loadFile('build/index.html')
}

// when app is ready, open a window
app.whenReady()
	.then(() => {
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err))
		openWindow()
		io.watchFiles(mainWindow)
		app.on('activate', () => {
			if (mainWindow === null) openWindow()
		})
	})
	.catch(console.log)

// when all windows are closed, quit the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// when app activates, open a window
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		openWindow()
	}
})

// return list of files
ipcMain.handle('app:get-files', () => {
	return io.getFiles()
})

// listen to file(s) add event
ipcMain.handle('app:on-file-add', (event, files = []) => {
	io.addFiles(files)
})

// open filesystem dialog to choose files
ipcMain.handle('app:on-fs-dialog-open', () => {
	const files = dialog.showOpenDialogSync({
		properties: ['openFile', 'multiSelections'],
	})

	io.addFiles(
		files.map((filepath) => {
			return {
				name: path.parse(filepath).base,
				path: filepath,
			}
		})
	)
})

// listen to file delete event
ipcMain.on('app:on-file-delete', (event, file) => {
	io.deleteFile(file.filepath)
})

// listen to file open event
ipcMain.on('app:on-file-open', (event, file) => {
	io.openFile(file.filepath)
})

// listen to file copy event
ipcMain.on('app:on-file-copy', (event, file) => {
	event.sender.startDrag({
		file: file.filepath,
		icon: path.resolve(__dirname, './resources/paper.png'),
	})
})
