import {
	Button,
	CalendarIcon,
	ChevronDownIcon,
	FontIcon,
	HorizontalBarChartDescIcon,
	IconButton,
	Menu,
	Pane,
	Popover,
	Position,
	Text,
} from 'evergreen-ui'
import { useCallback, useContext, useState } from 'react'
import { LayoutsContext } from '../context'

const menuOptions = [
	{ title: 'Title', icon: FontIcon, value: 'by_title' },
	{ title: 'Creation date', icon: CalendarIcon, value: 'by_date' },
]

const SortingToolbar = () => {
	const [optionSelected, setOptionSelected] = useState(-1)

	const { setLayouts } = useContext(LayoutsContext)

	const handleSortingTypeSelect = useCallback(
		(i, type) => {
			setOptionSelected(i)
			setLayouts({
				type: 'sort',
				val: type,
			})
		},
		[setLayouts]
	)

	return (
		<Pane paddingLeft={4} paddingY={16}>
			<Text size={300} marginRight={16}>
				Sort by:
			</Text>
			<Popover
				position={Position.BOTTOM_LEFT}
				content={
					<Menu>
						{menuOptions.map((o, ind) => {
							const isCurrent = ind === optionSelected
							const nextInd = isCurrent ? -1 : ind
							return (
								<Menu.Item
									id={ind}
									key={ind}
									height={32}
									icon={o.icon}
									aria-checked={isCurrent}
									intent={isCurrent ? 'selected' : ''}
									onSelect={() =>
										handleSortingTypeSelect(
											nextInd,
											o.value
										)
									}
								>
									{o.title}
								</Menu.Item>
							)
						})}
					</Menu>
				}
			>
				<Button
					iconBefore={ChevronDownIcon}
					size="small"
					marginRight={8}
				>
					Select
				</Button>
			</Popover>
			<IconButton
				appearance="minimal"
				icon={HorizontalBarChartDescIcon}
				size="small"
			/>
		</Pane>
	)
}

export default SortingToolbar
