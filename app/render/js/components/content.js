import {
	AddIcon,
	FolderOpenIcon,
	Pane,
	Paragraph,
	SettingsIcon,
} from 'evergreen-ui';
import { useState, useCallback } from 'react';
import Sidebar from './sidebar';

const sidebarTabs = [
	{
		title: 'View saved or import',
		key: 'saved_or_import',
		icon: FolderOpenIcon,
		section: 0,
	},
	{
		title: 'Create new layout',
		key: 'create_new',
		icon: AddIcon,
		section: 0,
	},
	{
		title: 'Settings',
		key: 'settings',
		icon: SettingsIcon,
		section: 1,
	},
];

const sectionNames = ['Layouts', 'Other'];

const ContentPane = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleSelect = useCallback(
		(i) => {
			setSelectedIndex(i);
		},
		[selectedIndex]
	);

	return (
		<Pane display='flex' flexGrow={1}>
			<Sidebar
				tabs={sidebarTabs}
				sectionNames={sectionNames}
				selectedInd={selectedIndex}
				handleSelect={handleSelect}
			/>
			<Pane padding={16} background='tint1' flex='1'>
				{sidebarTabs.map((tab, index) => (
					<Pane
						key={tab.key}
						id={`panel-${tab.key}`}
						role='tabpanel'
						aria-labelledby={tab.key}
						aria-hidden={index !== selectedIndex}
						display={index === selectedIndex ? 'block' : 'none'}
					>
						<Paragraph>Panel {tab.title}</Paragraph>
					</Pane>
				))}
			</Pane>
		</Pane>
	);
};

export default ContentPane;
