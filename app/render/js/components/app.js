import { Heading, majorScale, Pane, ThemeProvider, Text } from 'evergreen-ui'
import Logo from '~app/render/assets/logo.png'
import ContentPane from './content'
import customTheme from './util/theme'

const [headedMaxH, contentMaxH] = [
	`fit-content(${majorScale(13)}px) `,
	`minmax(${majorScale(70)}px, 1fr)`,
]

const appBoxStyles = {
	height: '100%',
	display: 'grid',
	gridTemplateRows: headedMaxH + contentMaxH,
	gap: '0 0',
}

const headerStyles = {
	display: 'flex',
	justifyContent: 'flex-start',
	background: 'tint1',
	alignItems: 'center',
	paddingX: 40,
	paddingY: 24,
	is: 'header',
	borderBottom: true,
}

const App = () => {
	return (
		<Pane {...appBoxStyles}>
			<ThemeProvider value={customTheme}>
				<Pane {...headerStyles}>
					<img src={Logo} alt="logo" className="logo" />
					<Pane display="flex" alignItems="baseline">
						<Heading size={900}>World Layout Editor</Heading>
						<Text size={500} marginX={majorScale(2)}>
							{process.env.APP_VERSION}
						</Text>
					</Pane>
				</Pane>
				<ContentPane />
			</ThemeProvider>
		</Pane>
	)
}

export default App
