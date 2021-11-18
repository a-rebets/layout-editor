/* eslint-disable no-console */
import Parcel from '@parcel/core'
import { spawn } from 'child_process'

const entry = './app/render/html/index.html'
let electronStarted = false

const bundler = new Parcel({
	entries: entry,
	defaultConfig: '@parcel/config-default',
	targets: {
		app: {
			distDir: './build',
			context: 'electron-renderer',
		},
	},
	defaultTargetOptions: {
		sourceMaps: false,
		publicUrl: './',
	},
	env: {
		APP_VERSION: process.env.npm_package_version,
	},
})

const processBundlerOutput = (event) => {
	if (event.type === 'buildSuccess') {
		const bundles = event.bundleGraph.getBundles()
		console.log(
			`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`
		)
		if (!electronStarted) {
			electronStarted = true

			spawn('npm', ['run', 'electron'], {
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
	await bundler.watch((err, event) => {
		if (err) {
			throw err
		}
		processBundlerOutput(event)
	})
}

mainLoop()
