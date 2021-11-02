import { Heading, majorScale, Pane, ThemeProvider, Text } from 'evergreen-ui';
import Logo from '../../assets/logo.png';
import ContentPane from './content';
import { headingTheme } from './util/themes';

const App = () => {
	return (
		<Pane height='100%' display='flex' flexDirection='column'>
			<Pane
				display='flex'
				justifyContent='flex-start'
				background='tint1'
				alignItems='center'
				paddingX={40}
				paddingY={16}
				borderBottom
			>
				<ThemeProvider value={headingTheme}>
					<img src={Logo} alt='logo' className='logo' />
					<Pane display='flex' alignItems='baseline'>
						<Heading size={900}>World Layout Editor</Heading>
						<Text size={500} marginX={majorScale(2)}>
							{process.env.APP_VERSION}
						</Text>
					</Pane>
				</ThemeProvider>
			</Pane>
			<ContentPane />
		</Pane>
	);
};

export default App;
