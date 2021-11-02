import {
	Heading,
	majorScale,
	Pane,
	Tab,
	Tablist,
	ThemeProvider,
} from 'evergreen-ui';
import { memo } from 'react';
import { sidebarTheme } from './util/themes';

const sidebarIcon = (Component) => <Component marginRight={16} />;

const Sidebar = ({ tabs, sectionNames, selectedInd, handleSelect }) => {
	return (
		<ThemeProvider value={sidebarTheme}>
			<Pane
				padding={majorScale(5)}
				flexBasis={majorScale(40)}
				background='blueTint'
			>
				<Tablist>
					{sectionNames.map((section, sectionInd) => (
						<Pane key={`s-${sectionInd}`} borderBottom>
							<Heading
								size={100}
								marginTop={sectionInd ? 16 : 0}
								marginBottom={16}
							>
								{section}
							</Heading>
							{tabs.map((tab, tabInd) =>
								tab.section === sectionInd ? (
									<Tab
										appearance='custom'
										direction='vertical'
										key={tab.key}
										onSelect={() => handleSelect(tabInd)}
										isSelected={tabInd === selectedInd}
										aria-controls={`panel-${tab.key}`}
										height={40}
									>
										{sidebarIcon(tab.icon)}
										{tab.title}
									</Tab>
								) : null
							)}
						</Pane>
					))}
				</Tablist>
			</Pane>
		</ThemeProvider>
	);
};

export default memo(Sidebar);
