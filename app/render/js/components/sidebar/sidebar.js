/* eslint-disable react/no-array-index-key */
import { Heading, majorScale, Pane, Tab, Tablist } from 'evergreen-ui'
import { memo } from 'react'
import { sidebarSectionNames } from './constants'

function Sidebar({ tabs, selectedInd, handleSelect }) {
	return (
		<Pane
			paddingLeft={40}
			paddingRight={24}
			paddingY={majorScale(3)}
			flexBasis={majorScale(40)}
			background="blue50"
			is="aside"
		>
			<Tablist>
				{sidebarSectionNames.map((section, sectionInd) => (
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
									appearance="custom"
									direction="vertical"
									key={tab.key}
									id={tab.key}
									onSelect={() => handleSelect(tabInd)}
									isSelected={tabInd === selectedInd}
									aria-controls={`panel-${tab.key}`}
									height={40}
								>
									<tab.icon marginRight={16} />
									{tab.title}
								</Tab>
							) : null
						)}
					</Pane>
				))}
			</Tablist>
		</Pane>
	)
}

export default memo(Sidebar)
