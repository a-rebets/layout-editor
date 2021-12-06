/* eslint-disable no-console */
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const reloader = require('electron-reloader')
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer')

const resolveHtmlPath = require('./util/windowMethods')
const io = require('./util/io')

let mainWindow

try {
	reloader(module)
} catch (_) {
	console.log('A problem occured while reloading Electron!')
}

const RESOURCES_PATH = app.isPackaged
	? path.join(process.resourcesPath, 'build_assets')
	: path.join(__dirname, '../../build_assets')

const getAssetPath = (...paths) => {
	return path.join(RESOURCES_PATH, ...paths)
}

const openWindow = () => {
	mainWindow = new BrowserWindow({
		show: false,
		width: 1100,
		height: 720,
		icon: getAssetPath('icon.png'),
		webPreferences: {
			contextIsolation: false,
		},
	})

	mainWindow.loadURL(resolveHtmlPath('index.html'))

	mainWindow.on('ready-to-show', () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined')
		}
		mainWindow.show()
	})
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

// when app is ready, open a window
app.whenReady()
	.then(() => {
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err))
		openWindow()
		io.watchFiles(mainWindow)
		// when app activates, open a window
		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) openWindow()
		})
	})
	.catch(console.log)

// when all windows are closed, quit the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
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
