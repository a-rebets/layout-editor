import { Avatar, Card, Heading, majorScale, Pane, Text } from 'evergreen-ui'
import moment from 'moment'
import { forwardRef } from 'react'
import LayoutImg from '~app/render/assets/layout.png'

const cardContentStyle = {
	flexGrow: 1,
	display: 'grid',
	gridTemplateRows: '1fr 1fr',
	gridTemplateColumns: `auto fit-content(${majorScale(25)}px)`,
	gap: '0 0',
	gridTemplateAreas: '"title timestamp" "path ."',
	paddingLeft: 16,
}

const LayoutListItem = forwardRef(({ layout, ...cardProps }, ref) => {
	const parsedTimestamp = moment(layout.timestamp)
	const isToday = parsedTimestamp
		.clone()
		.startOf('day')
		.isSame(moment().startOf('day'))

	return (
		<Card ref={ref} {...cardProps}>
			<Avatar src={LayoutImg} alt="layout icon" size={40} />
			<Pane {...cardContentStyle}>
				<Heading size={400} gridArea="title">
					{layout.title}
				</Heading>
				<Text textAlign="right" size={300} gridArea="timestamp">
					{parsedTimestamp.format(isToday ? 'H:mm' : 'MMM D')}
				</Text>
				<Text color="muted" gridArea="path">
					/some/path/test
				</Text>
			</Pane>
		</Card>
	)
})

LayoutListItem.displayName = 'LayoutListItem'

export default LayoutListItem
