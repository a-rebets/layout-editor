/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Parcel } from '@parcel/core'
import { spawn } from 'child_process'
import { rm } from 'fs/promises'
import { URL } from 'url'
import projectPaths from './paths.mjs'

const devPort = parseInt(process.env.PORT || '1212', 10)
let electronStarted = false
let readyBundlesNum = 0

const bundler = new Parcel({
	entries: new URL('html/index.html', projectPaths.srcRendererPath).pathname,
	defaultConfig: '@parcel/config-default',
	shouldBuildLazily: true,
	env: {
		APP_VERSION: process.env.npm_package_version,
		NODE_ENV: 'development',
	},
	defaultTargetOptions: {
		distDir: projectPaths.distRendererPath.pathname,
		publicUrl: './',
		engines: {
			electron: '^16.0.0',
		},
		sourceMaps: false,
	},
	serveOptions: {
		port: devPort,
	},
})

const processBundlerOutput = (event) => {
	if (event.type === 'buildSuccess') {
		const bundlesNum = event.bundleGraph.getBundles().length
		const diff = bundlesNum - readyBundlesNum
		const msg = diff ? `Built ${diff}` : 'Updated all'
		console.log(`✨ ${msg} bundles in ${event.buildTime}ms!`)
		readyBundlesNum = bundlesNum
		if (!electronStarted) {
			electronStarted = true

			spawn('npm', ['run', 'start:main'], {
				shell: true,
				env: process.env,
				stdio: 'inherit',
			})
				.on('close', (code) => process.exit(code))
				.on('error', (spawnError) => console.error(spawnError))
		}
	} else if (event.type === 'buildFailure') {
		console.log(event.diagnostics)
	}
}

const mainLoop = async () => {
	try {
		await rm(projectPaths.distRendererPath.pathname, { recursive: true })
		console.log('[ Cleared the dev output! ]')
	} catch (_) {
		console.log('[ Dev output is clear or missing ]')
	}
	await bundler.watch((err, event) => {
		if (err) {
			throw err
		}
		processBundlerOutput(event)
	})
}

mainLoop()
