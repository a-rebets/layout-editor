import { Button, ChevronLeftIcon, ChevronRightIcon, Pane } from 'evergreen-ui'

const PageControl = () => {
	return (
		<Pane display="flex" justifyContent="flex-end">
			<Button marginRight={8} iconBefore={ChevronLeftIcon}>
				Prev
			</Button>
			<Button iconAfter={ChevronRightIcon}>Next</Button>
		</Pane>
	)
}

export default PageControl
