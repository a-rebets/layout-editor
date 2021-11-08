import { Pane, Text } from 'evergreen-ui'
import { useContext } from 'react'
import FlipMove from 'react-flip-move'
import { LayoutsContext } from '../context'
import LayoutListItem from './list_item'

const LayoutList = () => {
	const { layouts } = useContext(LayoutsContext)

	return (
		<Pane is="section" overflow="auto">
			<FlipMove staggerDurationBy="30" leaveAnimation={null}>
				{layouts.filtered.length ? (
					layouts.filtered.map((el) => (
						<LayoutListItem
							key={el.uid}
							layout={el}
							background="white"
							elevation={1}
							marginBottom={16}
							paddingY={8}
							paddingX={16}
							display="flex"
						/>
					))
				) : (
					<Text>No results</Text>
				)}
			</FlipMove>
		</Pane>
	)
}

export default LayoutList
