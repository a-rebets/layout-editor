import { defaultTheme } from 'evergreen-ui'
import deepmerge from 'deepmerge'

const newHue = {
	blue900: '#01579b',
	blue800: '#0277bd',
	blue700: '#0288d1',
	blue600: '#039be5',
	blue500: '#03a9f4',
	blue400: '#29b6f6',
	blue300: '#4fc3f7',
	blue200: '#81d4fa',
	blue100: '#b3e5fc',
	blue50: '#e1f5fe',
	blue25: '#edfaff',
}

const newProperties = {
	colors: {
		blue900: newHue.blue900,
		blue800: newHue.blue800,
		blue700: newHue.blue700,
		blue600: newHue.blue600,
		blue500: newHue.blue500,
		blue400: newHue.blue400,
		blue300: newHue.blue300,
		blue200: newHue.blue200,
		blue100: newHue.blue100,
		blue50: newHue.blue50,
		blue25: newHue.blue25,
		selected: newHue.blue500,
		blueTint: newHue.blue25,
		icon: {
			selected: newHue.blue500,
		},
		text: {
			info: newHue.blue500,
		},
	},
	fontFamilies: {
		custom: '"Poppins", sans-serif',
	},
	components: {
		Heading: {
			sizes: {
				900: {
					...defaultTheme.components.Heading.sizes['900'],
					fontFamily: 'fontFamilies.custom',
				},
			},
		},
		Tab: {
			appearances: {
				custom: {
					...defaultTheme.components.Tab.appearances.secondary,
					borderRadius: 'radii.2',
					_hover: {
						backgroundColor: '#CCDEE6',
						color: 'colors.gray900',
					},
					_active: {
						backgroundColor: '#81d4fa',
					},
					_current: {
						backgroundColor: '#b3e5fc',
						color: 'black',
					},
					_focus: {
						boxShadow: '0 0 0 2px #82b3c9',
					},
				},
			},
		},
	},
}

export default deepmerge(defaultTheme, newProperties)
