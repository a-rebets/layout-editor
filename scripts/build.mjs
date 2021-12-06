import Parcel from '@parcel/core'
import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import { URL } from 'url'

/* eslint-disable no-console */
const bundler = new Parcel({
	entries: 'a.js',
	defaultConfig: '@parcel/config-default',
})

const stylelintConfig = {
	extends: 'stylelint-config-standard-scss',
	rules: {
		indentation: 'tab',
	},
}

const lintJS = async (pattern) => {
	let result = false
	try {
		const mainLinter = new ESLint({
			cwd: new URL(import.meta.url, 'layout-editor-cache').pathname,
		})
		const formatter = await mainLinter.loadFormatter('stylish')
		mainLinter.lintFiles(pattern).then((data) => {
			console.log(data.length)
			console.log(formatter.format(data))
		})
		result = false
	} catch (err) {
		console.error(err)
	}
	return result
}

const lintStyles = (pattern) => {
	let result = false
	stylelint
		.lint({
			config: stylelintConfig,
			files: pattern,
			formatter: 'verbose',
		})
		.then((data) => {
			console.log(data.output)
			result = data.errored
		})

		.catch((err) => {
			console.error(err.stack)
		})
	return result
}

const mainLoop = async () => {
	const styleCheck = lintStyles('app/render/**/*.scss')
	const jsCheck = lintJS('app/**/*.js')
	if (styleCheck && jsCheck) {
		try {
			const { bundleGraph, buildTime } = await bundler.run()
			const bundles = bundleGraph.getBundles()
			console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`)
		} catch (err) {
			console.log(err.diagnostics)
		}
	}
}

mainLoop()
