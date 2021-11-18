import { SearchInput } from 'evergreen-ui'
import { useContext } from 'react'
import { LayoutsContext } from '../context'

function LayoutSearchField() {
	const { setLayouts } = useContext(LayoutsContext)

	const handleChange = (e) => {
		const input = e.target.value
		setLayouts({
			type: 'filter',
			val: input,
		})
	}

	return (
		<SearchInput
			height={40}
			width="100%"
			onChange={handleChange}
			placeholder="Find a layout..."
		/>
	)
}

export default LayoutSearchField
