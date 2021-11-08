import { Button, ImportIcon, majorScale, Pane } from 'evergreen-ui'
import { useEffect, useReducer } from 'react'
import LayoutList from './layout_list/list'
import LayoutSearchField from './layout_list/search_field'
import PageControl from './layout_list/pagination'
import SortingToolbar from './layout_list/sorting'
import { LayoutsContext, reducer } from './context'

const loadedLayouts = [
	{
		uid: '1',
		title: 'Test World Layout 0.0.1',
		path: '~/usr/some/test/path',
		timestamp: 1635984626000,
	},
	{
		uid: '2',
		title: 'My world',
		path: '~/usr/some/test/path',
		timestamp: 1635984926000,
	},
	{
		uid: '3',
		title: 'Test #3',
		path: '~/usr/some/test/path',
		timestamp: 1635985226000,
	},
	{
		uid: '4',
		title: 'New Layout',
		path: '~/usr/some/test/path',
		timestamp: 1635985526000,
	},
	{
		uid: '5',
		title: 'TP test',
		path: '~/usr/some/test/path',
		timestamp: 1635985826000,
	},
	{
		uid: '6',
		title: 'Viktor 15.10.21',
		path: '~/usr/some/test/path',
		timestamp: 1635867193000,
	},
	{
		uid: '7',
		title: 'Yurii 15.10.21',
		path: '~/usr/some/test/path',
		timestamp: 1635867193000,
	},
]

const initPaneState = {
	all: [],
	filtered: [],
	sorting: { method: '', switch: 'asc' },
}

const getRowH = (scale) => `minmax(${majorScale(scale)}px, auto)`

const listSectionStyle = {
	display: 'grid',
	gridTemplateRows: `${getRowH(7)} 1fr ${getRowH(4)}`,
	gap: '0 0',
}

const ViewImportPane = () => {
	const [layouts, setLayouts] = useReducer(reducer, initPaneState)

	useEffect(() => {
		setLayouts({ type: 'init', val: loadedLayouts })
	}, [])

	return (
		<LayoutsContext.Provider value={{ layouts, setLayouts }}>
			<Pane width="100%" display="flex" is="section">
				<Pane flexGrow={1} paddingRight={16}>
					<LayoutSearchField />
				</Pane>
				<Button
					borderRadius={56}
					appearance="primary"
					size="large"
					iconBefore={ImportIcon}
				>
					Import scheme
				</Button>
			</Pane>
			<Pane is="section" {...listSectionStyle}>
				<SortingToolbar />
				<LayoutList />
				<PageControl />
			</Pane>
		</LayoutsContext.Provider>
	)
}

export default ViewImportPane
