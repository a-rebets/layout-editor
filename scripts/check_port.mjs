import detect from 'detect-port'
import chalk from 'chalk'

const port = parseInt(process.env.PORT || '1212', 10)

detect(port, (_, availablePort) => {
	if (port !== availablePort) {
		throw new Error(
			chalk.whiteBright.bgRed.bold(
				`Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
			)
		)
	} else {
		process.exit(0)
	}
})
