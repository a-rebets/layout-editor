import { defaultTheme } from 'evergreen-ui';

export const headingTheme = {
	...defaultTheme,
	fontFamilies: {
		...defaultTheme.fontFamilies,
		display: '"Poppins", sans-serif',
	},
};

export const sidebarTheme = {
	...defaultTheme,
	colors: {
		...defaultTheme.colors,
		blueTint: '#e1f5fe',
	},
	shadows: {
		...defaultTheme.shadows,
		focusRing: '0 0 0 2px #82b3c9',
	},
	components: {
		...defaultTheme.components,
		Tab: {
			...defaultTheme.components.Tab,
			appearances: {
				custom: {
					...defaultTheme.components.Tab.appearances.secondary,
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
				},
			},
		},
	},
};
