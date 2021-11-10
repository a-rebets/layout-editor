import { AddIcon, FolderOpenIcon, majorScale, SettingsIcon } from 'evergreen-ui'
import { CreateNewPane, SettingsPane, ViewImportPane } from '../panes'

export const sidebarTabs = [
	{
		title: 'View saved / import',
		key: 'saved_or_import',
		icon: FolderOpenIcon,
		section: 0,
		content: ViewImportPane,
		style: {
			gridTemplateRows: `minmax(${majorScale(
				5
			)}px, auto) minmax(150px, 1fr)`,
			gap: '0 0',
		},
	},
	{
		title: 'New layout creation',
		key: 'create_new',
		icon: AddIcon,
		section: 0,
		content: CreateNewPane,
		style: {},
	},
	{
		title: 'Settings',
		key: 'settings',
		icon: SettingsIcon,
		section: 1,
		content: SettingsPane,
		style: {},
	},
]

export const sidebarSectionNames = ['Layouts', 'Other']
