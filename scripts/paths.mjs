import { URL } from 'url'

const join = (source, append) => new URL(append, source)

const rootPath = join(import.meta.url, '..')

const srcPath = join(rootPath, 'app/')
const srcMainPath = join(srcPath, 'main/')
const srcRendererPath = join(srcPath, 'render/')

const releasePath = join(rootPath, 'release/')
const appPath = join(releasePath, 'app/')
const appPackagePath = join(appPath, 'package.json')
const appNodeModulesPath = join(appPath, 'node_modules')

const distPath = join(appPath, 'dist/')
const distMainPath = join(distPath, 'main/')
const distRendererPath = join(distPath, 'render/')

const buildPath = join(releasePath, 'build/')

export default {
	rootPath,
	srcPath,
	srcMainPath,
	srcRendererPath,
	releasePath,
	appPath,
	appPackagePath,
	appNodeModulesPath,
	distPath,
	distMainPath,
	distRendererPath,
	buildPath,
}
