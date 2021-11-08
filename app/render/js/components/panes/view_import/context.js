import Fuse from 'fuse.js'
import { createContext } from 'react'

export const LayoutsContext = createContext()

export function reducer(state, payload) {
	switch (payload.type) {
		case 'init':
			return {
				all: payload.val,
				filterObj: new Fuse(payload.val, {
					keys: ['title'],
				}),
				filtered: payload.val,
			}
		case 'filter':
			return {
				...state,
				filtered: payload.val
					? state.filterObj.search(payload.val).map((e) => e.item)
					: state.all,
			}
		default:
			return state
	}
}
