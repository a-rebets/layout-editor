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
	{ title: 'Title', icon: FontIcon },
	{ title: 'Creation date', icon: CalendarIcon },
]

const SortingToolbar = () => {
	const [optionSelected, setoptionSelected] = useState(-1)

	const { setLayouts } = useContext(LayoutsContext)

	const handleSelect = useCallback((i) => {
		setoptionSelected(i)
	}, [])

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
							return (
								<Menu.Item
									key={ind}
									height={32}
									icon={o.icon}
									aria-checked={isCurrent}
									intent={isCurrent ? 'selected' : ''}
									onSelect={() => handleSelect(ind)}
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
