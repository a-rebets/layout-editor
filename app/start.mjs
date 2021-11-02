import { Parcel } from '@parcel/core';
import { spawn } from 'child_process';

const entry = './app/render/html/index.html';
let electronStarted = false;

let bundler = new Parcel({
	entries: entry,
	defaultConfig: '@parcel/config-default',
	shouldAutoInstall: false,
	defaultTargetOptions: {
		sourceMaps: false,
		distDir: './build',
		publicUrl: './',
		context: 'electron-renderer',
	},
	env: {
		APP_VERSION: process.env.npm_package_version,
	},
});

try {
	await bundler.run();
} catch (err) {
	console.log(err.diagnostics);
}

let subscription = await bundler.watch((err, event) => {
	if (err) {
		throw err;
	}

	if (event.type === 'buildSuccess') {
		let bundles = event.bundleGraph.getBundles();
		console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
		if (!electronStarted) {
			electronStarted = true;

			spawn('npm', ['run', 'electron'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true,
			});
		}
	} else if (event.type === 'buildFailure') {
		console.log(event.diagnostics);
	}
});
