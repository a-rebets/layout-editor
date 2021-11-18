import { Pane } from 'evergreen-ui'
import { useState, useCallback } from 'react'
import { Sidebar, sidebarTabs } from './sidebar'

function ContentPane() {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const handleSelect = useCallback((i) => {
		setSelectedIndex(i)
	}, [])

	return (
		<Pane display="flex" className="content">
			<Sidebar
				tabs={sidebarTabs}
				selectedInd={selectedIndex}
				handleSelect={handleSelect}
			/>
			<Pane is="main" background="tint2" flex="1">
				{sidebarTabs.map((tab, index) => (
					<Pane
						key={tab.key}
						id={`panel-${tab.key}`}
						role="tabpanel"
						aria-labelledby={tab.key}
						aria-hidden={index !== selectedIndex}
						display={index === selectedIndex ? 'grid' : 'none'}
						overflow="hidden"
						paddingX={24}
						paddingY={16}
						{...tab.style}
					>
						<tab.content />
					</Pane>
				))}
			</Pane>
		</Pane>
	)
}

export default ContentPane
