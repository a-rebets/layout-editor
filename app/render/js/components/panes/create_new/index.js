import { Pane, Paragraph, TickIcon, useTheme } from 'evergreen-ui'
import Steps, { Step } from 'rc-steps'
import { useCallback, useState } from 'react'
import { BaseChoiceStep, GeneralStep, SummaryStep } from './steps'

import 'rc-steps/assets/index.css'

const tabs = [
	{ key: 'general', stepInner: GeneralStep },
	{ key: 'base_choice', stepInner: BaseChoiceStep },
	{ key: 'summary', stepInner: SummaryStep },
]

function CreateNewPane() {
	const theme = useTheme()
	const [currentStep, setCurrentStep] = useState(0)

	const handleStepChange = useCallback((curr) => {
		setCurrentStep(curr)
	}, [])

	return (
		<Pane is="section">
			<Steps
				type="navigation"
				current={currentStep}
				onChange={handleStepChange}
				icons={{ finish: <TickIcon /> }}
				style={{ fontFamily: theme.fontFamilies.ui }}
			>
				<Step title="General" description="New layout details" />
				<Step title="Layout base" description="What to start with" />
				<Step title="Summary" description="Review and confirm" />
			</Steps>
			<Pane padding={16} background="tint1" flex="1">
				{tabs.map((tab, index) => (
					<Pane
						key={tab.key}
						id={`panel-${tab.key}`}
						role="tabpanel"
						aria-labelledby={tab.key}
						aria-hidden={index !== currentStep}
						display={index === currentStep ? 'block' : 'none'}
					>
						<Paragraph>Panel #{index}</Paragraph>
						<tab.stepInner />
					</Pane>
				))}
			</Pane>
		</Pane>
	)
}

export default CreateNewPane
