import { EmptyState, Pane, SearchIcon } from 'evergreen-ui'
import { useContext } from 'react'
import FlipMove from 'react-flip-move'
import { LayoutsContext } from '../context'
import LayoutListItem from './list_item'

function LayoutList() {
	const { layouts } = useContext(LayoutsContext)

	return (
		<Pane is="section" overflow="auto">
			{layouts.filtered.length ? (
				<FlipMove staggerDurationBy="30" leaveAnimation={null}>
					{layouts.filtered.map((el) => (
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
					))}
				</FlipMove>
			) : (
				<EmptyState
					background="light"
					title="No layouts matched your query"
					orientation="horizontal"
					icon={<SearchIcon color="#C1C4D6" />}
					iconBgColor="#EDEFF5"
					description="Try typing something different"
				/>
			)}
		</Pane>
	)
}

export default LayoutList
