import { Pane, Spinner } from 'evergreen-ui'
import { useState, useCallback, Suspense } from 'react'
import { Sidebar, sidebarTabs } from './sidebar'

const paneFallback = (
	<Pane>
		<Spinner marginX="auto" marginY={150} />
	</Pane>
)

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
				<Suspense fallback={paneFallback}>
					{sidebarTabs.map((tab, index) => {
						if (index === selectedIndex) {
							const Content = tab.content
							return (
								<Pane
									key={tab.key}
									id={`panel-${tab.key}`}
									role="tabpanel"
									aria-labelledby={tab.key}
									aria-hidden={false}
									display="grid"
									overflow="hidden"
									paddingX={24}
									paddingY={16}
									{...tab.style}
								>
									<Content />
								</Pane>
							)
						}
						return null
					})}
				</Suspense>
			</Pane>
		</Pane>
	)
}

export default ContentPane
