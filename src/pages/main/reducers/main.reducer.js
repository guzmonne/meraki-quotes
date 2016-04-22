import {
	DOING_MERAKI_QUOTES_CREATE,
	MERAKI_QUOTES_CREATE_SUCCESS,
	MERAKI_QUOTES_CREATE_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	loading: false
}

export default (state=defaultState, action) => {
	switch(action.type){
		case DOING_MERAKI_QUOTES_CREATE:
			return Object.assign(
				{},
				state,
				{loading: true}
			)
		case MERAKI_QUOTES_CREATE_SUCCESS:
		case MERAKI_QUOTES_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{loading: false}
			)
		default:
			return state
	}
}